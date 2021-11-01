import { DateTime } from "luxon";
import * as uuid from "uuid";

import { latestAccessStatus, USER_STATUS, USER_TYPE } from "cmscommonlib";

import getChangeRequestFunctions, {
  validateSubmission,
  hasValidStateCode,
} from "./changeRequest/changeRequest-util";
import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
import sendEmail from "./libs/email-lib";
import { RESPONSE_CODE } from "cmscommonlib";
import getUser from "./utils/getUser";
import newSubmission from "./utils/newSubmission";

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
  const data = JSON.parse(event.body);

  // Add required data to the record before storing.
  data.id = uuid.v1();
  data.createdAt = Date.now();
  data.state = SUBMISSION_STATES.CREATED;
  data.userId = event.requestContext.identity.cognitoIdentityId;

  try {
    // do a pre-check for things that should stop us immediately
    if (validateSubmission(data)) {
      return RESPONSE_CODE.VALIDATION_ERROR;
    }

    // get the rest of the details about the current user
    const doneBy = await getUser(data.user.email);
    console.log("done by: ", doneBy);
    if (!doneBy) {
      return RESPONSE_CODE.USER_NOT_FOUND;
    }

    if (
      (doneBy.type != USER_TYPE.STATE_SUBMITTER ||
        doneBy.type != USER_TYPE.STATE_SYSTEM_ADMIN) &&
      latestAccessStatus(doneBy, data.territory) !== USER_STATUS.ACTIVE
    ) {
      return RESPONSE_CODE.USER_NOT_AUTHORIZED;
    }
  } catch (error) {
    console.error("Could not get user from database:", error);
    return RESPONSE_CODE.DATA_RETRIEVAL_ERROR;
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
    return RESPONSE_CODE.TRANSMITTAL_ID_TERRITORY_NOT_VALID; // if ever NOT from ID... should change error :)
  }

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
  } catch (error) {
    console.log("Error is: ", error);
    throw error;
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
    // send the submission "reciept" to the State Submitter
    await sendEmail(crFunctions.getStateEmail(data));
  } catch (error) {
    console.log(
      "Warning: There was an error sending the user acknowledgement email.",
      error
    );
  }

  // we do the data conversion here so the new functions only need the new way
  const submitterName = data.user.firstName + " " + data.user.lastName;
  const submissionData = {
    componentId: data.transmittalNumber,
    componentType: data.type,
    submissionTimestamp: data.submittedAt,
    currentStatus: "Submitted",
    attachments: data.uploads,
    additionalInformation: data.summary,
    submissionId: data.id,
    submitterName: submitterName,
    submitterEmail: data.user.email,
    submitterId: data.userId,
  };

  if (data.actionType) submissionData.componentType += data.actionType;

  if (data.waiverAuthority)
    submissionData.waiverAuthority = data.waiverAuthority;

  return newSubmission(submissionData)
    .then(() => {
      console.log("Successfully submitted the following:", data);
      return RESPONSE_CODE.SUCCESSFULLY_SUBMITTED;
    })
    .catch((error) => {
      console.log("Error is: ", error.message);
      // throw error;
    });
});
