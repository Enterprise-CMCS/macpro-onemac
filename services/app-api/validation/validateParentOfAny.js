import dynamoDb from "../libs/dynamodb-lib";

export const validateParentOfAny = async (event, config) => {
  const parentId = event.pathParameters.parentId;
  let parentParams, result, parentPackage;
  console.log("checking parent id: " + parentId);

  parentParams = {
    TableName: process.env.oneMacTableName,
    Key: {
      pk: parentId,
      sk: "Package",
    },
    ProjectionExpression: "componentType, currentStatus",
  };
  result = await dynamoDb.get(parentParams);
  console.log("%s Package get result: ", parentId, JSON.stringify(result));

  // no matches, check SEA Tool
  if (!result?.Item) {
    parentParams = {
      TableName: process.env.oneMacTableName,
      KeyConditionExpression: "pk = :pk AND begins_with(sk, :seatool)",
      ExpressionAttributeValues: {
        ":pk": parentId,
        ":seatool": "SEATool",
      },
      ScanIndexForward: false,
    };
    result = await dynamoDb.query(parentParams);
    console.log("%s SEA Tool Items: ", parentId, JSON.stringify(result.Items));

    // no matches, no parent found
    if (!result?.Items || result.Items.length === 0) {
      console.log("%s no parent found", parentId);
      return false;
    }
    parentPackage = result.Items[0];

    parentPackage.currentStatus = parentPackage.SPW_STATUS.map((oneStatus) =>
      parentPackage.STATE_PLAN.SPW_STATUS_ID === oneStatus.SPW_STATUS_ID
        ? oneStatus.SPW_STATUS_DESC
        : null
    ).filter(Boolean)[0];

    parentPackage.componentType = parentPackage.PLAN_TYPES.map((onePlan) =>
      parentPackage.STATE_PLAN.PLAN_TYPE === onePlan.PLAN_TYPE_ID
        ? onePlan.PLAN_TYPE_NAME
        : null
    ).filter(Boolean)[0];

    parentPackage.componentType += parentPackage.ACTIONTYPES.map((oneAction) =>
      parentPackage.STATE_PLAN.ACTION_TYPE === oneAction.ACTION_ID
        ? oneAction.ACTION_NAME
        : null
    ).filter(Boolean)[0];
  } else {
    parentPackage = result.Item;
  }

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
