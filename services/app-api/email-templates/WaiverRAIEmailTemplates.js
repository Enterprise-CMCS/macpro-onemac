import { getLinksHtml } from "./email-util";

/**
 * Waiver RAI submission specific email generation functions.
 * @class
 */
class WaiverRAIEmailTemplates {
  /**
   * Waiver RAI submission email to CMS details wrapped in generic function name.
   * @param {Object} data from the form submission.
   * @returns {Object} email parameters in generic format.
   */
  getCMSEmail(data) {
    const cmsEmail = {};

    cmsEmail.ToAddresses = [process.env.reviewerEmail];
    cmsEmail.Subject =
      "New Waiver RAI " + data.transmittalNumber + " submitted";
    cmsEmail.HTML = `
            <p>The Submission Portal received a Waiver RAI Submission:</p>
            <br><b>Name</b>: ${data.user.firstName} ${data.user.lastName}
            <br><b>Email Address</b>: ${data.user.email}
            <br><b>ID</b>: ${data.transmittalNumber}
            <p><b>Summary</b>:
            <br>${data.summary}</p>
            <p><b>Files:</b>
            <br>${getLinksHtml(data.uploads)}</p>
            <br>
            <p>If the contents of this email seem seem suspicious, do not open them, and instead forward this email to <a href="mailto:SPAM@CMS.HHS.gov">SPAM@CMS.HHS.gov</a>.</p>
            <p>Thank you!</p>
        `;
    return cmsEmail;
  }

  /**
   * Waiver RAI submission confimation email to State User wrapped in
   * generic function name.
   * @param {Object} data from the form submission.
   * @returns {Object} email parameters in generic format.
   */
  getStateEmail(data) {
    const stateEmail = {};

    stateEmail.ToAddresses = [data.user.email];
    stateEmail.Subject =
      "Your Waiver RAI " +
      data.transmittalNumber +
      " has been submitted to CMS";
    stateEmail.HTML = `
            <p>This response confirms the receipt of your Waiver RAI submission:</p>
            <br><b>Waiver #</b>: ${data.transmittalNumber}
            <br><b>Submitter name</b>: ${data.user.firstName} ${data.user.lastName}
            <br><b>Submitter email</b>: ${data.user.email}</p>
            <p><b>Summary</b>:
            <br>${data.summary}</p>
            <br>
            <p>This response confirms the receipt of your Waiver request or your response to a Waiver Request for Additional Information (RAI)). 
                You can expect a formal response to your submittal to be issued within 90 days. To calculate the 90th day, please count the date of receipt 
                as day zero. The 90th day will be 90 calendar days from that date.</p>
            <p>This mailbox is for the submittal of Section 1915(b) and 1915(c) non-web-based Waivers and responses to Requests for Additional 
                Information (RAI) on Waivers only.  Any other correspondence will be disregarded.</p>
            <p>If you have any questions, please contact <a href="mailto:SPA@CMS.HHS.gov">SPA@CMS.HHS.gov</a> or your state lead.</p>
            <p>Thank you!</p>
        `;
    return stateEmail;
  }
}

const instance = new WaiverRAIEmailTemplates();
Object.freeze(instance);
export default instance;
