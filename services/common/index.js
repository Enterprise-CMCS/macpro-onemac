/**
 * Common Shares Libs for the CMS Submissions Application.
 * This will contain static items needed by both the frontend and backend.
 */

export * as Workflow from "./workflow.js";

export { waiverAuthorityB4, waiverAuthorityB } from "./waiverAuthorities.js";
export {
  initialWaiver,
  initialWaiverB4,
  initialWaiverB,
} from "./type/initialWaiver.js";
export { initialWaiverWithdraw } from "./type/initialWaiverWithdraw.js";
export {
  waiverTemporaryExtension,
  waiverTemporaryExtension1915b,
  waiverTemporaryExtension1915c,
} from "./type/waiverTemporaryExtension.js";
export {
  waiverRenewal,
  waiverRenewalB4,
  waiverRenewalB,
} from "./type/waiverRenewal.js";
export { waiverRenewalWithdraw } from "./type/waiverRenewalWithdraw.js";
export {
  waiverAmendment,
  waiverAmendmentB4,
  waiverAmendmentB,
} from "./type/waiverAmendment.js";
export { waiverAmendmentWithdraw } from "./type/waiverAmendmentWithdraw.js";
export { waiverAppendixK } from "./type/waiverAppendixK.js";
export { waiverAppendixKRAIResponse } from "./type/waiverAppendixKRAIResponse.js";
export { waiverAppendixKWithdraw } from "./type/waiverAppendixKWithdraw.js";
export { waiverRAIResponse } from "./type/waiverRAIResponse.js";
export { medicaidSPA } from "./type/medicaidSPA.js";
export { medicaidSPARAIResponse } from "./type/medicaidSPARAIResponse.js";
export { medicaidSPAWithdraw } from "./type/medicaidSPAWithdraw.js";
export { medicaidSPASubsequentSubmission } from "./type/medicaidSPASubsequentSubmission.js";
export { chipSPA } from "./type/chipSPA.js";
export { chipSPARAIResponse } from "./type/chipSPARAIResponse.js";
export { chipSPAWithdraw } from "./type/chipSPAWithdraw.js";
export { chipSPASubsequentSubmission } from "./type/chipSPASubsequentSubmission.js";
export { enableRaiWithdraw } from "./type/enableRaiWithdraw.js";
export { disableRaiWithdraw } from "./type/disableRaiWithdraw.js";
export { withdrawRAIResponse } from "./type/withdrawRAIResponse.js";
export {
  initialWaiverSubsequentSubmission,
  initialWaiverB4SubsequentSubmission,
  initialWaiverBSubsequentSubmission,
} from "./type/initialWaiverSubsequentSubmission.js";
export {
  waiverRenewalSubsequentSubmission,
  waiverRenewalB4SubsequentSubmission,
  waiverRenewalBSubsequentSubmission,
} from "./type/waiverRenewalSubsequentSubmission.js";
export {
  waiverAmendmentSubsequentSubmission,
  waiverAmendmentB4SubsequentSubmission,
  waiverAmendmentBSubsequentSubmission,
} from "./type/waiverAmendmentSubsequentSubmission.js";
export { waiverAppKSubsequentSubmission } from "./type/waiverAppKSubsequentSubmission.js";

import { ROUTES, ONEMAC_ROUTES } from "./routes.js";
export {
  ROUTES,
  ONEMAC_ROUTES,
  TYPE_TO_DETAIL_ROUTE,
  FAQ_TARGET,
} from "./routes.js";

export const dynamoConfig = process.env.IS_OFFLINE
  ? {
      endpoint: "http://localhost:8000",
    }
  : {};

/**
 * Codes to send to front end
 */
export const RESPONSE_CODE = {
  NONE: "NONE",
  LOGIN_ERROR: "UR403",
  SUCCESSFULLY_SUBMITTED: "SC000",
  SUCCESSFULLY_SUBMITTED_SUBSEQUENT_SUBMISSION: "SS000",
  DATA_MISSING: "SC001",
  SUBMISSION_SAVE_FAILURE: "SC003",
  ATTACHMENTS_MISSING: "SC002",
  WITHDRAW_REQUESTED: "WP000",
  WITHDRAW_RAI_REQUESTED: "WR000",
  VALIDATION_ERROR: "VA000",
  ATTACHMENT_ERROR: "AT000",
  UPLOADS_ERROR: "AT001",
  EMAIL_NOT_SENT: "EM000",
  SYSTEM_ERROR: "SY000",
  DATA_RETRIEVAL_ERROR: "DT000",
  SESSION_EXPIRED: "SY001",
  TRANSMITTAL_ID_TERRITORY_NOT_VALID: "ID001",
  DUPLICATE_ID: "ID002",
  ID_NOT_FOUND: "ID000",
  USER_NOT_AUTHORIZED: "UR040",
  USER_EXISTS: "UR002",
  USER_NOT_FOUND: "UR041",
  USER_SUBMITTED: "UR000",
  USER_SUBMISSION_FAILED: "UR001",
  SUCCESS_USER_GRANTED: "UR046",
  SUCCESS_USER_REVOKED: "UR047",
  SUCCESS_USER_DENIED: "UR048",
  DASHBOARD_RETRIEVAL_ERROR: "DB000",
  DASHBOARD_LIST_FETCH_ERROR: "DB00",
  HELPDESK_USER_SUBMITTED: "HU000",
  CMS_REVIEWER_USER_SUBMITTED: "CU000",
  CMS_ROLE_APPROVER_USER_SUBMITTED: "CU001",
  SUBMISSION_ID_NOT_FOUND_WARNING: "OMP002",
  SUBMISSION_ID_EXIST_WARNING: "OMP003",
  RAI_RESPONSE_WITHDRAW_ENABLE_SUCCESS: "RE000",
  RAI_RESPONSE_WITHDRAW_DISABLE_SUCCESS: "RE001",
  OK: "200",
};

export const FORM_SUCCESS_RESPONSE_CODES = [
  RESPONSE_CODE.SUCCESSFULLY_SUBMITTED,
  RESPONSE_CODE.WITHDRAW_REQUESTED,
  RESPONSE_CODE.WITHDRAW_RAI_REQUESTED,
  RESPONSE_CODE.SUCCESSFULLY_SUBMITTED_SUBSEQUENT_SUBMISSION,
];

/**
 * Map Warning Message displayed on Waiver Form to message to include in CMS Email
 */

export const cmsEmailMapToFormWarningMessages = {
  [RESPONSE_CODE.SUBMISSION_ID_EXIST_WARNING]:
    "<br/>Please review this submission for correctness as OneMAC found a matching record for the number entered by the state.",
  [RESPONSE_CODE.SUBMISSION_ID_NOT_FOUND_WARNING]:
    "<br/>Please review this submission for correctness as OneMAC did not find a matching record for the number entered by the state.",
};

export const approvedBlueWarningMessage =
  "You will still be able to submit but your submission ID does not appear to match our records. Before proceeding, please check to ensure you have the correct submission ID. If you need support, please contact the OneMAC Help Desk at OneMAC_Helpdesk@cms.hhs.gov or (833) 228-2540.";

export const USER_ADMIN_PERMISSION = {
  STATE_SUBMITTER: "none",
  STATE_SYSTEM_ADMIN: "statesubmitter",
  CMS_ROLE_APPROVER: "statesystemadmin",
};

/**
 * Possible user types
 */
export const USER_ROLE = {
  STATE_SUBMITTER: "statesubmitter",
  CMS_REVIEWER: "cmsreviewer",
  STATE_SYSTEM_ADMIN: "statesystemadmin",
  DEFAULT_CMS_USER: "defaultcmsuser",
  CMS_ROLE_APPROVER: "cmsroleapprover",
  SYSTEM_ADMIN: "systemadmin",
  HELPDESK: "helpdesk",
};

export const APPROVING_USER_ROLE = {
  [USER_ROLE.STATE_SUBMITTER]: USER_ROLE.STATE_SYSTEM_ADMIN,
  [USER_ROLE.STATE_SYSTEM_ADMIN]: USER_ROLE.CMS_ROLE_APPROVER,
  [USER_ROLE.CMS_ROLE_APPROVER]: USER_ROLE.SYSTEM_ADMIN,
  [USER_ROLE.DEFAULT_CMS_USER]: USER_ROLE.CMS_ROLE_APPROVER,
  [USER_ROLE.HELPDESK]: USER_ROLE.SYSTEM_ADMIN,
  [USER_ROLE.CMS_REVIEWER]: USER_ROLE.CMS_ROLE_APPROVER,
};

export const HELPING_USER_ROLE = {
  ...APPROVING_USER_ROLE,
  [USER_ROLE.SYSTEM_ADMIN]: USER_ROLE.HELP_DESK,
};

/**
 * Possible user status
 */
export const USER_STATUS = {
  PENDING: "pending",
  DENIED: "denied",
  REVOKED: "revoked",
  ACTIVE: "active",
};

/**
 * Possible user role labels
 */
export const roleLabels = {
  [USER_ROLE.STATE_SUBMITTER]: "State Submitter",
  [USER_ROLE.STATE_SYSTEM_ADMIN]: "State System Admin",
  [USER_ROLE.DEFAULT_CMS_USER]: "CMS Read-only User",
  [USER_ROLE.CMS_ROLE_APPROVER]: "CMS Role Approver",
  [USER_ROLE.CMS_REVIEWER]: "CMS Reviewer",
  [USER_ROLE.SYSTEM_ADMIN]: "CMS System Admin",
  [USER_ROLE.HELPDESK]: "Help Desk",
};

const ALL_USERS_ROUTES = [
  ROUTES.HOME,
  ROUTES.PROFILE,
  ROUTES.DEVLOGIN,
  ROUTES.FAQ,
];

export class Role {
  constructor() {
    this.canAccessDashboard = false;
    this.canDownloadCsv = false;
    this.canAccessForms = false;
    this.canSeeSubjectAndDescription = false;
    this.canAccessUserManagement = false;
    this.canAccessMetrics = false;
    this.canManageUsers = false;
    this.canAccessAdminTools = false;
    this.isCMSUser = false;
  }

  getAccesses() {
    const accesses = [...ALL_USERS_ROUTES];

    if (this.canAccessDashboard)
      accesses.push(ROUTES.DASHBOARD, ONEMAC_ROUTES.PACKAGE_LIST);
    if (this.canAccessForms) {
      accesses.push(
        ROUTES.DASHBOARD,
        ROUTES.PACKAGE_LIST,
        ROUTES.DETAIL,
        ROUTES.NEW_SUBMISSION_SELECTION,
        ROUTES.SPA,
        ROUTES.SPA_RAI,
        ROUTES.CHIP_SPA,
        ROUTES.CHIP_SPA_RAI,
        ROUTES.WAIVER,
        ROUTES.WAIVER_APP_K,
        ROUTES.WAIVER_EXTENSION,
        ROUTES.WAIVER_EXTENSION_B,
        ROUTES.WAIVER_EXTENSION_C,
        ROUTES.WAIVER_RAI
      );
    }
    if (this.canAccessUserManagement) accesses.push(ROUTES.USER_MANAGEMENT);
    if (this.canAccessMetrics) accesses.push(ROUTES.METRICS);

    return accesses;
  }
}

class DefaultUser extends Role {
  constructor() {
    super();
    this.canAccessDashboard = true;
    this.canDownloadCsv = true;
    this.canSeeSubjectAndDescription = true;
  }
}

class DefaultCMSUser extends Role {
  constructor() {
    super();
    this.canAccessDashboard = true;
    this.canDownloadCsv = true;
    this.canSeeSubjectAndDescription = true;
    this.isCMSUser = true;
  }
}

class StateSubmitter extends Role {
  constructor() {
    super();
    this.canAccessDashboard = true;
    this.canAccessForms = true;
  }
}

class StateSystemAdmin extends Role {
  constructor() {
    super();
    this.canAccessUserManagement = true;
    this.canAccessDashboard = true;
    this.canAccessForms = true;
    this.canManageUsers = true;
  }
}

class CmsReviewer extends Role {
  constructor() {
    super();
    this.canAccessDashboard = true;
    this.canSeeSubjectAndDescription = true;
    this.isCMSUser = true;
  }
}

class CmsRoleApprover extends Role {
  constructor() {
    super();
    this.canDownloadCsv = true;
    this.canAccessUserManagement = true;
    this.canManageUsers = true;
    this.isCMSUser = true;
  }
}

class SystemAdmin extends Role {
  constructor() {
    super();
    this.canAccessDashboard = true;
    this.canDownloadCsv = true;
    this.canAccessUserManagement = true;
    this.canAccessMetrics = true;
    this.canManageUsers = true;
    this.canAccessAdminTools = true;
    this.canSeeSubjectAndDescription = true;
    this.isCMSUser = true;
  }
}

class Helpdesk extends Role {
  constructor() {
    super();
    this.canAccessDashboard = true;
    this.canAccessUserManagement = true;
    this.canAccessMetrics = true;
    this.canSeeSubjectAndDescription = true;
    this.canDownloadCsv = true;
  }
}

/**
 * Finds out what a user's most relevant role information is.
 */
export const effectiveRoleForUser = (roleList = []) => {
  let pendingRole;
  let otherOutput = null;

  for (const { role, status } of roleList) {
    switch (status) {
      case USER_STATUS.ACTIVE:
        return [role, status];
      case USER_STATUS.PENDING:
        pendingRole = role;
        break;
      default:
        otherOutput = [role, status];
        break;
    }
  }

  if (pendingRole) return [pendingRole, USER_STATUS.PENDING];

  return otherOutput;
};

export const inFlightRoleRequestForUser = (roleList) => {
  const effectiveAccess = effectiveRoleForUser(roleList);

  if (!effectiveAccess) return null;

  const [effectiveRole, effectiveStatus] = effectiveAccess;
  switch (effectiveStatus) {
    case USER_STATUS.PENDING:
      return effectiveRole;
    case USER_STATUS.ACTIVE: {
      const pendingRole = roleList.find(
        ({ status, role }) =>
          status === USER_STATUS.PENDING && role !== effectiveRole
      );
      return pendingRole && pendingRole.role;
    }
    default:
      return null;
  }
};

export const getUserRoleObj = (roleInfo) => {
  if (Array.isArray(roleInfo)) {
    const roleResult = effectiveRoleForUser(roleInfo);
    if (roleResult === null) return new DefaultUser();
    [roleInfo] = roleResult;
  } else if (!roleInfo) {
    return new DefaultUser();
  }

  return new {
    [USER_ROLE.STATE_SUBMITTER]: StateSubmitter,
    [USER_ROLE.STATE_SYSTEM_ADMIN]: StateSystemAdmin,
    [USER_ROLE.CMS_ROLE_APPROVER]: CmsRoleApprover,
    [USER_ROLE.DEFAULT_CMS_USER]: DefaultCMSUser,
    [USER_ROLE.SYSTEM_ADMIN]: SystemAdmin,
    [USER_ROLE.HELPDESK]: Helpdesk,
    [USER_ROLE.CMS_REVIEWER]: CmsReviewer,
  }[roleInfo]();
};

export const getActiveTerritories = (roleList) => {
  let activeTerritories = ["N/A"];

  if (roleList && roleList.length > 0) {
    activeTerritories = roleList
      .filter(({ status }) => status === USER_STATUS.ACTIVE)
      .map(({ territory }) => territory);
  }
  return activeTerritories;
};

// NOTE: In Future this may come from SeaTool or Backend Process.
export const territoryList = [
  {
    label: "Alabama",
    value: "AL",
  },
  {
    label: "Alaska",
    value: "AK",
  },
  {
    label: "American Samoa",
    value: "AS",
  },
  {
    label: "Arizona",
    value: "AZ",
  },
  {
    label: "Arkansas",
    value: "AR",
  },
  {
    label: "California",
    value: "CA",
  },
  {
    label: "Colorado",
    value: "CO",
  },
  {
    label: "Connecticut",
    value: "CT",
  },
  {
    label: "Delaware",
    value: "DE",
  },
  {
    label: "District Of Columbia",
    value: "DC",
  },
  {
    label: "Federated States Of Micronesia",
    value: "FM",
  },
  {
    label: "Florida",
    value: "FL",
  },
  {
    label: "Georgia",
    value: "GA",
  },
  {
    label: "Guam",
    value: "GU",
  },
  {
    label: "Hawaii",
    value: "HI",
  },
  {
    label: "Idaho",
    value: "ID",
  },
  {
    label: "Illinois",
    value: "IL",
  },
  {
    label: "Indiana",
    value: "IN",
  },
  {
    label: "Iowa",
    value: "IA",
  },
  {
    label: "Kansas",
    value: "KS",
  },
  {
    label: "Kentucky",
    value: "KY",
  },
  {
    label: "Louisiana",
    value: "LA",
  },
  {
    label: "Maine",
    value: "ME",
  },
  {
    label: "Marshall Islands",
    value: "MH",
  },
  {
    label: "Maryland",
    value: "MD",
  },
  {
    label: "Massachusetts",
    value: "MA",
  },
  {
    label: "Michigan",
    value: "MI",
  },
  {
    label: "Minnesota",
    value: "MN",
  },
  {
    label: "Mississippi",
    value: "MS",
  },
  {
    label: "Missouri",
    value: "MO",
  },
  {
    label: "Montana",
    value: "MT",
  },
  {
    label: "Nebraska",
    value: "NE",
  },
  {
    label: "Nevada",
    value: "NV",
  },
  {
    label: "New Hampshire",
    value: "NH",
  },
  {
    label: "New Jersey",
    value: "NJ",
  },
  {
    label: "New Mexico",
    value: "NM",
  },
  {
    label: "New York",
    value: "NY",
  },
  {
    label: "North Carolina",
    value: "NC",
  },
  {
    label: "North Dakota",
    value: "ND",
  },
  {
    label: "Northern Mariana Islands",
    value: "MP",
  },
  {
    label: "Ohio",
    value: "OH",
  },
  {
    label: "Oklahoma",
    value: "OK",
  },
  {
    label: "Oregon",
    value: "OR",
  },
  {
    label: "Palau",
    value: "PW",
  },
  {
    label: "Pennsylvania",
    value: "PA",
  },
  {
    label: "Puerto Rico",
    value: "PR",
  },
  {
    label: "Rhode Island",
    value: "RI",
  },
  {
    label: "South Carolina",
    value: "SC",
  },
  {
    label: "South Dakota",
    value: "SD",
  },
  {
    label: "Tennessee",
    value: "TN",
  },
  {
    label: "Texas",
    value: "TX",
  },
  {
    label: "Utah",
    value: "UT",
  },
  {
    label: "Vermont",
    value: "VT",
  },
  {
    label: "Virgin Islands",
    value: "VI",
  },
  {
    label: "Virginia",
    value: "VA",
  },
  {
    label: "Washington",
    value: "WA",
  },
  {
    label: "West Virginia",
    value: "WV",
  },
  {
    label: "Wisconsin",
    value: "WI",
  },
  {
    label: "Wyoming",
    value: "WY",
  },
  {
    label: "Test Data",
    value: "ZZ",
  },
];

export const territoryMap = territoryList.reduce(
  (acc, { label, value }) => ({ ...acc, [value]: label }),
  {}
);

export const territoryCodeList = territoryList.map((item) => item.value);
