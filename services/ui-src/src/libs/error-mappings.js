import { ALERTS_MSG } from "./alert-messages";

/**
 *
 */
export const getAlert = (errorCode) => {
  let returnAlert = ALERTS_MSG.NONE;
  
  switch (errorCode) {
    // app-api/response-codes.js    NONE: ""
    case "":
      returnAlert = ALERTS_MSG.SUBMISSION_SUCCESS;
      break;
    // app-api/response-codes.js    SUCCESSFULLY_SUBMITTED: "SC000",
    case "SC000":
      returnAlert = ALERTS_MSG.SUBMISSION_SUCCESS;
      break;
    // app-api/response-codes.js    VALIDATION_ERROR: "VA000",
    case "VA000":
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
    default:
      console.log("Not sure what this error is", errorCode);
      returnAlert = ALERTS_MSG.SUBMISSION_ERROR;
      break;
  }
  return returnAlert;
};
