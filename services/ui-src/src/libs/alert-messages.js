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

  // Errors
  DASHBOARD_LIST_FETCH_ERROR: {
    type: ALERT_TYPES.ERROR,
    heading: "Unable to Fetch Your Submissions",
    text:
      "There was an error fetching your list of submissions.  Please reload the page and try again.",
  },
  RAI_FETCH_ERROR: {
    type: ALERT_TYPES.ERROR,
    heading: "Data Retrieval Error",
    text:
      "We encountered and error while fetching your data.  Please reload the page and try again.",
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
  }
};
