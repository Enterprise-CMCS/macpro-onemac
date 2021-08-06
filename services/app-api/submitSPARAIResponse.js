import { DateTime } from "luxon";
import * as uuid from "uuid";

import { latestAccessStatus, USER_STATUS, USER_TYPE } from "cmscommonlib";

import { validateSubmission } from "./changeRequest/changeRequest-util";
import handler from "./libs/handler-lib";
import newRaiResponse from "./utils/newRaiResponse";
import sendEmail from "./libs/email-lib";
import { RESPONSE_CODE } from "cmscommonlib";
import getUser from "./utils/getUser";
import SPARAIResponse from "./changeRequest/SPARAIResponse.js";

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
    return null;
  }
  const data = JSON.parse(event.body);

  // Add required data to the record before storing.
  data.id = uuid.v1();
  data.createdAt = Date.now();
  data.state = SUBMISSION_STATES.CREATED;

  // add the user info only available in back end.
  data.user.id = event.requestContext.identity.cognitoIdentityId;
  data.userId = event.requestContext.identity.cognitoIdentityId;

  // do a pre-check for things that should stop us immediately
  if (validateSubmission(data)) {
    return RESPONSE_CODE.VALIDATION_ERROR;
  }

  try {
    // get the rest of the details about the current user
    const doneBy = await getUser(data.user.email);
    console.log("done by: ", doneBy);
    if (!doneBy) {
      return RESPONSE_CODE.USER_NOT_FOUND;
    }

    if (
      (doneBy.type != USER_TYPE.STATE_SUBMITTER ||
        doneBy.type != USER_TYPE.STATE_ADMIN) &&
      latestAccessStatus(doneBy, data.territory) !== USER_STATUS.ACTIVE
    ) {
      return RESPONSE_CODE.USER_NOT_AUTHORIZED;
    }
  } catch (error) {
    throw error;
  }
  // put these here for now for backwards compatibility
  data.state = SUBMISSION_STATES.SUBMITTED;
  data.submittedAt = Date.now();

  try {
    // check for submission-specific validation (uses database)
    const validationResponse = await SPARAIResponse.fieldsValid(data);
    console.log("validation Response: ", validationResponse);

    if (validationResponse.areFieldsValid === false) {
      console.log("Message from fieldsValid: ", validationResponse);
      return validationResponse.whyNot;
    }
  } catch (error) {
    console.log("Error is: ", error);
    throw error;
  }

  // Now send the CMS email
  await sendEmail(SPARAIResponse.getCMSEmail(data));

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

  //An error sending the state submitter email is not a failure.
  try {
    // send the submission "reciept" to the State Submitter
    await sendEmail(SPARAIResponse.getStateEmail(data));
  } catch (error) {
    console.log(
      "Warning: There was an error sending the user acknowledgement email.",
      error
    );
  }

  let submitterName = data.user.firstName + " " + data.user.lastName;
  let raiResponseData = {
    packageId: data.transmittalNumber,
    type: "RAI Response",
    packageStatus: "RAI Response Submitted",
    sourceSystem: "OneMAC",
    timestamp: data.submittedAt,
    submitterName: submitterName,
    submitterEmail: data.user.email,
    attachments: data.uploads,
    additionalInformation: data.summary,
  };

  try {
    await newRaiResponse(raiResponseData);
    console.log("Successfully submitted the following:", raiResponseData);
    return RESPONSE_CODE.SUCCESSFULLY_SUBMITTED;
  } catch (error) {
    throw error;
  }
});
