import { getLinksHtml } from "./email-util";

/**
 * SPA RAI submission specific email generation functions.
 * @class
 */
class SPARAIEmailTemplates {

    /**
    * returns or creates the singleton instance.
    * @constructor
     */
    constructor(){

        if(! SPARAIEmailTemplates.instance){
            SPARAIEmailTemplates.instance = this;
        }

        return SPARAIEmailTemplates.instance;
    }

    /**
     * SPA RAI submission email to CMS details wrapped in generic function name.
     * @param {Object} data from the form submission.
     * @returns {Object} email parameters in generic format.
     */
    getCMSEmail(data) {
        const cmsEmail = {};

        cmsEmail.ToAddresses = [process.env.reviewerEmail];
        cmsEmail.Subject = "New SPA RAI " + data.transmittalNumber + " submitted";
        cmsEmail.HTML = `
    <p>The SPA and Waiver Submission Form received a SPA RAI Submission:</p>
    <br><b>Name</b>: ${data.user.firstName} ${data.user.lastName}
    <br><b>Email Address</b>: ${data.user.email}
    <br><b>ID</b>: ${data.transmittalNumber}
    <br><b>Summary</b>:
    <p>${data.summary}</p>
    <p>Files:</p>
    <p>${getLinksHtml(data.uploads)}</p>
    <p>If these files seem suspicious, do not open them, and instead forward this email to <a href="mailto:CMS_IT_Service_Desk@cms.hhs.gov">CMS_IT_Service_Desk@cms.hhs.gov</a>.</p>
    <p>Thank you!</p>
    `;
        return cmsEmail;
    }

    /**
     * SPA RAI submission confimation email to State User wrapped in
     * generic function name.
     * @param {Object} data from the form submission.
     * @returns {Object} email parameters in generic format.
     */
    getStateEmail(data) {
        const stateEmail = {};

        stateEmail.ToAddresses = [data.user.email];
        stateEmail.Subject = "Your SPA RAI " + data.transmittalNumber + " has been submitted to CMS";
        stateEmail.HTML = `
    <p>This response confirms the receipt of your SPA RAI submission:</p>
    <br><b>SPA #</b>: ${data.transmittalNumber}
    <br><b>Submitter name</b>: ${data.user.firstName} ${data.user.lastName}
    <br><b>Submitter email</b>: ${data.user.email}</p>
    <br><b>Summary</b>:
    <p>${data.summary}</p>
    <p>If you have any questions, please contact spa@cms.hhs.gov or your state lead.</p>
    `;
        return stateEmail;
    }

}

const instance = new SPARAIEmailTemplates();
Object.freeze(instance);
export default instance;