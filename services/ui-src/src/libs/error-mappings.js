import { ALERTS_MSG } from "./alert-messages";

/**
 *
 */
export const getAlert = (errorCode) => {
  let returnAlert = ALERTS_MSG.NONE;

  switch (errorCode) {
    case "NONE":
    case undefined:
      returnAlert = ALERTS_MSG.NONE;
      break;
    // app-api/response-codes.js    NONE: ""
    case "":
      returnAlert = ALERTS_MSG.SUBMISSION_SUCCESS;
      break;
    // app-api/response-codes.js    USER_SUBMITTED: "DB000",
    case "DB000":
      returnAlert = ALERTS_MSG.DASHBOARD_LIST_FETCH_ERROR;
      break;
    // app-api/response-codes.js    USER_SUBMITTED: "DB001",
    case "DB001":
      returnAlert = ALERTS_MSG.FETCH_ERROR;
      break;
    // app-api/response-codes.js    SUBMISSION_FETCH_ERROR: "DB002",
    case "DB002":
      returnAlert = ALERTS_MSG.SUBMISSION_FETCH_ERROR;
      break;

    // app-api/response-codes.js    PACKAGE_FETCH_ERROR: "DB003",
    case "DB003":
      returnAlert = ALERTS_MSG.PACKAGE_FETCH_ERROR;
      break;
    // app-api/response-codes.js    USER_SUBMITTED: "UR000",
    case "UR000":
      returnAlert = ALERTS_MSG.SUBMISSION_SUCCESS;
      break;
    case "HU000":
      returnAlert = ALERTS_MSG.HELPDESK_SUBMISSION_SUCCESS;
      break;
    // app-api/response-codes.js    SUCCESSFULLY_SUBMITTED: "SC000",
    case "SC000":
      returnAlert = ALERTS_MSG.SUBMISSION_SUCCESS_SURVEY;
      break;
    //     DATA_MISSING: "SC001",
    case "SC001":
      returnAlert = ALERTS_MSG.SUBMISSION_INCOMPLETE;
      break;
    //    ATTACHMENTS_MISSING: "SC002",
    case "SC002":
      returnAlert = ALERTS_MSG.REQUIRED_UPLOADS_MISSING;
      break;
    // app-api/response-codes.js    CALLING_USER_PENDING: "UR043",
    // app-api/response-codes.js    CALLING_USER_REVOKED: "UR044",
    // app-api/response-codes.js    CALLING_USER_DENIED: "UR045",
    // we return these, but Front End currently does not respond with an alert
    case "UR043":
    case "UR044":
    case "UR045":
      returnAlert = ALERTS_MSG.NONE;
      break;
    // app-api/response-codes.js    VALIDATION_ERROR: "VA000",
    case "VA000":
    case "UR040":
    case "UR041":
    case "UR042":
    case "UR001":
    case "UR002":
      returnAlert = ALERTS_MSG.SUBMISSION_ERROR;
      break;
    // app-api/response-codes.js    ATTACHMENT_ERROR: "AT000",
    case "AT000":
      returnAlert = ALERTS_MSG.REQUIRED_UPLOADS_MISSING;
      break;
    // app-api/response-codes.js    SYSTEM_ERROR: "SY000",
    case "SY000":
      returnAlert = ALERTS_MSG.CONTACT_HELP_DESK;
      break;
    // app-api/response-codes.js    SESSION_EXPIRED: "SY001",
    case "SY001":
      returnAlert = ALERTS_MSG.SESSION_EXPIRED;
      break;
    // app-api/response-codes.js    TRANSMITTAL_ID_TERRITORY_NOT_VALID: "ID001",
    case "ID001":
      returnAlert = ALERTS_MSG.SUBMISSION_TERRITORY_ERROR;
      break;
    // app-api/response-codes.js    DUPLICATE_ID: "ID002",
    case "ID002":
      returnAlert = ALERTS_MSG.SUBMISSION_DUPLICATE_ID;
      break;
    // app-api/response-codes.js    ID_NOT_FOUND: "ID000",
    case "ID000":
      returnAlert = ALERTS_MSG.SUBMISSION_ID_NOT_FOUND;
      break;
    // app-api/response-codes.js    WAIVER_RENEWAL_ID: "ID020",
    case "ID020":
      returnAlert = ALERTS_MSG.WAIVER_RENEWAL_NO_ID;
      break;
    // app-api/response-codes.js    WAIVER_AMENDMENT_ON_K: "ID031",
    case "ID031":
      returnAlert = ALERTS_MSG.WAIVER_NEED_ID_FOR_K;
      break;
    // app-api/response-codes.js    WAIVER_AMENDMENT_NO_ID: "ID022",
    case "ID022":
      returnAlert = ALERTS_MSG.WAIVER_AMENDMENT_NO_ID;
      break;
    // app-api/response-codes.js    WAIVER_NEW_NOT_K: "ID023",
    case "ID023":
      returnAlert = ALERTS_MSG.WAIVER_NEW_NOT_K;
      break;
    // app-api/response-codes.js    WAIVER_ACTION_UNKNOWN: "WA000",
    case "WA000":
      returnAlert = ALERTS_MSG.WAIVER_ACTION_UNKNOWN;
      break;
    //  SUCCESS_USER_GRANTED: "UR046",
    case "UR046":
      returnAlert = ALERTS_MSG.USER_STATUS_GRANTED;
      break;
    //  SUCCESS_USER_REVOKED: "UR047",
    case "UR047":
      returnAlert = ALERTS_MSG.USER_STATUS_REVOKED;
      break;
    //  SUCCESS_USER_DENIED: "UR048",
    case "UR048":
      returnAlert = ALERTS_MSG.USER_STATUS_DENIED;
      break;
    //  SUCCESS_USER_DENIED: "UR048",
    case "UN000":
      returnAlert = ALERTS_MSG.UNKNOWN_SYSTEM_ERROR;
      break;
    default:
      console.log("Not sure what this error is.", errorCode);
      returnAlert = ALERTS_MSG.UNKNOWN_SYSTEM_ERROR;
      break;
  }
  return returnAlert;
};
