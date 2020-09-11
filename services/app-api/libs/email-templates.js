import { Storage } from "aws-amplify";

/**
 * Generate the email message for the submission acknowledgement to the user.
 * @param {Object} data the form fields
 * @returns a message object with subject and body
 */
export function getUserAckEmailBody(data) {
    let message = {};
    let isUrgent = data.urgent == 'true' ? "Yes" : "No";
    message.subject = "Your SPA " + data.spaid + " has been submitted to CMS";
    message.body = `
    <p>${data.firstName} ${data.lastName}</p>
    <p>This is confirmation that you submitted a State Plan Amendment to CMS for review:</p>
    <p><b>State or territory</b>: ${data.territory}
    <br><b>ID</b>: ${data.spaid}
    <br><b>Urgent?</b>: ${isUrgent}</p>
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

    return message;
}

/**
 * Generate the email message for the submission of the SPA to CMS.
 * @param {Object} data the form fields
 * @returns a message object with subject and body
 */
export function getSubmissionEmailBody(data) {
    let uploads = [data.attachment];  //Make this an array for now, so we can handle multiple attachments later.
    let message = {};
    let isUrgent = data.urgent == 'true' ? "Yes" : "No";
    message.subject = "New SPA " + data.spaid + " submitted";
    message.body = `
    <p>The SPA Submission Form received a State Plan Amendment:</p>
    <p><b>State or territory</b>: ${data.territory}
    <br><b>Name</b>: ${data.firstName} ${data.lastName}
    <br><b>Email Address</b>: ${data.email}
    <br><b>ID</b>: ${data.spaid}
    <br><b>Urgent?</b>: ${isUrgent}</p>
    <p>Files:</p>
    <p>${getLinksHtml(uploads)}</p>
    <p>If these files seem suspicious, do not open them, and instead forward this email to <a href="mailto:CMS_IT_Service_Desk@cms.hhs.gov">CMS_IT_Service_Desk@cms.hhs.gov</a>.</p>
    <p>Thank you!</p>`;

    return message;
}

/**
 * Get the HTML representing the SPA documents.
 * @param {Object} uploads
 * @returns {String} HTML with the document links.
 */
function getLinksHtml(uploads) {
  let html = "";
  if(Array.isArray(uploads) && uploads.length > 0) {
    html = "<ul>";
    uploads.forEach(async (upload) => {
      //First get the attachment URL
      let url= await Storage.vault.get(upload);
      let filename = url.split('/').pop();
      html += "<li><a href=\"" + url +"\">" + filename + "</a></li>";
    });
    html += "</ul>";
  }
  return html;
}
