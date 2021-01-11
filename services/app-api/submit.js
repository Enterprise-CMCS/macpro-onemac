import * as uuid from "uuid";
import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
import sendEmail from "./libs/email-lib";
import getChangeRequestFunctions, { isValidStateCode } from "./changeRequest/changeRequest-util";
import { ERROR_MSG } from "../libs/error-messages";
import { DateTime } from "luxon";

/**
 * Submission states for the change requests.
 */
const SUBMISSION_STATES = {
  CREATED: "created", // Change request is in process
  SUBMITTED: "submitted", // Email sent to CMS
};

/**
 * Submit a new record for storage.
 */
export const main = handler(async (event) => {
  let errorMessage = '';

  // If this invocation is a prewarm, do nothing and return.
  if (event.source == "serverless-plugin-warmup") {
    console.log("Warmed up!");
    return null;
  }
  const data = JSON.parse(event.body);

  // do a pre-check for things that should stop us immediately
  errorMessage = runInitialCheck(data);
  if (errorMessage) {
    return buildAppropriateResponse({
      type: "logicError",
      from: "runInitialCheck",
      message: errorMessage
    });
  }

  // map the changeRequest functions from the data.type
  const crFunctions = getChangeRequestFunctions(data.type);
  if (!crFunctions) {
    return buildAppropriateResponse({
      type: "logicError",
      from: "getChangeRequestFunctions",
      message: "crFunctions object not created."
    });
  }

  const crVerifyStateCode = isValidStateCode(data.transmittalNumber);
  if (!crVerifyStateCode) {
    return buildAppropriateResponse({
      type: "logicError",
      from: "isValidStateCode",
      message: ERROR_MSG.TRANSMITTAL_ID_TERRITORY_NOT_VALID
    });
  }

  // Add required data to the record before storing.
  data.id = uuid.v1();
  data.createdAt = Date.now();
  data.state = SUBMISSION_STATES.CREATED;

  //Normalize the user data.
  data.user = {
    id: event.requestContext.identity.cognitoIdentityId,
    authProvider: event.requestContext.identity.cognitoAuthenticationProvider,
    email: data.user.signInUserSession.idToken.payload.email,
    firstName: data.user.signInUserSession.idToken.payload.given_name,
    lastName: data.user.signInUserSession.idToken.payload.family_name,
  };
  data.userId = event.requestContext.identity.cognitoIdentityId;

  try {
    // check for submission-specific validation (uses database)
    const validationResponse = await crFunctions.fieldsValid(data);
    console.log("validation Response: ",validationResponse);

    if (validationResponse.areFieldsValid===false) {
      console.log("Message from fieldsValid: ",validationResponse);
      return buildAppropriateResponse({
        type: "logicError",
        from: "fieldsValid",
        message: validationResponse.whyNot,
      });
    }

    await dynamoDb.put({
      TableName: process.env.tableName,
      Item: data,
    });

    // create the (package) ID data
    const packageParams = {
      TableName: process.env.spaIdTableName,
      Item: {
        "id": data.transmittalNumber,
        [data.id]: data.userId,
      }
    };
    await dynamoDb.put(packageParams);

  } catch (dbError) {
    console.log("This error is: " + dbError);
    throw dbError;
  }
  console.log(`Current epoch time:  ${Math.floor(new Date().getTime())}`);

  // Now send the CMS email
  await sendEmail(crFunctions.getCMSEmail(data));

  //We successfully sent the submission email.  Update the record to reflect that.
  data.state = SUBMISSION_STATES.SUBMITTED;
  data.submittedAt = Date.now();

  // record the current end timestamp (can be start/stopped/changed)
  // 90 days is current CMS review period and it is based on CMS time!!
  // UTC is 4-5 hours ahead, convert first to get the correct start day
  // AND use plus days function b/c DST days are 23 or 25 hours!!
  data.ninetyDayClockEnd = DateTime.fromMillis(data.submittedAt).setZone('America/New_York').plus({ days: 90 }).toMillis();
  await dynamoDb.put({
    TableName: process.env.tableName,
    Item: data,
  });

  //An error sending the user email is not a failure.
  try {
    // send the submission "reciept" to the State User
    await sendEmail(crFunctions.getStateEmail(data));
  } catch (error) {
    console.log(
      "Warning: There was an error sending the user acknowledgement email.",
      error
    );
  }

  console.log("Successfully submitted amendment:", data);

  return buildAppropriateResponse({
    type: "success",
    from: "submit",
    message: "Submission successfull!"
  });
});

/**
 * Validation check for items that should be checked before anything else is done
 * @param {Object} data the received data
 * @returns {String} any error messages triggered
 */
function runInitialCheck(data) {
  let errorMessages = "";

  if (!data.user) errorMessages += "ERROR: Missing user info data. ";
  if (!data.uploads) errorMessages += "ERROR: Missing attachments. ";
  if (!data.type) errorMessages += "ERROR: Missing record type. ";
  return errorMessages;
}

/**
 * We consolidate the response building into a function so that we can change
 * verbosity based on requestor... devs get debug info, users get helpful info,
 * and hackers get no response (or a faked one, oh, and trigger alarms!)
 * @param {Object} details what happened to trigger the response
 * @returns {Object} response contains a statusCode and a body
 */
function buildAppropriateResponse(details) {
  let actualResponse;

  switch (details.type) {

    case "logicError":
      actualResponse = {
        error: details.message,
      };
      break;

    case "success":
      actualResponse = details.message;
      break;

    default:
      actualResponse = {
        statusCode: 500,
        body: "Don't know this response type??" + JSON.stringify(details),
      };
  }

  return actualResponse;
}
