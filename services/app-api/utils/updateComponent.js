import dynamoDb from "../libs/dynamodb-lib";
import { Validate, Workflow } from "cmscommonlib";

const topLevelUpdates = [
  "clockEndTimestamp",
  "expirationTimestamp",
  "currentStatus",
];

export default async function updateComponent({
  componentId: updatePk,
  ...updateData
}) {
  const changeData = {
    componentType: updateData.componentType,
    submitterName: updateData.submitterName,
    submitterEmail: updateData.submitterEmail,
    currentStatus: updateData.currentStatus,
    submissionTimestamp: updateData.submissionTimestamp,
    componentId: updateData.componentId,
    displayId: updateData.componentId,
  };

  const updateSk = `v0#${changeData.componentType}#${changeData.submissionTimestamp}`;

  if (updateData.componentType === Workflow.ONEMAC_TYPE.WAIVER_AMENDMENT) {
    const { renewal, amendment } = Validate.decodeWaiverNumber(updatePk);
    changeData.displayId = "R" + renewal + "." + amendment;
  }

  const updateComponentParams = {
    TableName: process.env.oneMacTableName,
    ReturnValues: "UPDATED_NEW",
    Key: {
      pk: updatePk,
      sk: updateSk,
    },
    ConditionExpression: "pk = :pkVal AND sk = :skVal",
    UpdateExpression:
      "SET Latest = if_not_exists(Latest, :defaultval) + :incrval, ",
    ExpressionAttributeValues: {
      ":defaultval": 0,
      ":incrval": 1,
      ":emptyList": [],
      ":pkVal": updatePk,
      ":skVal": updateSk,
    },
  };

  topLevelUpdates.forEach((attributeName) => {
    if (updateData[attributeName]) {
      const newLabel = `:new${attributeName}`;
      updateComponentParams.ExpressionAttributeValues[newLabel] =
        updateData[attributeName];
      if (Array.isArray(updateData[attributeName]))
        updateComponentParams.UpdateExpression += `, ${attributeName} = list_append(if_not_exists(${attributeName},:emptyList), ${newLabel})`;
      else
        updateComponentParams.UpdateExpression += `, ${attributeName} = ${newLabel}`;
    }
  });

  // add the child details
  if (updateData.newChild) {
    updateComponentParams.ExpressionAttributeNames = {
      "#childTypeName": updateData.newChild.componentType,
      "#childList": "children",
    };
    updateComponentParams.ExpressionAttributeValues[":childcomponent"] = [
      updateData.newChild,
    ];
    updateComponentParams.UpdateExpression +=
      ", #childTypeName = list_append(if_not_exists(#childTypeName,:emptyList), :childcomponent), #childList = list_append(if_not_exists(#childList,:emptyList), :childcomponent)";
  }

  try {
    console.log("updateParams: ", updateComponentParams);
    const result = await dynamoDb.update(updateComponentParams);
    console.log("Result is: ", result);
    try {
      const latestVersion = result["Attributes"]["Latest"];
      const putsk = updateSk.replace("v0#", "v" + latestVersion + "#");
      const putParams = {
        TableName: process.env.oneMacTableName,
        Item: {
          pk: updatePk,
          sk: putsk,
          ...result.Attributes,
        },
      };
      await dynamoDb.put(putParams);
    } catch (e) {
      console.log("got exception: ", e);
    }
    return result.Attributes;
  } catch (error) {
    if (error.code === "ConditionalCheckFailedException") {
      console.log(
        `component is not (yet) a oneMAC component:  ${error.message}`
      );
    } else {
      console.log(`Error happened updating DB:  ${error.message}`);
      console.log("update parameters tried: ", updateComponentParams);
      // throw error;
    }
  }
}
