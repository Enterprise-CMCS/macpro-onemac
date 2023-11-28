import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
import { RESPONSE_CODE, getUserRoleObj } from "cmscommonlib";
import { getUser } from "./getUser";

/**
 * Gets all packages from the DynamoDB one table
 * that correspond to the user's active access to states/territories
 */

export const getTopic = async (email, topic) => {
  if (!email) return RESPONSE_CODE.USER_NOT_FOUND;
  if (!topic) return RESPONSE_CODE.DATA_MISSING;

  const user = await getUser(email);

  if (!user) throw RESPONSE_CODE.USER_NOT_AUTHORIZED;

  const userRoleObj = getUserRoleObj(user.roleList);

  if (!userRoleObj.canAccessAdminTools) {
    throw RESPONSE_CODE.USER_NOT_AUTHORIZED;
  }

  const params = {
    TableName: process.env.oneMacTableName,
    IndexName: "GSI1",
    KeyConditionExpression: "GSI1pk = :pk",
    ExpressionAttributeValues: {
      ":pk": `SEATool#${topic}`,
    },
    ScanIndexForward: false, //DESC ORDER
    Limit: 100,
    ProjectionExpression: "STATE_PLAN,SPW_STATUS",
  };

  const results = await dynamoDb.query(params);
  return results.Items;
};

// get a list of items for a given topic in the one table
export const main = handler(async (event) => {
  return await getTopic(
    event?.queryStringParameters?.email,
    event?.queryStringParameters?.topic
  );
});
