import { latestAccessStatus } from "cmscommonlib";

import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
import { USER_TYPES } from "./user/userTypes";

// Gets active CMS approvers
export const main = handler(async (event, context) => {
  // If this invokation is a prewarm, do nothing and return.
  if (event.source == "serverless-plugin-warmup") {
    console.log("Warmed up!");
    return null;
  }

  const { Items: allAdmins = [] } = await dynamoDb.scan({
    TableName: process.env.userTableName,
    FilterExpression: "#ty = :userType",
    ExpressionAttributeNames: { "#ty": "type" },
    ExpressionAttributeValues: { ":userType": USER_TYPES.CMS_APPROVER },
  });

  return allAdmins
    .filter((admin) => latestAccessStatus(admin) === "active")
    .map(({ id, firstName, lastName }) => ({ email: id, firstName, lastName }));
});
