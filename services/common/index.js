/**
 * Common Shares Libs for the CMS Submissions Application.
 * This will contain static items needed by both the frontend and backend.
 */

import * as ChangeRequest from "./changeRequest";
export { ChangeRequest };

import { ROUTES } from "./routes";
export * from "./routes";

/**
 * Codes to send to front end
 */
export const RESPONSE_CODE = {
  NONE: "NONE",
  LOGIN_ERROR: "UR403",
  SUCCESSFULLY_SUBMITTED: "SC000",
  DATA_MISSING: "SC001",
  ATTACHMENTS_MISSING: "SC002",
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
  USER_NOT_FOUND: "UR041",
  USER_SUBMITTED: "UR000",
  USER_SUBMISSION_FAILED: "UR001",
  CALLING_USER_PENDING: "UR043",
  CALLING_USER_REVOKED: "UR044",
  CALLING_USER_DENIED: "UR045",
  SUCCESS_USER_GRANTED: "UR046",
  SUCCESS_USER_REVOKED: "UR047",
  SUCCESS_USER_DENIED: "UR048",
  DASHBOARD_RETRIEVAL_ERROR: "DB000",
  DASHBOARD_LIST_FETCH_ERROR: "DB00",
  HELPDESK_USER_SUBMITTED: "HU000",
  CMS_REVIEWER_USER_SUBMITTED: "CU000",
};

export const USER_ADMIN_PERMISSION = {
  STATE_SUBMITTER: "none",
  STATE_ADMIN: "statesubmitter",
  CMS_APPROVER: "stateadmin",
};

/**
 * Possible user types
 */
export const USER_TYPE = {
  STATE_SUBMITTER: "statesubmitter",
  CMS_REVIEWER: "cmsreviewer",
  STATE_ADMIN: "stateadmin",
  CMS_APPROVER: "cmsapprover",
  SYSTEM_ADMIN: "systemadmin",
  HELPDESK: "helpdesk",
};

export const ROLES = USER_TYPE;

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
  statesubmitter: "State Submitter",
  stateadmin: "State Admin",
  cmsapprover: "CMS Approver",
  [USER_TYPE.CMS_REVIEWER]: "CMS Reviewer",
  [USER_TYPE.SYSTEM_ADMIN]: "CMS System Admin",
  helpdesk: "Help Desk",
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
    this.canAccessForms = false;
    this.canAccessUserManagement = false;
    this.canAccessMetrics = false;
  }

  getAccesses() {
    const accesses = [...ALL_USERS_ROUTES];

    if (this.canAccessDashboard) accesses.push(ROUTES.DASHBOARD);
    if (this.canAccessForms) {
      accesses.push(
        ROUTES.DASHBOARD,
        ROUTES.NEW_SUBMISSION_SELECTION,
        ROUTES.SPA,
        ROUTES.SPA_RAI,
        ROUTES.CHIP_SPA,
        ROUTES.CHIP_SPA_RAI,
        ROUTES.WAIVER,
        ROUTES.WAIVER_APP_K,
        ROUTES.WAIVER_EXTENSION,
        ROUTES.WAIVER_RAI
      );
    }
    if (this.canAccessUserManagement) accesses.push(ROUTES.USER_MANAGEMENT);
    if (this.canAccessMetrics) accesses.push(ROUTES.METRICS);

    return accesses;
  }
}

class StateSubmitter extends Role {
  constructor() {
    super();
    this.canAccessDashboard = true;
    this.canAccessForms = true;
  }
}

class StateAdmin extends Role {
  constructor() {
    super();
    this.canAccessUserManagement = true;
    this.canAccessMetrics = true;
  }
}

class CmsReviewer extends Role {
  constructor() {
    super();
    this.canAccessDashboard = true;
  }
}

class CmsApprover extends Role {
  constructor() {
    super();
    this.canAccessUserManagement = true;
    this.canAccessMetrics = true;
  }
}

class SystemAdmin extends Role {
  constructor() {
    super();
    this.canAccessUserManagement = true;
    this.canAccessMetrics = true;
  }
}

class Helpdesk extends Role {
  constructor() {
    super();
    this.canAccessDashboard = true;
    this.canAccessUserManagement = true;
    this.canAccessMetrics = true;
  }
}

export const getUserRoleObj = (role) =>
  new ({
    [USER_TYPE.STATE_SUBMITTER]: StateSubmitter,
    [USER_TYPE.STATE_ADMIN]: StateAdmin,
    [USER_TYPE.CMS_APPROVER]: CmsApprover,
    [USER_TYPE.SYSTEM_ADMIN]: SystemAdmin,
    [USER_TYPE.HELPDESK]: Helpdesk,
    [USER_TYPE.CMS_REVIEWER]: CmsReviewer,
  }[role] || Role)();

const datesDescending = ({ date: dateA }, { date: dateB }) => dateB - dateA;

/**
 * Finds a user's most recent approval status. For state submitters and admins, it takes an optional state code to search for.
 * @param user - The user object to inspect.
 * @param [state] - A two-letter territory code to search for (only for state submitters and admins).
 */
export const latestAccessStatus = ({ type, attributes = [] }, state = "") => {
  switch (type) {
    case ROLES.STATE_SUBMITTER:
    case ROLES.STATE_ADMIN: {
      const stateObj = attributes.find(({ stateCode }) => stateCode === state);
      if (!stateObj) return null;

      return stateObj.history.sort(datesDescending)[0].status;
    }

    case ROLES.CMS_APPROVER:
    case ROLES.HELPDESK:
    case ROLES.SYSTEM_ADMIN:
      {
        return attributes.sort(datesDescending)[0].status;
      }

      attributes = stateObj.history;
  }

  return attributes.sort(datesDescending)[0].status;
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
];

export const territoryMap = territoryList.reduce(
  (acc, { label, value }) => ({ ...acc, [value]: label }),
  {}
);

export const territoryCodeList = territoryList.map((item) => item.value);
