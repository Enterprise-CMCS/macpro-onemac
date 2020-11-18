import { ALERT_TYPES } from "../components/AlertBar";

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
  SUBMISSION_INCOMPLETE: {
    type: ALERT_TYPES.ERROR,
    heading: "There was a problem submitting your form.",
    text: "Please review the highlighted items below before resubmitting.",
  },
  LOGIN_ERROR: {
    type: ALERT_TYPES.ERROR,
    heading: "Login Error",
    text: "We were unable to log you in with the credentials you provided.  Please try to login again.",
  },
  NOT_AUTHENTICATED: {
    type: ALERT_TYPES.WARNING,
    heading: "Login Required",
    text: "You need to be signed in to your account to access this page.  Please login and try again.",
  }
};
