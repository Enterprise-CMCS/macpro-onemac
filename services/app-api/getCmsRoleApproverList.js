import { USER_TYPE, latestAccessStatus } from "cmscommonlib";

import handler from "./libs/handler-lib";
import { queryForUserType } from "./libs/user-table-lib";

// Gets active CMS role approvers
export const main = handler(async (event) => {
  // If this invokation is a prewarm, do nothing and return.
  if (event.source == "serverless-plugin-warmup") {
    console.log("Warmed up!");
    return null;
  }

  return (await queryForUserType(USER_TYPE.CMS_ROLE_APPROVER))
    .filter((admin) => latestAccessStatus(admin) === "active")
    .map(({ id, firstName, lastName }) => ({ email: id, firstName, lastName }));
});
