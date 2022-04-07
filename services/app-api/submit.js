import { DateTime } from "luxon";
import * as uuid from "uuid";

import {
  ChangeRequest,
  getUserRoleObj,
  getActiveTerritories,
} from "cmscommonlib";

import getChangeRequestFunctions, {
  validateSubmission,
} from "./changeRequest/changeRequest-util";
import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
import sendEmail from "./libs/email-lib";
import { RESPONSE_CODE } from "cmscommonlib";
import { getUser } from "./getUser";
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
  let data;
  let crFunctions;
  //console.log("Received Event: ", JSON.stringify(event, null, 2));

  // the event parse failure is an exception that should "break" the lambda
  try {
    data = JSON.parse(event.body);
  } catch (error) {
    console.log("event couldn't parse: ", error);
    throw error;
  }

  const config = ChangeRequest.CONFIG[data.type];

  // these errors are application errors, so are returned, instead
  try {
    // Add required data to the record before storing.
    data.id = uuid.v1();
    data.createdAt = Date.now();
    data.state = SUBMISSION_STATES.CREATED;
    data.userId = event.requestContext.identity.cognitoIdentityId;

    // returns undefined if no errors found, or the first error found.
    if (validateSubmission(data)) {
      throw RESPONSE_CODE.VALIDATION_ERROR;
    }

    // get the rest of the details about the current user
    const doneBy = await getUser(data?.user?.email);

    if (JSON.stringify(doneBy) === "{}") {
      throw RESPONSE_CODE.USER_NOT_FOUND;
    }

    if (Object.keys(doneBy).length > 0) {
      const userRoleObj = getUserRoleObj(doneBy?.roleList);

      const activeTerritories = getActiveTerritories(doneBy?.roleList);
      if (
        !userRoleObj.canAccessForms ||
        activeTerritories === [] ||
        !activeTerritories.includes(data.territory)
      ) {
        throw RESPONSE_CODE.USER_NOT_AUTHORIZED;
      }
    }

    // map the changeRequest functions from the data.type
    crFunctions = getChangeRequestFunctions(data.type);

    // check for submission-specific validation (uses database)
    const validationResponse = await crFunctions.fieldsValid(data);
    console.log("validation Response: ", validationResponse);

    if (validationResponse.areFieldsValid === false) {
      console.log("Message from fieldsValid: ", validationResponse);
      throw validationResponse.whyNot;
    }

    if (config.overrideType) data.type = config.overrideType;
    if (config.overrideActionType) data.actionType = config.overrideActionType;

    await dynamoDb.put({
      TableName: process.env.tableName,
      Item: data,
    });
  } catch (error) {
    console.log("Error is: ", error);
    return error;
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
    proposedEffectiveDate: data.proposedEffectiveDate,
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

  return newSubmission(...submissionData)
    .then(() => {
      console.log("Successfully submitted the following:", data);
      return RESPONSE_CODE.SUCCESSFULLY_SUBMITTED;
    })
    .catch((error) => {
      console.log("Error is: ", error.message);
      // submitting to the package model doesn't matter... all returns are success by this point
      return RESPONSE_CODE.SUCCESSFULLY_SUBMITTED;
    });
});
