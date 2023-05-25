import dynamoDb from "../libs/dynamodb-lib";

export const validateParentOfAny = async (event, config) => {
  const parentId = event.pathParameters.parentId;
  console.log("checking parent id: " + parentId);

  const parentParams = {
    TableName: process.env.oneMacTableName,
    Key: {
      pk: parentId,
      sk: "Package",
    },
    ProjectionExpression: "componentType, currentStatus",
  };
  const result = await dynamoDb.get(parentParams);
  console.log("%s Package get result: ", parentId, JSON.stringify(result));

  if (!result?.Item) {
    return false;
  }
  const parentPackage = result.Item;

  console.log("%s parentPackage is: ", parentId, parentPackage);
  // matches with no more specifics, parent is found
  if (!config.allowedParentTypes && !config.allowedParentStatuses) return true;

  // loop through the items to see if any of the records match the ideal parent
  let foundParent = false;
  if (
    (!config.allowedParentTypes ||
      config.allowedParentTypes.includes(parentPackage.componentType)) &&
    (!config.allowedParentStatuses ||
      config.allowedParentStatuses.includes(parentPackage.currentStatus))
  )
    foundParent = true;

  console.log("foundParent:", foundParent);
  return foundParent;
};
