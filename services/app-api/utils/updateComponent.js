import dynamoDb from "../libs/dynamodb-lib";

const topLevelUpdates = [
  "clockEndTimestamp",
  "expirationTimestamp",
  "currentStatus",
  "attachments",
];

export default async function updateComponent({
  packageId: updatePk,
  ...updateData
}) {
  const { renewal, amendment } = decodeWaiverNumber(updateData.componentId);
  const changeData = {
    componentType: updateData.componentType,
    submitterName: updateData.submitterName,
    shortId: "R" + renewal + "." + amendment,
    componentStatus: updateData.currentStatus,
    componentTimestamp: updateData.submissionTimestamp,
    componentId: updateData.componentId,
  };

  const updateComponentParams = {
    TableName: process.env.oneMacTableName,
    Key: {
      pk: updatePk,
      sk: updateData.parentType,
    },
    ConditionExpression: "pk = :pkVal AND sk = :skVal",
    UpdateExpression:
      "SET changeHistory = list_append(:newChange, if_not_exists(changeHistory, :emptyList))",
    ExpressionAttributeValues: {
      ":pkVal": updatePk,
      ":skVal": updateData.parentType,
      ":newChange": [changeData],
      ":emptyList": [],
    },
    ReturnValues: "ALL_NEW",
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

  // up the number in the component count for this component
  if (updateData.componentType) {
    updateComponentParams.ExpressionAttributeNames = {
      "#componentTypeName": updateData.componentType,
      "#childList": "children",
    };
    updateComponentParams.ExpressionAttributeValues[":thiscomponent"] = [
      changeData,
    ];
    updateComponentParams.UpdateExpression +=
      ", #componentTypeName = list_append(if_not_exists(#componentTypeName,:emptyList), :thiscomponent), #childList = list_append(if_not_exists(#childList,:emptyList), :thiscomponent)";
  }

  try {
    console.log("updateParams: ", updateComponentParams);
    const result = await dynamoDb.update(updateComponentParams);
    console.log("Result is: ", result);
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
