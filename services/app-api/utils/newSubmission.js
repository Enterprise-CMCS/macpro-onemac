import { RESPONSE_CODE, Validate } from "cmscommonlib";
import dynamoDb from "../libs/dynamodb-lib";
import addChild from "./addChild";

const topLevelAttributes = [
  "componentId",
  "componentType",
  "submissionTimestamp",
  "proposedEffectiveDate",
  "clockEndTimestamp",
  "currentStatus",
  "attachments",
  "additionalInformation",
  "submissionId",
  "submitterName",
  "submitterEmail",
  "submitterId",
  "waiverAuthority",
  "GSI1pk",
  "GSI1sk",
  "parentId",
  "parentType",
  "title",
  "temporaryExtensionType",
];

export default async function newSubmission(newData, config) {
  const pk = newData.componentId;
  let sk = `v0#${config.componentType}`;
  if (config.allowMultiplesWithSameId) sk += `#${newData.submissionTimestamp}`;
  newData.componentType = config.componentType;

  if (config.packageGroup) {
    newData.GSI1pk = `OneMAC#${config.packageGroup}`;
    newData.GSI1sk = pk;
  } else {
    if (newData.parentId) {
      newData.GSI1pk = newData.parentId;
      newData.GSI1sk = config.componentType;
    } else {
      [newData.parentId, newData.parentType] = config.getParentInfo(
        newData.componentId
      );
    }
  }
  console.log("newData is: ", newData);

  const params = {
    TableName: process.env.oneMacTableName,
    Key: {
      pk,
      sk,
    },
    ReturnValues: "ALL_NEW",
    UpdateExpression:
      "SET Latest = if_not_exists(Latest, :defaultval) + :incrval",
    ExpressionAttributeValues: {
      ":defaultval": 0,
      ":incrval": 1,
      //      ":emptyList": [],
    },
  };

  if (!config.allowMultiplesWithSameId) {
    params.ConditionExpression = "attribute_not_exists(pk)";
  }

  console.log("params in newSubmission are: ", params);
  topLevelAttributes.forEach((attributeName) => {
    if (newData[attributeName]) {
      const label = `:${attributeName}`;
      params.ExpressionAttributeValues[label] = newData[attributeName];
      //      if (Array.isArray(newData[attributeName]))
      //        params.UpdateExpression += `, ${attributeName} = list_append(:emptyList, ${label})`;
      //      else
      params.UpdateExpression += `, ${attributeName} = ${label}`;
    }
  });

  console.log("params in newSubmission are: ", JSON.stringify(params, null, 2));
  try {
    const response = await dynamoDb.update(params);
    console.log("the response is: ", response);

    const latestVersion = response["Attributes"]["Latest"];
    const putsk = sk.replace("v0", "v" + latestVersion);
    const putParams = {
      TableName: process.env.oneMacTableName,
      Item: {
        ...response.Attributes,
        sk: putsk,
      },
    };

    await dynamoDb.put(putParams);

    // remove GSI
    const gsiParams = {
      TableName: process.env.oneMacTableName,
      Key: {
        pk,
        sk: putsk,
      },
    };
    gsiParams.UpdateExpression = "REMOVE GSI1pk, GSI1sk";

    await dynamoDb.update(gsiParams);

    if (newData.parentId) {
      if (!newData.parentType) {
        newData.parentType = Validate.getWaiverTypeFromNumber(newData.parentId);
      }

      return await addChild(newData);
    } else {
      return "Component is Top Level.";
    }
  } catch (error) {
    console.log("newSubmission error is: ", error);
    if (error.code === "ConditionalCheckFailedException") {
      error.response_code = RESPONSE_CODE.DUPLICATE_ID;
    }
    throw error;
  }
}
