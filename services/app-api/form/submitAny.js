import { DateTime } from "luxon";
import * as uuid from "uuid";

import {
  getUserRoleObj,
  getActiveTerritories,
  RESPONSE_CODE,
  Workflow,
} from "cmscommonlib";

import sendEmail from "../libs/email-lib";
import { getUser } from "../getUser";
import newSubmission from "../utils/newSubmission";
import { CMSSubmissionNotice } from "../email/CMSSubmissionNotice";
import { stateSubmissionReceipt } from "../email/stateSubmissionReceipt";

/**
 * Submitting a Form uses the configs from each form type to do the following:
 *  - parse the event
 *  - validate the submission data
 *  - authenticate the user
 *  - save the data
 *  - send emails
 */

export const submitAny = async (event, config) => {
  let inData;

  try {
    inData = JSON.parse(event.body);
  } catch (error) {
    console.log("event couldn't parse: ", error);
    throw error;
  }

  // TRANSLATION SECTION - MOVE THESE CHANGES TO FRONT END
  const data = {
    componentId: inData.transmittalNumber,
    territory: inData.transmittalNumber.toString().substring(0, 2),
    proposedEffectiveDate: inData.proposedEffectiveDate,
    attachments: inData.uploads,
    additionalInformation: inData.summary,
    submissionId: uuid.v1(), // not sure we need this anymore
    submitterName: inData.submitterName,
    submitterEmail: inData.submitterEmail,
    submitterId: event.requestContext.identity.cognitoIdentityId, // not sure we want this anymore
    waiverAuthority: inData.waiverAuthority,
  };

  // errors here are application level: returned as codes to front end for handling
  try {
    // returns undefined if no errors found, or the first error found.
    if (config.validateSubmission(data)) {
      throw RESPONSE_CODE.VALIDATION_ERROR;
    }

    // get the rest of the details about the current user
    const doneBy = await getUser(data.submitterEmail);

    if (JSON.stringify(doneBy) === "{}") {
      throw RESPONSE_CODE.USER_NOT_FOUND;
    }

    // check that the user has the right access to this submission
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
  } catch (error) {
    console.log("Error is: ", error);
    return error;
  }

  try {
    // Add the details from this submission action
    data.submissionTimestamp = Date.now();
    data.currentStatus = Workflow.ONEMAC_STATUS.SUBMITTED;

    // record the current end timestamp (can be start/stopped/changed)
    // 90 days is current CMS review period and it is based on CMS time!!
    // UTC is 4-5 hours ahead, convert first to get the correct start day
    // AND use plus days function b/c DST days are 23 or 25 hours!!
    data.clockEndTimestamp = DateTime.fromMillis(data.submissionTimestamp)
      .setZone("America/New_York")
      .plus({ days: 90 })
      .toMillis();

    await newSubmission(data, config);
    console.log("Successfully submitted the following:", data);
  } catch (error) {
    console.log("Error is: ", error.message);
    return RESPONSE_CODE.SUBMISSION_SAVE_FAILURE;
  }

  try {
    // Now send the CMS email
    await sendEmail(CMSSubmissionNotice(data, config));
  } catch (error) {
    console.log("Error is: ", error);
    return RESPONSE_CODE.EMAIL_NOT_SENT;
  }

  //An error sending the user email is not a failure.
  try {
    // send the submission "reciept" to the State Submitter
    await sendEmail(stateSubmissionReceipt(data, config));
  } catch (error) {
    console.log(
      "Warning: There was an error sending the user acknowledgement email.",
      error
    );
  }
  return RESPONSE_CODE.SUCCESSFULLY_SUBMITTED;
};
