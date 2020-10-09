import sendEmail from "./email-lib";
import {format, addDays} from "date-fns";

/**
 * Send the appropriate emails based on the data
 * Returns status messages regarding the emails sent
 * @param {Object} data the SPA data
 */
export function sendAnyEmails(data) {

  switch (data.amendmentType) {
    case "amendment":
      sendEmail(getStateSPAEmail(data));
      sendEmail(getCMSSPAEmail(data));
      break;
    case "waiver":
      sendEmail(getStateWaiverEmail(data));
      sendEmail(getCMSWaiverEmail(data));
      break;
    default:
      break;
  }

  return "emails sent";
}

/**
 * Generate the SPA Amendment Form Submission email parameters
 * This email goes to the State User and contains CMS-controlled text
 * with metadata from the form submission included.
 * The email is sent to the validated user email from the submission.
 * @param {Object} data the form fields
 * @returns a message object with subject and body
 */
function getStateSPAEmail(data) {
    let message = {};
    let isUrgent = data.urgent == 'true' ? "Yes" : "No";
    message.sendTo = data.email;
    message.subject = "Your SPA " + data.transmittalNumber + " has been submitted to CMS";
    message.body = `
    <p>${data.firstName} ${data.lastName}</p>
    <p>This is confirmation that you submitted a State Plan Amendment to CMS for review:</p>
    <p><b>State or territory</b>: ${data.territory}
    <br><b>ID</b>: ${data.transmittalNumber}
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
 * Generate the Waiver Form Submission email parameters
 * This email goes to the State User and contains CMS-controlled text
 * with metadata from the form submission included.
 * The email is sent to the validated user email from the submission.
 * @param {Object} data the form fields
 * @returns a message object with subject and body
 */
function getStateWaiverEmail(data) {
  let message = {};
  message.sendTo = data.email;
  message.subject = "Your Waiver " + data.waiverNumber + " has been submitted to CMS";
  message.body = `
  <p>This response confirms the receipt of your 1915(b) waiver/1915(c) Appendix K Amendment:</p>
  <p><b>State or territory</b>: ${data.territory}
  <br><b>Waiver #</b>: ${data.waiverNumber}
  <br><b>Submitter name</b>: ${data.firstName} ${data.lastName}
  <br><b>Submitter email</b>: ${data.email}</p>
  <p>Files:</p>
  <p>${getLinksHtml(data.uploads)}</p>
  <p>You can expect a formal response to your submission to be issued within 90 days, 
  on ${format(get90thDay(data.createdDate), "MM dd, YYYY")}. If you have any questions, please contact spa@cms.hhs.gov or your state lead.</p>
`;

  return message;
}

/**
 * Generate the email message for the submission of the SPA to CMS.
 * @param {Object} data the form fields
 * @returns a message object with subject and body
 */
function getCMSSPAEmail(data) {
    let message = {};
    let isUrgent = data.urgent == 'true' ? "Yes" : "No";
    message.subject = "New SPA " + data.transmittalNumber + " submitted";
    message.body = `
    <p>The SPA Submission Form received a State Plan Amendment:</p>
    <p><b>State or territory</b>: ${data.territory}
    <br><b>Name</b>: ${data.firstName} ${data.lastName}
    <br><b>Email Address</b>: ${data.email}
    <br><b>ID</b>: ${data.transmittalNumber}
    <br><b>Urgent?</b>: ${isUrgent}</p>
    <p>Files:</p>
    <p>${getLinksHtml(data.uploads)}</p>
    <p>If these files seem suspicious, do not open them, and instead forward this email to <a href="mailto:CMS_IT_Service_Desk@cms.hhs.gov">CMS_IT_Service_Desk@cms.hhs.gov</a>.</p>
    <p>Thank you!</p>`;

    return message;
}

/**
 * Generate the email message for the submission of the Waiver to CMS.
 * @param {Object} data the form fields
 * @returns a message object with subject and body
 */
function getCMSWaiverEmail(data) {
  let message = {};
  message.subject = "New Waiver " + data.waiverNumber + " submitted";
  message.body = `
  <p>The SPA and Waiver Submission Form received a Waiver Submission:</p>
  <p><b>State or territory</b>: ${data.territory}
  <br><b>Name</b>: ${data.firstName} ${data.lastName}
  <br><b>Email Address</b>: ${data.email}
  <br><b>ID</b>: ${data.transmittalNumber}
  <p>Files:</p>
  <p>${getLinksHtml(data.uploads)}</p>
  <p>If these files seem suspicious, do not open them, and instead forward this email to <a href="mailto:CMS_IT_Service_Desk@cms.hhs.gov">CMS_IT_Service_Desk@cms.hhs.gov</a>.</p>
  <p>Thank you!</p>`;

  return message;
}

/**
 * Get HTML containing links representing the attached documents.
 * @param {Object} uploads
 * @returns {String} HTML with the document links.
 */
function getLinksHtml(uploads) {
  let html = "";
  if(Array.isArray(uploads) && uploads.length > 0) {
    html = "<ul>";
    uploads.forEach(async (upload) => {
      html += "<li>" + upload.title + ": <a href=\"" + upload.url +"\">" + upload.filename + "</a></li>";
    });
    html += "</ul>";
  }
  return html;
}

/**
 * Get the 90th day from the created Date (with created Date as day 0)
 * @param {Object} startDate
 * @returns {Date} CMS approved 90th day.
 */
function get90thDay(startDate) {
  var realNumberOfDays = 91;

  return addDays(startDate, realNumberOfDays);
}