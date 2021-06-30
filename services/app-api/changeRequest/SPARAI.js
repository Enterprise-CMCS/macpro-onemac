import { getLinksHtml } from "./changeRequest-util";
import dynamoDb from "../libs/dynamodb-lib";
import { RESPONSE_CODE } from "../libs/response-codes";

/**
 * SPA RAI submission specific email generation functions.
 * @class
 */
class SPARAI {
  /**
   * SPA RAI Submissions require that the Package ID is in the system.
   * @param {Object} data the received data
   * @returns {String} any errors
   */
  async fieldsValid(data) {
    let areFieldsValid = false;
    let whyNot = "";

    const params = {
      TableName: process.env.spaIdTableName,
      // 'Key' defines the partition key and sort key of the item to be retrieved
      // - 'id': change request ID
      Key: {
        id: data.transmittalNumber,
      },
    };
    console.log("the params for checking", params);
    try {
      const result = await dynamoDb.get(params);

      if (result.Item) {
        console.log("the Item exists", result);
        areFieldsValid = true;
      } else {
        console.log("result.Item does not exist");
        areFieldsValid = false;
        whyNot = RESPONSE_CODE.ID_NOT_FOUND;
      }
    } catch (error) {
      console.log("packageExists got an error: ", error);
    }

    return { areFieldsValid, whyNot };
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
        <p>The Submission Portal received a SPA RAI Submission:</p>
        <p>
            <br><b>Name</b>: ${data.user.firstName} ${data.user.lastName}
            <br><b>Email Address</b>: ${data.user.email}
            <br><b>SPA ID</b>: ${data.transmittalNumber}
        </p>
        <p>
            <b>Additional Information</b>:
            <br>${data.summary}
        </p>
        <p>
            <b>Files</b>:
            ${getLinksHtml(data.uploads)}
        </p>
        <br>
        <p>If the contents of this email seem suspicious, do not open them, and instead forward this email to <a href="mailto:SPAM@cms.hhs.gov">SPAM@cms.hhs.gov</a>.</p>
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
    stateEmail.Subject =
      "Your SPA RAI " + data.transmittalNumber + " has been submitted to CMS";
    stateEmail.HTML = `
        <p>This response confirms the receipt of your SPA RAI submission:</p>
        <p>
            <br><b>SPA ID</b>: ${data.transmittalNumber}
            <br><b>Submitter name</b>: ${data.user.firstName} ${data.user.lastName}
            <br><b>Submitter email</b>: ${data.user.email}
        </p>
        <p>
            <b>Additional Information</b>:<br>
            ${data.summary}
        </p>
        <br>
        <p>
            This response confirms the receipt of your State Plan Amendment (SPA or your response to a SPA Request for Additional Information (RAI)). 
            You can expect a formal response to your submittal to be issued within 90 days. To calculate the 90th day, please count the date of receipt 
            as day zero. The 90th day will be 90 calendar days from that date.
        </p>
        <p>
            This mailbox is for the submittal of State Plan Amendments and non-web-based responses to Requests for Additional Information (RAI) on 
            submitted SPAs only.  Any other correspondence will be disregarded.
        </p>
        <p>If you have any questions, please contact <a href="mailto:spa@cms.hhs.gov">spa@cms.hhs.gov</a> or your state lead.</p>
        <p>Thank you!</p>
    `;

    return stateEmail;
  }
}

const instance = new SPARAI();
Object.freeze(instance);
export default instance;
