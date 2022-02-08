import { USER_ROLE } from "cmscommonlib";

export const pendingMessage = {
  [USER_ROLE.STATE_SUBMITTER]:
    "Your system access is pending approval. Contact your State System Admin with any questions.",
  [USER_ROLE.STATE_SYSTEM_ADMIN]: "Your system access is pending approval.",
  [USER_ROLE.CMS_ROLE_APPROVER]:
    "Your system access is pending approval. Contact the CMS System Admin with any questions.",
  [USER_ROLE.CMS_REVIEWER]:
    "Your system access is pending approval. Contact the CMS Role Approver with any questions.",
  [USER_ROLE.SYSTEM_ADMIN]:
    "Your system access is pending approval. Contact the Help Desk with any questions.",
  [USER_ROLE.HELPDESK]:
    "Your system access is pending approval. Contact the CMS System Admin with any questions.",
};

export const deniedOrRevokedMessage = {
  [USER_ROLE.STATE_SUBMITTER]:
    "Sorry, you don't have access. Please contact the State System Admin with any questions",
  [USER_ROLE.STATE_SYSTEM_ADMIN]:
    "Sorry, you don't have access. Please contact the CMS Role Approver with any questions",
  [USER_ROLE.CMS_ROLE_APPROVER]:
    "Sorry, you don't have access. Please contact the CMS System Admin with any questions",
  [USER_ROLE.CMS_REVIEWER]:
    "Sorry, you don't have access. Please contact the CMS Role Approver with any questions",
  [USER_ROLE.SYSTEM_ADMIN]: "There is something wrong. Contact the Help Desk.",
  [USER_ROLE.HELPDESK]:
    "Sorry, you don't have access. Please contact the CMS System Admin with any questions",
};
