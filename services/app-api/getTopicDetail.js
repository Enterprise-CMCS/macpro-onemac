import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
import { RESPONSE_CODE, getUserRoleObj } from "cmscommonlib";
import { getUser } from "./getUser";

/**
 * Gets all packages from the DynamoDB one table
 * that correspond to the user's active access to states/territories
 */

export const getTopicDetail = async (email, id, changeDate) => {
  if (!email) return RESPONSE_CODE.USER_NOT_FOUND;
  if (!changeDate || !id) return RESPONSE_CODE.DATA_MISSING;

  const user = await getUser(email);

  if (!user) throw RESPONSE_CODE.USER_NOT_AUTHORIZED;

  const userRoleObj = getUserRoleObj(user.roleList);

  if (!userRoleObj.canAccessAdminTools) {
    throw RESPONSE_CODE.USER_NOT_AUTHORIZED;
  }

  const params = {
    TableName: process.env.oneMacTableName,
    KeyConditionExpression: "pk = :pk and sk = :sk",
    ExpressionAttributeValues: {
      ":pk": id,
      ":sk": `SEATool#${changeDate}`,
    },
  };

  console.log("params", params);

  const results = await dynamoDb.query(params);
  console.log("results", results);
  return results.Items[0];
};

// get a list of items for a given topic in the one table
export const main = handler(async (event) => {
  return await getTopicDetail(
    event?.queryStringParameters?.email,
    event?.queryStringParameters?.id,
    event?.queryStringParameters?.changeDate
  );
});
