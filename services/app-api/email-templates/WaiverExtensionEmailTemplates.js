import { getLinksHtml } from "./email-util";

/**
 * Waiver Extension submission specific email generation functions.
 * @class
 */
class WaiverExtensionEmailTemplates {
  /**
   * Waiver Extension submission email to CMS details wrapped in generic function name.
   * @param {Object} data from the form submission.
   * @returns {Object} email parameters in generic format.
   */
  getCMSEmail(data) {
    const cmsEmail = {};

    cmsEmail.ToAddresses = [process.env.reviewerEmail];
    cmsEmail.Subject =
      "New Waiver Extension for " + data.transmittalNumber + " submitted";
    cmsEmail.HTML = `
        <p>The Submission Portal received a Request for Waiver Extension Submission:</p>
        <p>
            <br><b>Name</b>: ${data.user.firstName} ${data.user.lastName}
            <br><b>Email Address</b>: ${data.user.email}
            <br><b>Waiver #</b>: ${data.transmittalNumber}
        </p>
        <p>
            <b>Summary</b>:
            <br>${data.summary}
        </p>
        <p>
            <b>Files</b>:
            ${getLinksHtml(data.uploads)}
        </p>
        <p><br>If the contents of this email seem seem suspicious, do not open them, and instead forward this email to <a href="mailto:SPAM@CMS.HHS.gov">SPAM@CMS.HHS.gov</a>.</p>
        <p>Thank you!</p>
    `;

    return cmsEmail;
  }

  /**
   * Waiver Extension submission confimation email to State User wrapped in
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
            <br><b>Waiver #</b>: ${data.transmittalNumber}
            <br><b>Submitter name</b>: ${data.user.firstName} ${data.user.lastName}
            <br><b>Submitter email</b>: ${data.user.email}
        </p>
        <p>
            <b>Summary</b>:
            <br>${data.summary}
        </p>
        <p><br>If you have any questions, please contact <a href="mailto:SPA@CMS.HHS.gov">SPA@CMS.HHS.gov</a> or your state lead.</p>
        <p>Thank you!</p>
    `;

    return stateEmail;
  }
}

const instance = new WaiverExtensionEmailTemplates();
Object.freeze(instance);
export default instance;
