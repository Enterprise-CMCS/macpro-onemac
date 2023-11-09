import { getUserRoleObj, RESPONSE_CODE, USER_STATUS } from "cmscommonlib";

export const validateUserReadOnly = (user, checkTerritory) => {
  if (!user || Object.keys(user).length === 0)
    throw new Error(RESPONSE_CODE.USER_NOT_FOUND);

  const userRoleObj = getUserRoleObj(user.roleList);

  let territoryList = "this is for EUA users";
  territoryList = user.roleList
    .filter(({ status }) => status === USER_STATUS.ACTIVE)
    .map(({ territory }) => territory);

  if (
    !userRoleObj.canAccessDashboard ||
    (Array.isArray(territoryList) && territoryList.length === 0)
  )
    return false;

  if (
    Array.isArray(territoryList) &&
    !(territoryList.includes(checkTerritory) || territoryList.includes("N/A"))
  )
    return false;

  return true;
};

export const validateUserSubmitting = (user, territory) => {
  const userRoleObj = getUserRoleObj(user.roleList);
  return validateUserReadOnly(user, territory) && userRoleObj.canAccessForms;
};
