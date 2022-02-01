import dynamoDb from "./dynamodb-lib";

/**
 * Get all users with a specified role from the user table.
 */
export const queryForUserRole = async (role, territory) => {
  if (!territory) territory = "All";
  let adminList;
  try {
    adminList = await dynamoDb.query({
      TableName: process.env.oneMacTableName,
      IndexName: "GSI1",
      KeyConditionExpression: "GSI1pk = :pk",
      ExpressionAttributeValues: {
        ":pk": `${role}#${territory}`,
      },
      ProjectionExpression: "email,firstName,lastName",
    });
  } catch (e) {
    console.log("Error is: ", e);
  }

  return adminList.Items;
};
