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
        cmsEmail.Subject = "New Waiver RAI " + data.transmittalNumber + " submitted";
        cmsEmail.HTML = `
    <p>The SPA and Waiver Submission Form received a Waiver RAI Submission:</p>
    <br><b>Name</b>: ${data.user.firstName} ${data.user.lastName}
    <br><b>Email Address</b>: ${data.user.email}
    <br><b>ID</b>: ${data.transmittalNumber}
    <p><b>Summary</b>:
    <br>${data.summary}</p>
    <p>Files:</p>
    <p>${getLinksHtml(data.uploads)}</p>
    <p>If these files seem suspicious, do not open them, and instead forward this email to <a href="mailto:CMS_IT_Service_Desk@cms.hhs.gov">CMS_IT_Service_Desk@cms.hhs.gov</a>.</p>
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
        stateEmail.Subject = "Your Waiver RAI " + data.transmittalNumber + " has been submitted to CMS";
        stateEmail.HTML = `
    <p>This response confirms the receipt of your Waiver RAI submission:</p>
    <br><b>Waiver #</b>: ${data.transmittalNumber}
    <br><b>Submitter name</b>: ${data.user.firstName} ${data.user.lastName}
    <br><b>Submitter email</b>: ${data.user.email}</p>
    <p><b>Summary</b>:
    <br>${data.summary}</p>
    <p>If you have any questions, please contact spa@cms.hhs.gov or your state lead.</p>
    `;
        return stateEmail;
    }

}

const instance = new WaiverRAIEmailTemplates();
Object.freeze(instance);
export default instance;