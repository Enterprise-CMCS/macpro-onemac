import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
import { RESPONSE_CODE, getUserRoleObj } from "cmscommonlib";
import getUser from "./utils/getUser";
import { getAuthorizedStateList } from "./user/user-util";

export const main = handler(async (event) => {
  // If this invokation is a prewarm, do nothing and return.
  if (event.source == "serverless-plugin-warmup") {
    return null;
  }

  const user = await getUser(event.queryStringParameters.email);

  if (!user) {
    throw new Error(RESPONSE_CODE.USER_NOT_FOUND);
  }

  const userRoleObj = getUserRoleObj(user.type);

  const territoryList = getAuthorizedStateList(user);
  if (!userRoleObj.canAccessDashboard || territoryList === []) {
    throw new Error(RESPONSE_CODE.USER_NOT_AUTHORIZED);
  }

  const results = await dynamoDb.update({
    TableName: process.env.oneMacTableName,
    Key: { pk: event.queryStringParameters.packageId, sk: "PACKAGE" },
    UpdateExpression: "SET currentStatus = :newStatus",
    ExpressionAttributeValues: { ":newStatus": "Withdrawn" },
  });

  console.info(results);

  return RESPONSE_CODE.PACKAGE_WITHDRAW_SUCCESS;
});
