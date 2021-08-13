import handler from "./libs/handler-lib";
import getUser from "./utils/getUser";
import { getUserRoleObj } from "cmscommonlib";

// Gets owns user data from User DynamoDB table
export const main = handler(async (event) => {
  // If this invokation is a prewarm, do nothing and return.
  if (event.source == "serverless-plugin-warmup") {
    console.log("Warmed up!");
    return null;
  }

  const userItem = await getUser(event.queryStringParameters.email);
  userItem.validRoutes = getUserRoleObj(userItem.type).getAccesses();

  return userItem;
});
