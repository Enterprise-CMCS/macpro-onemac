import { USER_TYPE, USER_STATUS, effectiveRoleForUser } from "cmscommonlib";
import { UserRecord } from "../domain-types";

export const pendingMessage = {
  [USER_TYPE.STATE_SUBMITTER]:
    "Your system access is pending approval. Contact your State System Admin with any questions.",
  [USER_TYPE.STATE_SYSTEM_ADMIN]: "Your system access is pending approval.",
  [USER_TYPE.CMS_ROLE_APPROVER]:
    "Your system access is pending approval. Contact the CMS System Admin with any questions.",
  [USER_TYPE.CMS_REVIEWER]:
    "Your system access is pending approval. Contact the CMS Role Approver with any questions.",
  [USER_TYPE.SYSTEM_ADMIN]:
    "Your system access is pending approval. Contact the Help Desk with any questions.",
  [USER_TYPE.HELPDESK]:
    "Your system access is pending approval. Contact the CMS System Admin with any questions.",
};

export const deniedOrRevokedMessage = {
  [USER_TYPE.STATE_SUBMITTER]:
    "Sorry, you don't have access. Please contact the State System Admin with any questions",
  [USER_TYPE.STATE_SYSTEM_ADMIN]:
    "Sorry, you don't have access. Please contact the CMS Role Approver with any questions",
  [USER_TYPE.CMS_ROLE_APPROVER]:
    "Sorry, you don't have access. Please contact the CMS System Admin with any questions",
  [USER_TYPE.CMS_REVIEWER]:
    "Sorry, you don't have access. Please contact the CMS Role Approver with any questions",
  [USER_TYPE.SYSTEM_ADMIN]: "There is something wrong. Contact the Help Desk.",
  [USER_TYPE.HELPDESK]:
    "Sorry, you don't have access. Please contact the CMS System Admin with any questions",
};

/**
 * Determine the type of userData and sort corresponding arrays per state if needed.
 * @param userData object of history instance
 * @return isPending
 */

export const isPending = (userData: UserRecord): boolean => {
  const roleResult = effectiveRoleForUser(userData.roleList);
  if (roleResult === null) return false;
  return roleResult[1] === USER_STATUS.PENDING;
};

/**
 * is this CMS Role Approver active or does State Submitter / State System Admin have any active territories?
 * @param userData object of history instance
 * @return status
 */

export const isActive = (userData: UserRecord): boolean => {
  const roleResult = effectiveRoleForUser(userData.roleList);
  if (roleResult === null) return false;
  return roleResult[1] === USER_STATUS.ACTIVE;
};

/**
 * Gets user status if user status is PENDING or ACTIVE. RETURNS NULL IF USER STATUS IS DENIED OR REVOKED.
 * @param userData user data
 * @return userStatus Possible return values are pending, active, or null.
 */

export const getUserStatus = (
  userData: UserRecord | undefined
): USER_STATUS.ACTIVE | USER_STATUS.PENDING | null => {
  if (!userData || Object.keys(userData).length === 0) {
    return null;
  }

  // System admins are active by default since they are hardcoded into the data via seeding.
  if (isActive(userData)) {
    return USER_STATUS.ACTIVE;
  } else if (isPending(userData)) {
    return USER_STATUS.PENDING;
  } else {
    return null;
  }
};
