import { DateTime } from "luxon";

import {
  getUserRoleObj,
  getActiveTerritories,
  RESPONSE_CODE,
  Workflow,
} from "cmscommonlib";

import sendEmail from "../libs/email-lib";
import { getUser } from "../getUser";
import { CMSSubmissionNotice } from "../email/CMSSubmissionNotice";
import { stateSubmissionReceipt } from "../email/stateSubmissionReceipt";
import newSubmission from "../utils/newSubmission";

/**
 * Submitting a Form uses the configs from each form type to do the following:
 *  - parse the event
 *  - authenticate the user
 *  - validate the submission data
 *  - save the data
 *  - send emails
 */

export const submitAny = async (event, config) => {
  let data;

  try {
    data = JSON.parse(event.body);
  } catch (error) {
    console.log("event couldn't parse: ", error);
    throw error;
  }

  // these errors are application errors, so are returned, instead
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
    data.componentType = config.type;
    data.currentStatus = Workflow.ONEMAC_STATUS.SUBMITTED;

    // record the current end timestamp (can be start/stopped/changed)
    // 90 days is current CMS review period and it is based on CMS time!!
    // UTC is 4-5 hours ahead, convert first to get the correct start day
    // AND use plus days function b/c DST days are 23 or 25 hours!!
    data.ninetyDayClockEnd = DateTime.fromMillis(data.submissionTimestamp)
      .setZone("America/New_York")
      .plus({ days: 90 })
      .toMillis();

    await newSubmission(data);
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
