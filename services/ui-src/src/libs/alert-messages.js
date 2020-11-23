import { ALERT_TYPES } from "../components/AlertBar";
import config from "../utils/config";

/**
 * List of alert messages for the application.
 */
export const ALERTS_MSG = {
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
