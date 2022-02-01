import { USER_TYPE } from "cmscommonlib";

import handler from "./libs/handler-lib";
import { queryForUserRole } from "./libs/user-table-lib";

// Gets active CMS role approvers
export const main = handler(
  async () => await queryForUserRole(USER_TYPE.CMS_ROLE_APPROVER)
);
