import config from "../utils/config";

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

  // Errors and warnings
  DASHBOARD_LIST_FETCH_ERROR: {
    type: ALERT_TYPES.ERROR,
    heading: "Unable to Fetch Your Submissions",
    text:
      "There was an error fetching your list of submissions.  Please reload the page and try again.",
  },
  FETCH_ERROR: {
    type: ALERT_TYPES.ERROR,
    heading: "Data Retrieval Error",
    text:
      "We encountered an error while fetching your data.  Please reload the page and try again.",
  },
  SUBMISSION_ERROR: {
    type: ALERT_TYPES.ERROR,
    heading: "Submission Error",
    text: "There was an issue submitting your request.  Please try again.",
  },
  SUBMISSION_DUPLICATE_ID: {
    type: ALERT_TYPES.ERROR,
    heading: "Duplicate ID",
    text: "According to our records, this SPA ID already exists. Please check the SPA ID and try entering it again.",
  },
  SUBMISSION_TERRITORY_ERROR: {
    type: ALERT_TYPES.ERROR,
    heading: "Territory Error",
    text: "The Transmittal ID Territory/State is not Valid Please check the  Transmittal ID and try entering it again.",
  },
  SUBMISSION_ID_NOT_FOUND: {
    type: ALERT_TYPES.ERROR,
    heading: "ID Not Found",
    text: "We could not find that ID in our system, please try again.",
  },
  WAIVER_RENEWAL_ID: {
    type: ALERT_TYPES.ERROR,
    heading: "Waiver Action Error",
    text: "Waiver Renewal Action requires existing ID",
  },
  WAIVER_AMENDMENT_ON_K: {
    type: ALERT_TYPES.ERROR,
    heading: "Waiver Action Error",
    text:"Waiver Amendment Ks need new ID for amendment action",
  },
  WAIVER_AMENDMENT_NO_ID: {
    type: ALERT_TYPES.ERROR,
    heading: "Waiver Action Error",
    text:"Waiver Amendment actions (other than Amendment Ks) require existing ID",
  },
  WAIVER_NEW_ON_K: {
    type: ALERT_TYPES.ERROR,
    heading: "Waiver Action Error",
    text:"New Amendment K actions must have existing IDs",
  },
  WAIVER_NEW_NOT_K: {
    type: ALERT_TYPES.ERROR,
    heading: "Waiver Action Error",
    text:"New Waiver Actions (other than Amendment Ks) require new IDs",
  },
  WAIVER_ACTION_UNKNOWN: {
    type: ALERT_TYPES.ERROR,
    heading: "Waiver Action Error",
    text:"This Waiver Action cannot be validated",
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
    text: "We were unable to log you in with the credentials you provided.  Please try to login again.",
  },
  ATTACHMENT_TOO_LARGE: {
    type: ALERT_TYPES.ERROR,
    heading: "Attachment Too Large",
    text: `An individual attachment cannot exceed ${config.MAX_ATTACHMENT_SIZE_MB} MB in size.  Please select a smaller file.`,
  },
  NOT_AUTHENTICATED: {
    type: ALERT_TYPES.WARNING,
    heading: "Login Required",
    text: "You need to be signed in to your account to access this page.  Please login and try again.",
  }
};
