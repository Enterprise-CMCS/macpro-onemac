import { getLinksHtml } from "./email-util";

/**
 * SPA submission specific email generation functions.
 * @class
 */
class SPAEmailTemplates {
  /**
   * SPA submission email to CMS details wrapped in generic function name.
   * @param {Object} data from the form submission.
   * @returns {Object} email parameters in generic format.
   */
  getCMSEmail(data) {
    const cmsEmail = {};

    cmsEmail.ToAddresses = [process.env.reviewerEmail];
    cmsEmail.Subject = `New SPA ${data.transmittalNumber} submitted`;
    cmsEmail.HTML = `
      <p>The Submission Portal received a State Plan Amendment:</p>
      <p><b>State or territory</b>: ${data.territory}
      <br><b>Name</b>: ${data.user.firstName} ${data.user.lastName}
      <br><b>Email Address</b>: ${data.user.email}
      <br><b>ID</b>: ${data.transmittalNumber}</p>
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
   * SPA submission confimation email to State User wrapped in
   * generic function name.
   * @param {Object} data from the form submission.
   * @returns {Object} email parameters in generic format.
   */
  getStateEmail(data) {
    const stateEmail = {};

    stateEmail.ToAddresses = [data.user.email];
    stateEmail.Subject =
      "Your SPA " + data.transmittalNumber + " has been submitted to CMS";
    stateEmail.HTML = `
      <p>${data.user.firstName} ${data.user.lastName}</p>
      <p>This is confirmation that you submitted a State Plan Amendment to CMS for review:</p>
      <p><b>State or territory</b>: ${data.territory}
      <br><b>ID</b>: ${data.transmittalNumber}
      <p><b>Summary</b>:
      <br>${data.summary}</p>
      <br>
      <p>This response confirms the receipt of your State Plan Amendment (SPA or your response to a SPA Request for Additional Information (RAI)). 
        You can expect a formal response to your submittal to be issued within 90 days. To calculate the 90th day, please count the date of receipt 
        as day zero. The 90th day will be 90 calendar days from that date.</p>
      <p>This mailbox is for the submittal of State Plan Amendments and non-web-based responses to Requests for Additional Information (RAI) on 
        submitted SPAs only.  Any other correspondence will be disregarded.</p>
      <p>If you have questions or did not expect this email, please contact <a href="mailto:SPA@CMS.HHS.gov">SPA@CMS.HHS.gov</a></p>
      <p>Thank you!</p>
    `;

    return stateEmail;
  }
}

const instance = new SPAEmailTemplates();
Object.freeze(instance);
export default instance;
