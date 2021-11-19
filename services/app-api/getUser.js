import handler from "./libs/handler-lib";
import getUser from "./utils/getUser";
import { getUserRoleObj } from "cmscommonlib";

// Gets owns user data from User DynamoDB table
export const main = handler(async (event) => {
  const userItem = await getUser(event.queryStringParameters.email);
  userItem.validRoutes = getUserRoleObj(
    userItem.type,
    !userItem,
    userItem.attributes
  ).getAccesses();

  return userItem;
});
