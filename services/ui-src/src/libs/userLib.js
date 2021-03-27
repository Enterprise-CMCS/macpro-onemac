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

export const grantConfirmMessage = {
  stateadmin: "stateadmin Grant Acccess Action Confirmation - Need content",
  cmsapprover:
    "Warning!\n\nThis will activate the selected user’s account for State Systems Administrator access. This role approves State Submitters. A notifcation will be emailed to the user.\n\nAre you sure you want to proceed?",
  systemadmin: "systemadmin Grant Acccess Action Confirmation - Need content",
};

export const denyConfirmMessage = {
  stateadmin: "stateadmin Deny Acccess Action Confirmation - Need content",
  cmsapprover: "cmsapprover Deny Acccess Action Confirmation - Need content",
  systemadmin: "systemadmin Deny Acccess Action Confirmation - Need content",
};

export const revokeConfirmMessage = {
  stateadmin: "stateadmin Revoke Acccess Action Confirmation - Need content",
  cmsapprover: "cmsapprover Revoke Acccess Action Confirmation - Need content",
  systemadmin: "systemadmin Revoke Acccess Action Confirmation - Need content",
};
