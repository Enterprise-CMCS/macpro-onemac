import { RESPONSE_CODE } from "cmscommonlib";
import config from "../utils/config";
import { helpDeskContact } from "./helpDeskContact";

/**
 * Alert types
 */
export const ALERT_TYPES = {
  INFO: null, // Per CMS Design System
  WARNING: "warn",
  ERROR: "error",
  SUCCESS: "success",
};

/**
 * List of alert messages for the application.
 */
export const ALERTS_MSG = {
  // DOn't show
  NONE: {
    type: ALERT_TYPES.SUCCESS,
    heading: "",
    text: "",
  },

  // Success
  SUBMISSION_SUCCESS: {
    type: ALERT_TYPES.SUCCESS,
    heading: "Submission Completed",
    text: "Your submission has been received.",
  },

  HELPDESK_SUBMISSION_SUCCESS: {
    type: ALERT_TYPES.SUCCESS,
    heading: "Submission Complete",
    text: "Thank you. The CMS System Admin will verify your access and credentials.  Please check your email for details on access.",
  },

  CMS_REVIEWER_SUBMISSION_SUCCESS: {
    type: ALERT_TYPES.SUCCESS,
    heading: "Registration Complete",
    text: "Thank you. The CMS Role Approver will verify your access and credentials.  Please check your email for details on access.",
  },

  // Success woth Survey Link
  SUBMISSION_SUCCESS_SURVEY: {
    type: ALERT_TYPES.SUCCESS,
    heading: "Submission Completed",
    text: "Thanks for your submission. We truly value your feedback. Please consider taking our $Link$.",
    linkURL:
      "https://docs.google.com/forms/d/e/1FAIpQLSfnmjpetVur4NPBTA5V_jP2adSQNmVaUSL6R8sd6vWSuHQpAg/viewform",
    linkText: "Post-Submission Survey",
  },

  // Errors and warnings
  DASHBOARD_LIST_FETCH_ERROR: {
    type: ALERT_TYPES.ERROR,
    heading: "Unable to Fetch Your Submissions",
    text: "There was an error fetching your list of submissions.  Please reload the page and try again.",
  },
  FETCH_ERROR: {
    type: ALERT_TYPES.ERROR,
    heading: "Data Retrieval Error",
    text: "We encountered an error while fetching your data.  Please reload the page and try again.",
  },
  SUBMISSION_ERROR: {
    type: ALERT_TYPES.ERROR,
    heading: "Submission Error",
    text: "There was an issue submitting your request. Please try again.",
  },
  SUBMISSION_DUPLICATE_ID: {
    type: ALERT_TYPES.ERROR,
    heading: "Duplicate ID",
    text: "According to our records, this ID already exists. Please check the ID and try entering it again.",
  },
  SUBMISSION_TERRITORY_ERROR: {
    type: ALERT_TYPES.ERROR,
    heading: "Territory Error",
    text: "The Transmittal ID Territory/State is not Valid Please check the Transmittal ID and try entering it again.",
  },
  SUBMISSION_ID_NOT_FOUND: {
    type: ALERT_TYPES.ERROR,
    heading: "ID Not Found",
    text: "We could not find that ID in our system, please try again.",
  },
  WAIVER_RENEWAL_NO_ID: {
    type: ALERT_TYPES.ERROR,
    heading: "Waiver Action Error",
    text: "Waiver Renewal Action requires existing ID",
  },
  WAIVER_AMENDMENT_NO_ID: {
    type: ALERT_TYPES.ERROR,
    heading: "Waiver Action Error",
    text: "Waiver Amendment actions require existing ID",
  },
  WAIVER_NEED_ID_FOR_K: {
    type: ALERT_TYPES.ERROR,
    heading: "Waiver Action Error",
    text: "Amendment K actions must have existing IDs",
  },
  WAIVER_NEW_NOT_K: {
    type: ALERT_TYPES.ERROR,
    heading: "Waiver Action Error",
    text: "New Waiver Actions (other than Amendment Ks) require new IDs",
  },
  WAIVER_ACTION_UNKNOWN: {
    type: ALERT_TYPES.ERROR,
    heading: "Waiver Action Error",
    text: "This Waiver Action cannot be validated",
  },
  SUBMISSION_INCOMPLETE: {
    type: ALERT_TYPES.ERROR,
    heading: "There was a problem submitting your form.",
    text: "Please review the highlighted items below before resubmitting.",
  },
  REQUIRED_UPLOADS_MISSING: {
    type: ALERT_TYPES.ERROR,
    heading: "Missing Required Attachments",
    text: "Please attach the required documents before resubmitting.",
  },
  LOGIN_ERROR: {
    type: ALERT_TYPES.ERROR,
    heading: "Login Error",
    text: "We were unable to log you in with the credentials you provided. Please try to login again.",
  },
  ATTACHMENT_TOO_LARGE: {
    type: ALERT_TYPES.ERROR,
    heading: "Attachment Too Large",
    text: `An individual attachment cannot exceed ${config.MAX_ATTACHMENT_SIZE_MB} MB in size.  Please select a smaller file.`,
  },
  NOT_AUTHENTICATED: {
    type: ALERT_TYPES.WARNING,
    heading: "Login Required",
    text: "You need to be signed in to your account to access this page. Please login and try again.",
  },
  CONTACT_HELP_DESK: {
    type: ALERT_TYPES.ERROR,
    heading: "System Submission Error",
    text: `Please contact the Helpdesk ${helpDeskContact.email} or ${helpDeskContact.phone} for additional support.`,
  },
  USER_STATUS_GRANTED: {
    type: ALERT_TYPES.SUCCESS,
    heading: "Status Change",
    text: `$personalize$ has been granted access, a notification has been sent to their email.`,
  },
  USER_STATUS_DENIED: {
    type: ALERT_TYPES.SUCCESS,
    heading: "Status Change",
    text: `$personalize$ has been denied access, a notification has been sent to their email.`,
  },
  USER_STATUS_REVOKED: {
    type: ALERT_TYPES.SUCCESS,
    heading: "Status Change",
    text: `$personalize$'s access has been revoked, a notification has been sent to their email.`,
  },
};

export const alertCodeAlerts = {
  NONE: ALERTS_MSG.NONE,
  [RESPONSE_CODE.NONE]: ALERTS_MSG.NONE,
  [RESPONSE_CODE.LOGIN_ERROR]: ALERTS_MSG.LOGIN_ERROR,
  [RESPONSE_CODE.SUCCESSFULLY_SUBMITTED]: ALERTS_MSG.SUBMISSION_SUCCESS_SURVEY,
  [RESPONSE_CODE.DATA_MISSING]: ALERTS_MSG.SUBMISSION_INCOMPLETE,
  [RESPONSE_CODE.ATTACHMENTS_MISSING]: ALERTS_MSG.REQUIRED_UPLOADS_MISSING,
  [RESPONSE_CODE.USER_SUBMITTED]: ALERTS_MSG.SUBMISSION_SUCCESS,
  [RESPONSE_CODE.VALIDATION_ERROR]: ALERTS_MSG.SUBMISSION_ERROR,
  [RESPONSE_CODE.ATTACHMENT_ERROR]: ALERTS_MSG.REQUIRED_UPLOADS_MISSING,
  [RESPONSE_CODE.EMAIL_NOT_SENT]: ALERTS_MSG.SUBMISSION_ERROR,
  [RESPONSE_CODE.SYSTEM_ERROR]: ALERTS_MSG.CONTACT_HELP_DESK,
  [RESPONSE_CODE.TRANSMITTAL_ID_TERRITORY_NOT_VALID]:
    ALERTS_MSG.SUBMISSION_TERRITORY_ERROR,
  [RESPONSE_CODE.DUPLICATE_ID]: ALERTS_MSG.SUBMISSION_DUPLICATE_ID,
  [RESPONSE_CODE.ID_NOT_FOUND]: ALERTS_MSG.SUBMISSION_ID_NOT_FOUND,
  [RESPONSE_CODE.USER_NOT_AUTHORIZED]: ALERTS_MSG.SUBMISSION_ERROR,
  [RESPONSE_CODE.USER_NOT_FOUND]: ALERTS_MSG.SUBMISSION_ERROR,
  [RESPONSE_CODE.USER_SUBMISSION_FAILED]: ALERTS_MSG.SUBMISSION_ERROR,
  [RESPONSE_CODE.USER_TYPE_MISMATCH_ERROR]: ALERTS_MSG.SUBMISSION_ERROR,
  [RESPONSE_CODE.USER_FORMAT_MISMATCH]: ALERTS_MSG.SUBMISSION_ERROR,
  [RESPONSE_CODE.CALLING_USER_PENDING]: ALERTS_MSG.NONE,
  [RESPONSE_CODE.CALLING_USER_REVOKED]: ALERTS_MSG.NONE,
  [RESPONSE_CODE.CALLING_USER_DENIED]: ALERTS_MSG.NONE,
  [RESPONSE_CODE.SUCCESS_USER_GRANTED]: ALERTS_MSG.USER_STATUS_GRANTED,
  [RESPONSE_CODE.SUCCESS_USER_REVOKED]: ALERTS_MSG.USER_STATUS_REVOKED,
  [RESPONSE_CODE.SUCCESS_USER_DENIED]: ALERTS_MSG.USER_STATUS_DENIED,
  [RESPONSE_CODE.DASHBOARD_RETRIEVAL_ERROR]: ALERTS_MSG.SUBMISSION_ERROR,
  [RESPONSE_CODE.HELPDESK_USER_SUBMITTED]:
    ALERTS_MSG.HELPDESK_SUBMISSION_SUCCESS,
  [RESPONSE_CODE.CMS_REVIEWER_USER_SUBMITTED]:
    ALERTS_MSG.CMS_REVIEWER_SUBMISSION_SUCCESS,
};
