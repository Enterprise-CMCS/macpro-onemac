import { USER_TYPE, USER_STATUS } from "cmscommonlib";

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
 * @param {Object} userData object of history instance
 * @return {Boolean} a boolean on status pending
 */

export const isPending = (userData) => {
  if (
    userData.type === USER_TYPE.STATE_SUBMITTER ||
    userData.type === USER_TYPE.STATE_ADMIN
  ) {
    userData.attributes.forEach(getStateStatus);
    return (
      !stateStatusSet.has(USER_STATUS.ACTIVE) &&
      stateStatusSet.has(USER_STATUS.PENDING)
    );
  } else {
    userData.attributes.sort(sortDescendingOrder);
    return userData.attributes[0].status === USER_STATUS.PENDING;
  }
};

/**
 * is this CMS Role Approver active or does State Submitter / State Admin have any active territories?
 * @param {Object} userData object of history instance
 * @return {Boolean} a boolean on status pending
 */

export const isActive = (userData) => {
  if (
    userData.type === USER_TYPE.STATE_SUBMITTER ||
    userData.type === USER_TYPE.STATE_ADMIN
  ) {
    userData.attributes.forEach(getStateStatus);
    return stateStatusSet.has(USER_STATUS.ACTIVE);
  } else {
    userData.attributes.sort(sortDescendingOrder);
    return userData.attributes[0].status === USER_STATUS.ACTIVE;
  }
};
/**
 * Sort history of userData in descending order.
 * @param {Object} a object of history instance
 * @param {Object} b object of history instance
 * @return {Number} the order of which instance should come 1st based on greater value of effectiveDate
 */

const sortDescendingOrder = (a, b) => {
  return b.date - a.date;
};

const stateStatusSet = new Set();
/**
 * get the status of the sorted history array's 1st element and put them in a set.
 * @param {Object} attribute object of history instance
 * @return {Array} the most recent status values for each state
 */

const getStateStatus = (attribute) => {
  attribute.history.sort(sortDescendingOrder);
  stateStatusSet.add(attribute.history[0].status);
};
