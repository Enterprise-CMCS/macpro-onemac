import handler from "./libs/handler-lib";
import { USER_TYPE } from "cmscommonlib";
import { queryForUserType } from "./libs/user-table-lib";

// Gets CMS system admins
export const main = handler(async () => {
  return (await queryForUserType(USER_TYPE.SYSTEM_ADMIN)).map(
    ({ id, firstName, lastName }) => ({
      email: id,
      firstName,
      lastName,
    })
  );
});
