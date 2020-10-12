import AWS from "aws-sdk";
import {format, addDays} from "date-fns";

const sender = new AWS.SES({ region: "us-east-1" });

/**
 * Translates the message into the email format used by Amazon SES
 * @param {Object} message the email information
 */
function getSESEmailParams(message) {

  var emailParams = {
    Destination: {
      ToAddresses: [(message.sendTo ? message.sendTo : process.env.reviewerEmail)],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: [message.body],
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: [message.subject],
      },
    },
    Source: process.env.emailSource,
  };

  return emailParams;
}

/**
 * Transforms generic email details into the sending platform structure
 * and "sends" the email.  Uses promises to capture sending details.
 * @param {Object} message the generic email properties
 */
export function sendEmail(message) {
  let emailParams = getSESEmailParams(message);

  // If we are in offline mode just log the email message.
  if(process.env.IS_OFFLINE) {
      console.log("IN OFFLINE MODE: Will not send email.");
      console.log(message);
      console.log("Amazon email parameters:\n");
      console.log(emailParams);
      return Promise.resolve("ok");
    } else {
      return sender.sendEmail(emailParams).promise();
    }
}

/**
 * Send the appropriate emails to the State User based on the data
 * Returns status messages regarding the emails sent
 * @param {Object} data the SPA data
 */
export function sendStateEmail(data) {
  let message;

  switch (data.changeRequestType) {
    case "amendment":
      console.log("sending SPA Email to State");
      message = getStateSPAMessage(data);
      break;
    case "waiver":
      console.log("sending waiver emails");
      message = getStateWaiverMessage(data);
      break;
    default:
      console.log("Change Request type not recognized! " + data.changeRequestType);
      break;
  }

  console.log("Message is: "+message);
  return sendEmail(message);
}

/**
 * Send the appropriate emails to the CMS inbox based on the data
 * Returns status messages regarding the emails sent
 * @param {Object} data the SPA data
 */
export function sendCMSEmail(data) {
  let message;

  switch (data.changeRequestType) {
    case "amendment":
      console.log("sending SPA Email to CMS");
      message = getCMSSPAMessage(data);
      break;
    case "waiver":
      console.log("sending waiver email to CMS");
      message = getCMSWaiverMessage(data);
      break;
    default:
      console.log("Change Request type not recognized! " + data.changeRequestType);
      break;
    }

    console.log("Message is: "+message);
    //return  Promise.resolve("ok");
    return sendEmail(message);
}

/**
 * Generate the SPA Amendment Form Submission message
 * This email goes to the State User and contains CMS-controlled text
 * with metadata from the form submission included.
 * The email is sent to the validated user email from the submission.
 * @param {Object} data the form fields
 * @returns a message object with subject and body
 */
function getStateSPAMessage(data) {
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
function getStateWaiverMessage(data) {
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
  on ${format(get90thDay(data.createdAt), "MM dd, yyyy")}. If you have any questions, please contact spa@cms.hhs.gov or your state lead.</p>
`;

  return message;
}

/**
 * Generate the email message for the submission of the SPA to CMS.
 * @param {Object} data the form fields
 * @returns a message object with subject and body
 */
function getCMSSPAMessage(data) {
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
 * @param {Object} data the database fields
 * @returns a message object with subject and body
 */
function getCMSWaiverMessage(data) {
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
