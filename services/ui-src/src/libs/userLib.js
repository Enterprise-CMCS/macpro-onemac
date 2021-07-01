import { USER_TYPE, USER_STATUS } from "cmscommonlib";

export const userTypes = {
  [USER_TYPE.STATE_SUBMITTER]: "State Submitter",
  [USER_TYPE.STATE_ADMIN]: "State Admin",
  [USER_TYPE.CMS_APPROVER]: "CMS Role Approver",
  [USER_TYPE.SYSTEM_ADMIN]: "CMS System Admin",
  [USER_TYPE.HELPDESK]: "Helpdesk User",
};

export const pendingMessage = {
  [USER_TYPE.STATE_SUBMITTER]:
    "Your system access is pending approval. Contact your State System Admin with any questions.",
  [USER_TYPE.STATE_ADMIN]: "Your system access is pending approval.",
  [USER_TYPE.CMS_APPROVER]:
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
  [USER_TYPE.CMS_APPROVER]:
    "Sorry, you don't have access. Please contact the CMS System Admin with any questions",
  [USER_TYPE.CMS_REVIEWER]:
    "Sorry, you don't have access. Please contact the CMS Role Approver with any questions",
  [USER_TYPE.SYSTEM_ADMIN]: "There is something wrong. Contact the Help Desk.",
  [USER_TYPE.HELPDESK]:
    "Sorry, you don't have access. Please contact the CMS System Admin with any questions",
};

export const grantConfirmMessage = {
  [USER_TYPE.STATE_ADMIN]:
    "Warning\n\nThis will activate the selected user’s account for state access to create and submit SPA and Waiver forms.  A notification will be emailed to the user.\n\nAre you sure you want to proceed?",
  [USER_TYPE.CMS_APPROVER]:
    "Warning\n\nThis will activate the selected user’s account for State Systems Administrator access.  This role approves State Submitters.  A notification will be emailed to the user.\n\nAre you sure you want to proceed?",
  [USER_TYPE.SYSTEM_ADMIN]:
    "Warning\n\nThis will activate the selected user’s account. A notification will be emailed to the user.\n\nAre you sure you want to proceed?",
};

export const denyConfirmMessage = {
  [USER_TYPE.STATE_ADMIN]:
    "Warning\n\nThis will deny the selected user’s account state access to create and submit SPA and Waiver forms.  A notification will be emailed to the user.\n\nAre you sure you want to proceed?",
  [USER_TYPE.CMS_APPROVER]:
    "Warning\n\nThis will deny the selected user’s account for State Systems Administrator access.  This role approves State Submitters.  A notification will be emailed to the user.\n\nAre you sure you want to proceed?",
  [USER_TYPE.SYSTEM_ADMIN]:
    "Warning\n\nThis will deny the selected user’s account for access. A notification will be emailed to the user.\n\nAre you sure you want to proceed?",
};

export const revokeConfirmMessage = {
  [USER_TYPE.STATE_ADMIN]:
    "Warning\n\nThis will revoke the selected user’s account for state access to create and submit SPA and Waiver forms.  A notification will be emailed to the user.\n\nAre you sure you want to proceed?",
  [USER_TYPE.CMS_APPROVER]:
    "Warning\n\nThis will revoke the selected user’s account for State Systems Administrator access.  This role approves State Submitters.  A notification will be emailed to the user.\n\nAre you sure you want to proceed?",
  [USER_TYPE.SYSTEM_ADMIN]:
    "Warning\n\nThis will revoke the selected user’s account for access. A notification will be emailed to the user.\n\nAre you sure you want to proceed?",
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
 * is this CMS Approver active or does State Submitter / State Admin have any active territories?
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
