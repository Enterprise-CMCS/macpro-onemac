export const userTypes = {
  stateuser: 'State Submitter',
  stateadmin: 'State Admin',
  cmsapprover: 'CMS Role Approver',
  systemadmin: 'CMS System Admin'
}

export const pendingMessage = {
  stateuser:
    "Your system access is pending approval. Contact your State System Admin with any questions.",
  stateadmin: "Your system access is pending approval.",
  cmsapprover:
    "Your system access is pending approval. Contact the CMS System Admin with any questions.",
  systemadmin:
    "Your system access is pending approval. Contact the Help Desk with any questions.",
};

export const deniedOrRevokedMessage = {
  stateuser:
    "Sorry, you don't have access. Please contact the State System Admin with any questions.",
  stateadmin: "Sorry, you don't have access. Please contact the CMS Role Approver with any questions.",
  cmsapprover:
    "Sorry, you don't have access. Please contact the CMS System Admin with any questions.",
  systemadmin:
    "There is something wrong. Contact the Help Desk.",
};

export const grantConfirmMessage = {
  stateadmin: "Warning\n\nThis will activate the selected user’s account for state access to create and submit SPA and Waiver forms.  A notification will be emailed to the user.\n\nAre you sure you want to proceed?",
  cmsapprover:
    "Warning\n\nThis will activate the selected user’s account for State Systems Administrator access.  This role approves State Submitters.  A notification will be emailed to the user.\n\nAre you sure you want to proceed?",
  systemadmin: "Warning\n\nThis will activate the selected user’s account for CMS Role Approver access.  This role approves State Systems Administrator. A notification will be emailed to the user.\n\nAre you sure you want to proceed?",
};

export const denyConfirmMessage = {
  stateadmin: "Warning\n\nThis will deny the selected user’s account state access to create and submit SPA and Waiver forms.  A notification will be emailed to the user.\n\nAre you sure you want to proceed?",
  cmsapprover: "Warning\n\nThis will deny the selected user’s account for State Systems Administrator access.  This role approves State Submitters.  A notification will be emailed to the user.\n\nAre you sure you want to proceed?",
  systemadmin: "Warning\n\nThis will deny the selected user’s account for CMS Role Approver access.  This role approves State Systems Administrator. A notification will be emailed to the user.\n\nAre you sure you want to proceed?",
};

export const revokeConfirmMessage = {
  stateadmin: "Warning\n\nThis will revoke the selected user’s account for state access to create and submit SPA and Waiver forms.  A notification will be emailed to the user.\n\nAre you sure you want to proceed?",
  cmsapprover: "Warning\n\nThis will revoke the selected user’s account for State Systems Administrator access.  This role approves State Submitters.  A notification will be emailed to the user.\n\nAre you sure you want to proceed?",
  systemadmin: "Warning\n\nThis will revoke the selected user’s account for CMS Role Approver access.  This role approves State Systems Administrator. A notification will be emailed to the user.\n\nAre you sure you want to proceed?",
};

/**
   * Determine the type of userData and sort corresponding arrays per state if needed.
   * @param {Object} userData object of history instance
   * @return {Boolean} a boolean on status pending
   */

 export const isPending = (userData) => {
  if (userData.type === "cmsapprover") {
    userData.attributes.sort(sortDescendingOrder);
    return userData.attributes[0].status === "pending";
  } else {
    userData.attributes.forEach(getStateStatus);
    return !stateStatusSet.has("active") && stateStatusSet.has("pending");
  }
};

/**
   * is this CMS Approver active or does State User / State Admin user have any active territories?
   * @param {Object} userData object of history instance
   * @return {Boolean} a boolean on status pending
   */

export const isActive = (userData) => {
  if (userData.type === "cmsapprover") {
    userData.attributes.sort(sortDescendingOrder);
    return userData.attributes[0].status === "active";
  } else {
    userData.attributes.forEach(getStateStatus);
    return stateStatusSet.has("active");
  }
}
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
