import { USER_TYPE, latestAccessStatus } from "cmscommonlib";

import handler from "./libs/handler-lib";
import { queryForUserType } from "./libs/user-table-lib";

// Gets active CMS role approvers
export const main = handler(async () => {
  return (await queryForUserType(USER_TYPE.CMS_ROLE_APPROVER))
    .filter((admin) => latestAccessStatus(admin) === "active")
    .map(({ id, firstName, lastName }) => ({ email: id, firstName, lastName }));
});
