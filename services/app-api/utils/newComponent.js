//import updateWithVersion from "./updateWithVersion";
import dynamoDb from "../libs/dynamodb-lib";

const topLevelAttributes = [
  "GSI1pk",
  "GSI1sk",
  "GSI2pk",
  "GSI2sk",
  // "componentId",
  "componentType",
  "submissionTimestamp",
  "proposedEffectiveDate",
  "clockEndTimestamp",
  "currentStatus",
  "currentStatusTimestamp",
  "attachments",
  "additionalInformation",
  "submitterName",
  "submitterEmail",
  "waiverAuthority",
  "parentId",
  "parentType",
  "title",
  "temporaryExtensionType",
];

export default async function newComponent(newData, config) {
  const pk = newData.componentId;
  const sk = `OneMAC#${newData.submissionTimestamp}`;
  newData.componentType = config.componentType;

  if (config.whichTab) {
    newData.GSI1pk = `OneMAC#${config.whichTab}`;
    newData.GSI1sk = pk;
  }
  if (newData.parentId) {
    newData.GSI2pk = newData.parentId;
    newData.GSI2sk = config.componentType;
  }
  const params = {
    TableName: process.env.oneMacTableName,
    Key: {
      pk,
      sk,
    },
    ConditionExpression: "attribute_not_exists(pk)",
    ExpressionAttributeValues: { ":componentId": newData.componentId },
    UpdateExpression: "SET componentId = :componentId",
  };

  topLevelAttributes.forEach((attributeName) => {
    if (newData[attributeName]) {
      const label = `:${attributeName}`;
      params.ExpressionAttributeValues[label] = newData[attributeName];
      params.UpdateExpression += `, ${attributeName} = ${label}`;
    }
  });

  console.log("params in newComponent are: ", JSON.stringify(params, null, 2));
  return await dynamoDb.update(params);

  //  return await updateWithVersion(params);
}
