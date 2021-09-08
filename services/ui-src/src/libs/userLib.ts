import { USER_TYPE, USER_STATUS } from "cmscommonlib";
import {
  AccessHistoryEvent,
  StateAccessAttribute,
  UserRecord,
} from "../domain-types";

export const pendingMessage = {
  [USER_TYPE.STATE_SUBMITTER]:
    "Your system access is pending approval. Contact your State System Admin with any questions.",
  [USER_TYPE.STATE_ADMIN]: "Your system access is pending approval.",
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
  [USER_TYPE.STATE_ADMIN]:
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
  if (
    userData.type === USER_TYPE.STATE_SUBMITTER ||
    userData.type === USER_TYPE.STATE_ADMIN
  ) {
    const stateStatusSet = (
      userData.attributes as StateAccessAttribute[]
    ).reduce(getStateStatus, new Set());
    return (
      !stateStatusSet.has(USER_STATUS.ACTIVE) &&
      stateStatusSet.has(USER_STATUS.PENDING)
    );
  } else {
    return (
      [...(userData.attributes as AccessHistoryEvent[])].sort(
        sortDescendingOrder
      )[0]?.status === USER_STATUS.PENDING
    );
  }
};

/**
 * is this CMS Role Approver active or does State Submitter / State Admin have any active territories?
 * @param userData object of history instance
 * @return status
 */

export const isActive = (userData: UserRecord): boolean => {
  if (
    userData.type === USER_TYPE.STATE_SUBMITTER ||
    userData.type === USER_TYPE.STATE_ADMIN
  ) {
    const stateStatusSet = (
      userData.attributes as StateAccessAttribute[]
    ).reduce(getStateStatus, new Set());
    return stateStatusSet.has(USER_STATUS.ACTIVE);
  } else {
    return (
      [...(userData.attributes as AccessHistoryEvent[])].sort(
        sortDescendingOrder
      )[0]?.status === USER_STATUS.ACTIVE
    );
  }
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
  if (userData.type === USER_TYPE.SYSTEM_ADMIN) {
    return USER_STATUS.ACTIVE;
  } else if (isActive(userData)) {
    return USER_STATUS.ACTIVE;
  } else if (isPending(userData)) {
    return USER_STATUS.PENDING;
  } else {
    return null;
  }
};

/**
 * Sort history of userData in descending order.
 * @param a object of history instance
 * @param b object of history instance
 * @return diff the order of which instance should come 1st based on greater value of effectiveDate
 */
const sortDescendingOrder = (
  a: AccessHistoryEvent,
  b: AccessHistoryEvent
): number => b.date - a.date;

/**
 * get the status of the sorted history array's 1st element and put them in a set.
 * @param attribute object of history instance
 */
const getStateStatus = (
  stateStatusSet: Set<string>,
  attribute: StateAccessAttribute
): Set<string> => {
  attribute.history.sort(sortDescendingOrder);
  stateStatusSet.add(attribute.history[0].status);
  return stateStatusSet;
};
