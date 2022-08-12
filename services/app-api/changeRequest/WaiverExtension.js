import { getAccessInstructions, getLinksHtml } from "./changeRequest-util";
import { cmsEmailMapToFormWarningMessages } from "cmscommonlib";

/**
 * Waiver Extension submission specific email generation functions.
 * @class
 */
class WaiverExtension {
  /**
   * Waiver Extension Submissions require that the Package ID is in the system.
   * @param {Object} data the received data
   * @returns {String} any errors
   */
  async fieldsValid() {
    return { areFieldsValid: true, whyNot: "" };
  }

  /**
   * Waiver Extension submission email to CMS details wrapped in generic function name.
   * @param {Object} data from the form submission.
   * @returns {Object} email parameters in generic format.
   */
  getCMSEmail(data) {
    let transmittalNumberWarningMessage;
    const cmsEmail = {};

    if (data.transmittalNumberWarningMessage) {
      transmittalNumberWarningMessage =
        cmsEmailMapToFormWarningMessages[data.transmittalNumberWarningMessage];
    } else {
      transmittalNumberWarningMessage = "";
    }

    cmsEmail.ToAddresses = [
      process.env.reviewerEmail,
      process.env.testingEmail,
    ].filter(Boolean);
    cmsEmail.Subject =
      "New Waiver Extension " + data.transmittalNumber + " submitted";
    cmsEmail.HTML = `
        <p>The Submission Portal received a Request for Waiver Extension Submission:</p>
        ${getAccessInstructions()}
        <p>
            <br><b>Name</b>: ${data.user.firstName} ${data.user.lastName}
            <br><b>Email Address</b>: ${data.user.email}
            <br><b>Approved Initial or Renewal Waiver Number</b>: ${
              data.parentNumber
            }
            <br><b>Temporary Extension Request Number</b>: ${
              data.transmittalNumber
            }${transmittalNumberWarningMessage}
        </p>
        <p><b>Please review the waiver number for correctness as OneMAC did not validate the waiver number entered by the state.</b></p>
        <p>
            <b>Additional Information</b>:
            <br>${data.summary}
        </p>
        <p>
            <b>Files</b>:
            ${getLinksHtml(data.uploads)}
        </p>
        <br>
        <p>If the contents of this email seem suspicious, do not open them, and instead forward this email to <a href="mailto:SPAM@cms.hhs.gov">SPAM@cms.hhs.gov</a>.</p>
        <p>Thank you!</p>
    `;

    return cmsEmail;
  }

  /**
   * Waiver Extension submission confimation email to State Submitter wrapped in
   * generic function name.
   * @param {Object} data from the form submission.
   * @returns {Object} email parameters in generic format.
   */
  getStateEmail(data) {
    const stateEmail = {};

    stateEmail.ToAddresses = [data.user.email];
    stateEmail.Subject =
      "Your Request for Waiver Extension " +
      data.transmittalNumber +
      " has been submitted to CMS";
    stateEmail.HTML = `
        <p>This response confirms the receipt of your Waiver Extension submission:</p>
        <p>
        <br><b>Approved Initial or Renewal Waiver Number</b>: ${data.parentNumber}
        <br><b>Temporary Extension Request Number</b>: ${data.transmittalNumber}
        <br><b>Submitter name</b>: ${data.user.firstName} ${data.user.lastName}
            <br><b>Submitter email</b>: ${data.user.email}
        </p>
        <p>
            <b>Additional Information</b>:<br>
            ${data.summary}
        </p>
        <br>
        <p>
            This mailbox is for the submittal of Section 1915(b) and 1915(c) non-web-based Waivers,
            responses to Requests for Additional Information (RAI), and extension requests on Waivers only.
            Any other correspondence will be disregarded.
        </p>
        <p>If you have any questions, please contact <a href="mailto:spa@cms.hhs.gov">spa@cms.hhs.gov</a> or your state lead.</p>
        <p>Thank you!</p>
    `;

    return stateEmail;
  }
}

const instance = new WaiverExtension();
Object.freeze(instance);
export default instance;
