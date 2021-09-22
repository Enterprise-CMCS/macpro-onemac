import { getCMSDateFormat, getLinksHtml } from "./changeRequest-util";
import packageExists from "../utils/packageExists";
import { RESPONSE_CODE, cmsEmailMapToFormWarningMessages } from "cmscommonlib";

/**
 * Waiver submission specific email generation functions.
 * @class
 */
class Waiver {
  /**
   * Waiver Submissions require that the Package ID is not currently being used.
   * @param {Object} data the received data
   * @returns {String} any errors
   */
  async fieldsValid(data) {
    let areFieldsValid = true;
    let whyNot = "";
    let doesExist = false;
    try {
      doesExist = await packageExists(data.transmittalNumber);
    } catch (error) {
      console.log("Waiver packageExists call error: ", error);
      throw error;
    }
    if (doesExist) {
      console.log("the Item exists");
    } else {
      console.log("result.Item does not exist");
    }
    // NEW action type should have NEW IDs
    if (data.actionType === "new" && doesExist) {
      areFieldsValid = false;
      whyNot = RESPONSE_CODE.DUPLICATE_ID;
    }

    return { areFieldsValid, whyNot };
  }

  /**
   * Waiver submission email to CMS details wrapped in generic function name.
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

    cmsEmail.ToAddresses = [process.env.reviewerEmail];
    cmsEmail.Subject = "New Waiver " + data.transmittalNumber + " submitted";
    cmsEmail.HTML = `
        <p>The Submission Portal received a Waiver Submission:</p>
        <p>
            <br><b>State or territory</b>: ${data.territory}
            <br><b>Name</b>: ${data.user.firstName} ${data.user.lastName}
            <br><b>Email Address</b>: ${data.user.email}
            <br><b>Waiver #</b>: ${
              data.transmittalNumber
            }${transmittalNumberWarningMessage} 
            <br><b>Action Type</b>: ${data.actionType}
            <br><b>Waiver Authority</b>: ${data.waiverAuthority}
        </p>
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
   * Waiver submission confimation email to State Submitter wrapped in
   * generic function name.
   * @param {Object} data from the form submission.
   * @returns {Object} email parameters in generic format.
   */
  getStateEmail(data) {
    const stateEmail = {};

    stateEmail.ToAddresses = [data.user.email];
    stateEmail.Subject =
      "Your Waiver " + data.transmittalNumber + " has been submitted to CMS";
    stateEmail.HTML = `
        <p>This response confirms the receipt of your 1915(b) waiver/1915(c) Appendix K Amendment:</p>
        <p>
            <br><b>State or territory</b>: ${data.territory}
            <br><b>Waiver #</b>: ${data.transmittalNumber} 
            <b>Submitter name</b>: ${data.user.firstName} ${data.user.lastName}
            <br><b>Submitter email</b>: ${data.user.email}
            <br><b>90th day deadline</b>: ${getCMSDateFormat(
              data.ninetyDayClockEnd
            )}
        </p>
        <p>
            <b>Additional Information</b>:<br>
            ${data.summary}
        </p>
        <br>
        <p>
            This response confirms the receipt of your Waiver request or your response to a Waiver Request for Additional Information (RAI)). 
            You can expect a formal response to your submittal to be issued within 90 days, before ${getCMSDateFormat(
              data.ninetyDayClockEnd
            )}.
        </p>
        <p>
            This mailbox is for the submittal of Section 1915(b) and 1915(c) non-web-based Waivers, responses to Requests for Additional 
            Information (RAI) on Waivers, and extension requests on Waivers only.  Any other correspondence will be disregarded. 
        </p>
        <p>If you have any questions, please contact <a href="mailto:spa@cms.hhs.gov">spa@cms.hhs.gov</a> or your state lead.</p>
        <p>Thank you!</p>
    `;

    return stateEmail;
  }
}

const instance = new Waiver();
Object.freeze(instance);
export default instance;
