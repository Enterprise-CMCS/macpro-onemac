import updateWithVersion from "./updateWithVersion";

const topLevelAttributes = [
  "GSI1pk",
  "GSI1sk",
  "GSI2pk",
  "GSI2sk",
  "componentId",
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
  let sk = config.componentType;
  if (config.allowMultiplesWithSameId) sk += `#${newData.submissionTimestamp}`;
  newData.componentType = config.componentType;

  if (config.whichTab) {
    newData.GSI1pk = `OneMAC#${config.whichTab}`;
    newData.GSI1sk = pk;
  }
  if (newData.parentId) {
    newData.GSI2pk = newData.parentId;
    newData.GSI2sk = config.componentType;
  }
  console.log("newData is: ", newData);

  const params = {
    TableName: process.env.oneMacTableName,
    Key: {
      pk,
      sk,
    },
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

  console.log("params in newComponent are: ", params);
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

  console.log("params in newComponent are: ", JSON.stringify(params, null, 2));

  return await updateWithVersion(params);
}
