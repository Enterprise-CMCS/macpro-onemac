/**
 * Codes to send to front end
 */
export const RESPONSE_CODE = {
  NONE: "",
  SUCCESSFULLY_SUBMITTED: "SC000",
  VALIDATION_ERROR: "VA000",
  DATA_PARSING_ERROR: "VA001",
  ATTACHMENT_ERROR: "AT000",
  UPLOADS_ERROR: "AT001",
  EMAIL_NOT_SENT: "EM000",
  SYSTEM_ERROR: "SY000",
  DATA_RETRIEVAL_ERROR: "DT000",
  DASHBOARD_LIST_FETCH_ERROR: "DB000",
  FETCH_ERROR: "DB001",
  SUBMISSION_FETCH_ERROR: "DB002",
  PACKAGE_FETCH_ERROR: "DB003",
  TRANSMITTAL_ID_TERRITORY_NOT_VALID: "ID001",
  DUPLICATE_ID: "ID002",
  ID_NOT_FOUND: "ID000",
  WAIVER_RENEWAL_NO_ID: "ID020",
  WAIVER_NEED_ID_FOR_K: "ID031",
  WAIVER_AMENDMENT_NO_ID: "ID022",
  WAIVER_NEW_NOT_K: "ID023",
  WAIVER_ACTION_UNKNOWN: "WA000",
  USER_NOT_AUTHORIZED: "UR040",
  USER_NOT_FOUND: "UR041",
  USER_SUBMITTED: "UR000",
  USER_SUBMISSION_FAILED: "UR001",
  USER_TYPE_MISMATCH_ERROR: "UR002",
  USER_FORMAT_MISMATCH: "UR042",
  CALLING_USER_PENDING: "UR043",
  CALLING_USER_REVOKED: "UR044",
  CALLING_USER_DENIED: "UR045",
  HELPDESK_USER_SUBMITEED: "HU000",
  UNKNOWN_SYSTEM_ERROR: "UN000",
};
