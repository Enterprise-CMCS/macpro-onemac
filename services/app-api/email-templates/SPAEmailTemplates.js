import { getLinksHtml } from "./email-util";

class SPAEmailTemplates {

    constructor(){
        if(! SPAEmailTemplates.instance){
            SPAEmailTemplates.instance = this;
        }

        return SPAEmailTemplates.instance;
    }

    getUrgentText(data) {
        return (data.urgent == true ? "Yes" : "No");
    }

    getCMSEmail(data) {
        const cmsEmail = {};

        cmsEmail.ToAddresses = [process.env.reviewerEmail];
        cmsEmail.Subject = `New SPA ${data.transmittalNumber} submitted`;
        cmsEmail.HTML = `
        <p>The SPA Submission Form received a State Plan Amendment:</p>
        <p><b>State or territory</b>: ${data.territory}
        <br><b>Name</b>: ${data.user.firstName} ${data.user.lastName}
        <br><b>Email Address</b>: ${data.user.email}
        <br><b>ID</b>: ${data.transmittalNumber}
        <br><b>Urgent?</b>: ${this.getUrgentText(data)}</p>
        <p>Files:</p>
        <p>${getLinksHtml(data.uploads)}</p>
        <p>If these files seem suspicious, do not open them, and instead forward this email to <a href="mailto:CMS_IT_Service_Desk@cms.hhs.gov">CMS_IT_Service_Desk@cms.hhs.gov</a>.</p>
        <p>Thank you!</p>
        `;

        return cmsEmail;
    }

    getStateEmail(data) {
        const stateEmail = {};

        stateEmail.ToAddresses = [data.user.email];
        stateEmail.Subject = "Your SPA " + data.transmittalNumber + " has been submitted to CMS";
        stateEmail.HTML = `
        <p>${data.user.firstName} ${data.user.lastName}</p>
        <p>This is confirmation that you submitted a State Plan Amendment to CMS for review:</p>
        <p><b>State or territory</b>: ${data.territory}
        <br><b>ID</b>: ${data.transmittalNumber}
        <br><b>Urgent?</b>: ${this.getUrgentText(data)}</p>
        <p><strong>THIS MAILBOX IS FOR THE SUBMITTAL OF STATE PLAN AMENDMENTS AND SECTION 1915(b) 
          AND 1915(c) NON-WEB BASED WAIVERS AND RESPONSES TO REQUESTS FOR ADDITIONAL INFORMATION ON 
          SUBMITTED SPAs/WAIVERS ONLY. ANY OTHER CORRESPONDENCE WILL BE DISREGARDED.</strong></p>
        <p><strong>This response confirms the receipt of your State Plan Amendment (SPA/Waiver 
          request or your response to a SPA/Waiver Request for additional information (RAI)). You 
          can expect a formal response to your submittal to be issued within 90 days. To calculate 
          the 90th day, please count the date of receipt as Day Zero. The 90th day will be 90 
          calendar days from that date.</strong></p>
        <p>Thank you!</p>
        <p>If you have questions or did not expect this email, please contact <a href="mailto:example@cms.gov">example@cms.gov</a>`;

        return stateEmail;
    }

}

const instance = new SPAEmailTemplates();
Object.freeze(instance);
export default instance;