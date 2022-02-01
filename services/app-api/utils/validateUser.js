import { getUserRoleObj, RESPONSE_CODE } from "cmscommonlib";

import { getAuthorizedStateList } from "../user/user-util";

export const validateUserReadOnly = (user, territory) => {
  if (!user) throw new Error(RESPONSE_CODE.USER_NOT_FOUND);

  const userTerritoryList = getAuthorizedStateList(user);
  return (
    typeof userTerritoryList === "string" ||
    (Array.isArray(userTerritoryList) && userTerritoryList.includes(territory))
  );
};

export const validateUserSubmitting = (user, territory) => {
  const userRoleObj = getUserRoleObj(user.roleList);
  return validateUserReadOnly(user, territory) && userRoleObj.canAccessForms;
};
