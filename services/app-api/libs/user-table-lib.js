import dynamoDb from "./dynamodb-lib";

/**
 * Get all users with a specified type from the user table.
 */
export const queryForUserType = async (type) =>
  (
    await dynamoDb.scan({
      TableName: process.env.userTableName,
      FilterExpression: "#ty = :userType",
      ExpressionAttributeNames: { "#ty": "type" },
      ExpressionAttributeValues: { ":userType": type },
    })
  )?.Items ?? [];
