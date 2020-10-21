import { getLinksHtml, get90thDay } from "./email-util";

/**
 * Waiver submission specific email generation functions.
 * @class
 */
class WaiverEmailTemplates {

    /**
    * returns or creates the singleton instance.
    * @constructor
     */
    constructor(){

        if(! WaiverEmailTemplates.instance){
            WaiverEmailTemplates.instance = this;
        }

        return WaiverEmailTemplates.instance;
    }

    /**
     * Waiver submission email to CMS details wrapped in generic function name.
     * @param {Object} data from the form submission.
     * @returns {Object} email parameters in generic format.
     */
    getCMSEmail(data) {
        const cmsEmail={};

        cmsEmail.ToAddresses = [process.env.reviewerEmail];
        cmsEmail.Subject = "New Waiver " + data.waiverNumber + " submitted";
        cmsEmail.HTML = `
    <p>The SPA and Waiver Submission Form received a Waiver Submission:</p>
    <p><b>State or territory</b>: ${data.territory}
    <br><b>Name</b>: ${data.user.firstName} ${data.user.lastName}
    <br><b>Email Address</b>: ${data.user.email}
    <br><b>ID</b>: ${data.transmittalNumber}
    <p>Files:</p>
    <p>${getLinksHtml(data.uploads)}</p>
    <p>If these files seem suspicious, do not open them, and instead forward this email to <a href="mailto:CMS_IT_Service_Desk@cms.hhs.gov">CMS_IT_Service_Desk@cms.hhs.gov</a>.</p>
    <p>Thank you!</p>
    `;
        return cmsEmail;
    }

    /**
     * Waiver submission confimation email to State User wrapped in
     * generic function name.
     * @param {Object} data from the form submission.
     * @returns {Object} email parameters in generic format.
     */
    getStateEmail(data) {
        const stateEmail={};

        stateEmail.ToAddresses = [data.user.email];
        stateEmail.Subject = "Your Waiver " + data.waiverNumber + " has been submitted to CMS";
        stateEmail.HTML = `
    <p>This response confirms the receipt of your 1915(b) waiver/1915(c) Appendix K Amendment:</p>
    <p><b>State or territory</b>: ${data.territory}
    <br><b>Waiver #</b>: ${data.waiverNumber}
    <br><b>Submitter name</b>: ${data.user.firstName} ${data.user.lastName}
    <br><b>Submitter email</b>: ${data.user.email}</p>
    <p>Files:</p>
    <p>${getLinksHtml(data.uploads)}</p>
    <p>You can expect a formal response to your submission to be issued within 90 days, 
    on ${get90thDay(data.createdDate)}. If you have any questions, please contact spa@cms.hhs.gov or your state lead.</p>
    `;
        return stateEmail;
    }

}

const instance = new WaiverEmailTemplates();
Object.freeze(instance);
export default instance;