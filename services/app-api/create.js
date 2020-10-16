import * as uuid from "uuid";
import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
import sendEmail from "./libs/email-lib";
import {format, addDays} from "date-fns";
import getEmailTemplates from './email-templates/getEmailTemplates.js';

export const main = handler(async (event, context) => {
  // If this invokation is a prewarm, do nothing and return.
  if (event.source == "serverless-plugin-warmup") {
    console.log("Warmed up!");
    return null;
  }
  const data = JSON.parse(event.body);
  console.log(JSON.stringify(event, null, 2));
  data.createdDate = Date.now();

  let params = {
    TableName: process.env.tableName,
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      amendmentId: uuid.v1(),
      authProvider: event.requestContext.identity.cognitoAuthenticationProvider,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      territory: data.territory,
      uploads: data.uploads,
      createdAt: data.createdDate,
    },
  };
  let cmsEmailParams = getCMSEmailParams(data);
  let stateEmailParams = JSON.parse(JSON.stringify(cmsEmailParams));

  if (event.path=='/waivers') {
    params.Item.changeRequestType = 'waiver';
    params.Item.transmittalNumber = data.waiverNumber;
    params.Item.waiverNumber = data.waiverNumber;
    params.Item.summary = data.summary;
    params.Item.actionType = data.actionType;
    params.Item.waiverAuthority = data.waiverAuthority;

    let template = getEmailTemplates(data);
    cmsEmailParams.Message.Subject.Data = "New Waiver " + data.waiverNumber + " submitted";
    cmsEmailParams.Message.Body.Html.Data = `
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

    stateEmailParams.Destination.ToAddresses = [data.email];
    stateEmailParams.Message.Subject.Data = "Your Waiver " + data.waiverNumber + " has been submitted to CMS";
    stateEmailParams.Message.Body.Html.Data = `
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

  } else {
    params.Item.changeRequestType = 'amendment';
    params.Item.transmittalNumber = data.transmittalNumber;
    params.Item.urgent = data.urgent;
    params.Item.comments = data.comments;

    let isUrgent = (data.urgent == true ? "Yes" : "No");
    cmsEmailParams.Message.Subject.Data = "New SPA " + data.transmittalNumber + " submitted";
    cmsEmailParams.Message.Body.Html.Data = `
    <p>The SPA Submission Form received a State Plan Amendment:</p>
    <p><b>State or territory</b>: ${data.territory}
    <br><b>Name</b>: ${data.firstName} ${data.lastName}
    <br><b>Email Address</b>: ${data.email}
    <br><b>ID</b>: ${data.transmittalNumber}
    <br><b>Urgent?</b>: ${isUrgent}</p>
    <p>Files:</p>
    <p>${getLinksHtml(data.uploads)}</p>
    <p>If these files seem suspicious, do not open them, and instead forward this email to <a href="mailto:CMS_IT_Service_Desk@cms.hhs.gov">CMS_IT_Service_Desk@cms.hhs.gov</a>.</p>
    <p>Thank you!</p>
    `;

    stateEmailParams.Destination.ToAddresses = [data.email];
    stateEmailParams.Message.Subject.Data = "Your SPA " + data.transmittalNumber + " has been submitted to CMS";
    stateEmailParams.Message.Body.Html.Data = `
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
    <p>If you have questions or did not expect this email, please contact <a href="mailto:example@cms.gov">example@cms.gov</a>
    `;

  }

  await dynamoDb.put(params);
  let emailTemplates = getEmailTemplates(data.type);
  await sendEmail(emailTemplates.getCMSEmailParams());

  //An error sending the State user email is not a failure, but it needs to be recorded.
  try {
    await sendEmail(emailTemplates.getStateEmailParams());
  } catch (error) {
    console.log(
      "Warning: There was an error sending the email to the State User.",
      error
    );
  }

  console.log("Successfully submitted change request:", params);

  return params.Item;
});

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
