import { getAccessInstructions, getLinksHtml } from "./changeRequest-util";
import packageExists from "../utils/packageExists";
import { RESPONSE_CODE, cmsEmailMapToFormWarningMessages } from "cmscommonlib";

/**
 * CHIP SPA submission specific functions.
 * @class
 */
class CHIPSPA {
  /**
   * SPA Submissions require that the Package ID is not currently being used.
   * @param {Object} data the received data
   * @returns {String} any errors
   */
  async fieldsValid(data) {
    let areFieldsValid = false;
    let whyNot = "";
    let doesExist = false;

    try {
      doesExist = await packageExists(data.transmittalNumber);
    } catch (error) {
      console.log("CHIP SPA packageExists got an error: ", error);
      throw error;
    }

    if (doesExist) {
      console.log("the Item exists");
      areFieldsValid = false;
      whyNot = RESPONSE_CODE.DUPLICATE_ID;
    } else {
      console.log("result.Item does not exist");
      areFieldsValid = true;
    }

    return { areFieldsValid, whyNot };
  }

  /**
   * CHIP SPA submission email to CMS details wrapped in generic function name.
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
      process.env.reviewerCHIPEmail,
      process.env.testingEmail,
    ].filter(Boolean);
    cmsEmail.CcAddresses = process.env.chipCcEmail
      ?.split(";")
      ?.filter((s) => s.trim());
    cmsEmail.Subject = `New CHIP SPA ${data.transmittalNumber} submitted`;
    cmsEmail.HTML = `
      <p>The Submission Portal received a CHIP State Plan Amendment:</p>
      ${getAccessInstructions()}
      <p>
        <br><b>State or territory</b>: ${data.territory}
        <br><b>Name</b>: ${data.user.firstName} ${data.user.lastName}
        <br><b>Email Address</b>: ${data.user.email}
        <br><b>SPA ID</b>: ${
          data.transmittalNumber
        }${transmittalNumberWarningMessage}
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
   * CHIP SPA submission confimation email to State Submitter wrapped in
   * generic function name.
   * @param {Object} data from the form submission.
   * @returns {Object} email parameters in generic format.
   */
  getStateEmail(data) {
    const stateEmail = {};

    stateEmail.ToAddresses = [data.user.email];
    stateEmail.Subject =
      "Your CHIP SPA " + data.transmittalNumber + " has been submitted to CMS";
    stateEmail.HTML = `
      <p>This is confirmation that you submitted a CHIP State Plan Amendment to CMS for review:</p>
      <p>
        <br><b>State or territory</b>: ${data.territory}
        <br><b>SPA ID</b>: ${data.transmittalNumber}
        <br><b>Submitter name</b>: ${data.user.firstName} ${data.user.lastName}
        <br><b>Submitter email</b>: ${data.user.email}
      </p>
      <p>
        <b>Additional Information</b>:<br>
        ${data.summary}
      </p>
      <br>
      <p>
        This response confirms the receipt of your CHIP State Plan Amendment (CHIP SPA or your response to a SPA Request for Additional Information (RAI)).
        You can expect a formal response to your submittal from CMS at a later date.
      </p>
      <p>If you have questions or did not expect this email, please contact <a href="mailto:CHIPSPASubmissionMailBox@CMS.HHS.gov">CHIPSPASubmissionMailBox@CMS.HHS.gov</a></p>
      <p>Thank you!</p>
    `;

    return stateEmail;
  }
}

const instance = new CHIPSPA();
Object.freeze(instance);
export default instance;
