import dynamoDb from "../libs/dynamodb-lib";

export const isParentOfAny = async (event, config) => {
  const parentId = event.pathParameters.parentId;
  console.log("checking parent id: " + parentId);

  const parentParams = {
    TableName: process.env.oneMacTableName,
    KeyConditionExpression: "pk = :pk AND sk = :package",
    ExpressionAttributeValues: {
      ":pk": parentId,
      ":package": "Package",
    },
    ProjectionExpression: "componentType, currentStatus",
  };
  const result = await dynamoDb.query(parentParams);

  // no matches, no parent found
  if (!result?.Items) return false;

  console.log("Items found are: ", result.Items);

  // matches with no more specifics, parent is found
  if (!config.allowedParentTypes && !config.allowedParentStatuses) return true;

  // loop through the items to see if any of the records match the ideal parent
  let foundParent = false;
  result.Items.forEach((item) => {
    if (
      (!config.allowedParentTypes ||
        config.allowedParentTypes.includes(item.componentType)) &&
      (!config.allowedParentStatuses ||
        config.allowedParentStatuses.includes(item.currentStatus))
    )
      foundParent = true;
  });
  console.log("foundParent:", foundParent);
  return foundParent;
};
