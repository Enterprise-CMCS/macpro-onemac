import * as uuid from "uuid";
import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
import sendEmail from "./libs/email-lib";
import getChangeRequestFunctions, {
  hasValidStateCode,
} from "./changeRequest/changeRequest-util";
import { RESPONSE_CODE } from "./libs/response-codes";
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
  // If this invocation is a prewarm, do nothing and return.
  if (event.source == "serverless-plugin-warmup") {
    console.log("Warmed up!");
    return null;
  }
  const data = JSON.parse(event.body);

  // do a pre-check for things that should stop us immediately
  const errorMessage = runInitialCheck(data);
  if (errorMessage) {
    return errorMessage;
  }

  // map the changeRequest functions from the data.type
  const crFunctions = getChangeRequestFunctions(data.type);
  if (!crFunctions) {
    return RESPONSE_CODE.VALIDATION_ERROR;
  }

  const crVerifyTransmittalIdStateCode = hasValidStateCode(
    data.transmittalNumber
  );
  if (!crVerifyTransmittalIdStateCode) {
    return RESPONSE_CODE.TRANSMITTAL_ID_TERRITORY_NOT_VALID;
  }

  const crVerifyTerritoryStateCode = hasValidStateCode(data.territory);
  if (!crVerifyTerritoryStateCode) {
    return RESPONSE_CODE.TERRITORY_NOT_VALID;
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
    console.log("validation Response: ", validationResponse);

    if (validationResponse.areFieldsValid === false) {
      console.log("Message from fieldsValid: ", validationResponse);
      return validationResponse.whyNot;
    }

    await dynamoDb.put({
      TableName: process.env.tableName,
      Item: data,
    });

    // create the (package) ID data
    const packageParams = {
      TableName: process.env.spaIdTableName,
      Item: {
        id: data.transmittalNumber,
        [data.id]: data.userId,
      },
    };
    await dynamoDb.put(packageParams);
  } catch (dbError) {
    console.log("This error is: " + dbError);
    throw dbError;
  }
  console.log(`Current epoch time:  ${Math.floor(new Date().getTime())}`);

  // if the ID is a waiver, store all the possibilities for package checking
  // if this is an id type where we want better searching, do that now
  // 122 is 1915b (123 is 1915c)
  if (data.type === "waiver") {
    let planType = 122;
    let sliceEnd = data.transmittalNumber.lastIndexOf(".");
    let smallerID = data.transmittalNumber.slice(0, sliceEnd); // one layer removed
    let params;
    let numIterations = 5;

    while (smallerID.length > 2 && numIterations-- > 0) {
      try {
        params = {
          TableName: process.env.spaIdTableName,
          Item: {
            id: smallerID,
            planType: planType,
            originalID: data.transmittalNumber,
          },
          ConditionExpression: "attribute_not_exists(id)",
        };
        console.log("params are: ", params);
        await dynamoDb.put(params);
      } catch (error) {
        if (error.code != "ConditionalCheckFailedException")
          console.log("Error is: ", error);
        else
          console.log(
            "ID " + smallerID + " exists in " + process.env.spaIdTableName
          );
      }
      sliceEnd = smallerID.lastIndexOf(".");
      smallerID = smallerID.slice(0, sliceEnd); // one layer removed
    }
  }

  // Now send the CMS email
  await sendEmail(crFunctions.getCMSEmail(data));

  //We successfully sent the submission email.  Update the record to reflect that.
  data.state = SUBMISSION_STATES.SUBMITTED;
  data.submittedAt = Date.now();

  // record the current end timestamp (can be start/stopped/changed)
  // 90 days is current CMS review period and it is based on CMS time!!
  // UTC is 4-5 hours ahead, convert first to get the correct start day
  // AND use plus days function b/c DST days are 23 or 25 hours!!
  data.ninetyDayClockEnd = DateTime.fromMillis(data.submittedAt)
    .setZone("America/New_York")
    .plus({ days: 90 })
    .toMillis();
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

  return RESPONSE_CODE.SUCCESSFULLY_SUBMITTED;
});

/**
 * Validation check for items that should be checked before anything else is done
 * @param {Object} data the received data
 * @returns {String} any error messages triggered
 */
function runInitialCheck(data) {
  if (!data.user) return RESPONSE_CODE.VALIDATION_ERROR;
  if (!data.uploads) return RESPONSE_CODE.ATTACHMENT_ERROR;
  if (!data.type) return RESPONSE_CODE.SYSTEM_ERROR;

  return "";
}
