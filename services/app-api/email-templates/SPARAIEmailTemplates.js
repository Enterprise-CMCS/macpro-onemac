class SPARAIEmailTemplates {
    
    getCMSMessage(data) {
        let cmsMessage;

        cmsMessage.ToAddresses = [process.env.reviewerEmail];
        cmsMessage.Subject = "New SPA RAI " + data.transmittalNumber + " submitted";
        cmsMessage.HTML = `
    <p>The SPA and Waiver Submission Form received a Waiver Submission:</p>
    <p><b>State or territory</b>: ${data.territory}
    <br><b>Name</b>: ${data.firstName} ${data.lastName}
    <br><b>Email Address</b>: ${data.email}
    <br><b>ID</b>: ${data.transmittalNumber}
    <p>Files:</p>
    <p>${getLinksHtml(data.uploads)}</p>
    <p>If these files seem suspicious, do not open them, and instead forward this email to <a href="mailto:CMS_IT_Service_Desk@cms.hhs.gov">CMS_IT_Service_Desk@cms.hhs.gov</a>.</p>
    <p>Thank you!</p>
    `;
        return cmsMessage;
    }

    getStateMessage(data) {
        let stateMessage;

        stateMessage.ToAddresses = [data.email];
        stateMessage.Subject = "Your Waiver " + data.waiverNumber + " has been submitted to CMS";
        stateMessage.HTML = `
    <p>This response confirms the receipt of your 1915(b) waiver/1915(c) Appendix K Amendment:</p>
    <p><b>State or territory</b>: ${data.territory}
    <br><b>Waiver #</b>: ${data.waiverNumber}
    <br><b>Submitter name</b>: ${data.firstName} ${data.lastName}
    <br><b>Submitter email</b>: ${data.email}</p>
    <p>Files:</p>
    <p>${getLinksHtml(data.uploads)}</p>
    <p>You can expect a formal response to your submission to be issued within 90 days, 
    on ${format(get90thDay(data.createdDate), "MM dd, yyyy")}. If you have any questions, please contact spa@cms.hhs.gov or your state lead.</p>
    `;
    }

}

const instance = new SPARAIEmailTemplates();
Object.freeze(instance);
export default instance;