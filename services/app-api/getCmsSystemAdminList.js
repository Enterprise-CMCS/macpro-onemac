import handler from "./libs/handler-lib";
import { USER_TYPE } from "cmscommonlib";
import { queryForUserRole } from "./libs/user-table-lib";

// Gets CMS system admins
export const main = handler(
  async () => await queryForUserRole(USER_TYPE.SYSTEM_ADMIN)
);
