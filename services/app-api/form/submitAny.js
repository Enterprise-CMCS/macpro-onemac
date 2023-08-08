import { DateTime } from "luxon";

import {
  getUserRoleObj,
  getActiveTerritories,
  RESPONSE_CODE,
} from "cmscommonlib";

import sendEmail from "../libs/email-lib";

import { getUser } from "../getUser";
import { validateSubmission } from "./validateSubmission";
import packageExists from "../utils/packageExists";
import { newEvent } from "../utils/newEvent";
import { getPackageType } from "../utils/getPackageType";

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
  let data, doneBy;
  const warningsInCMSNotice = [];

  try {
    data = JSON.parse(event.body);
  } catch (error) {
    console.log("event couldn't parse: ", error);
    throw error;
  }

  // errors here are application level: returned as codes to front end for handling
  try {
    // returns undefined if no errors found, or the first error found.
    if (validateSubmission(data, config)) {
      throw RESPONSE_CODE.VALIDATION_ERROR;
    }

    // get the rest of the details about the current user
    doneBy = await getUser(data.submitterEmail);

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

    // verify the ID exists if it should and doesn't if it doesn't
    const isThere = await packageExists(data.componentId);
    if (config.idMustExist && isThere === false) {
      throw RESPONSE_CODE.ID_NOT_FOUND;
    }
    if (!config.idMustExist && isThere === true) {
      throw RESPONSE_CODE.DUPLICATE_ID;
    }
  } catch (error) {
    console.log("Error is: ", error);
    return error;
  }

  // if a parent ID is included, need to validate parent and grab type
  if (data.parentId) {
    try {
      data.parentType = await getPackageType(data.parentId);
    } catch (e) {
      console.log(
        "%s parent ID %s validation failed: ",
        data.componentId,
        data.parentId,
        e
      );
      //      throw RESPONSE_CODE.VALIDATION_ERROR; eh... probably still want to save it
    }
  }

  try {
    // Add the details from this submission action
    const rightNowNormalized = Date.now();
    data.submissionTimestamp = rightNowNormalized;
    data.eventTimestamp = rightNowNormalized;

    data.currentStatus = config.newStatus;
    data.componentType = config.componentType;

    // record the current end timestamp (can be start/stopped/changed)
    // 90 days is current CMS review period and it is based on CMS time!!
    // UTC is 4-5 hours ahead, convert first to get the correct start day
    // AND use plus days function b/c DST days are 23 or 25 hours!!
    data.clockEndTimestamp = DateTime.fromMillis(data.submissionTimestamp)
      .setZone("America/New_York")
      .plus({ days: 90 })
      .toMillis();

    await newEvent(`submit${config.componentType}`, data);
    console.log("Successfully submitted: ", data);
  } catch (error) {
    console.log("%s Error is: ", data.componentId, error);
    return error?.response_code
      ? error.response_code
      : RESPONSE_CODE.SUBMISSION_SAVE_FAILURE;
  }

  try {
    // Now send the CMS email
    if (config?.buildCMSNotice)
      await sendEmail(config.buildCMSNotice(data, config, doneBy));
    else
      await sendEmail(CMSSubmissionNotice(data, config, warningsInCMSNotice));
  } catch (error) {
    console.log("%s Error is: ", data.componentId, error);
    return RESPONSE_CODE.EMAIL_NOT_SENT;
  }

  //An error sending the user email is not a failure.
  try {
    // send the submission "reciept" to the State Submitter
    if (config?.buildStateReceipt) {
      const stateEmail = await config.buildStateReceipt(data, config, doneBy);
      await sendEmail(stateEmail);
    } else await sendEmail(stateSubmissionReceipt(data, config));
  } catch (error) {
    console.log(
      "%s Warning: There was an error sending the user acknowledgement email.",
      data.componentId,
      error
    );
  }
  console.log("returning success code: ", config.successResponseCode);
  return config.successResponseCode;
};

/**
 * Submitting a Form uses the configs from each form type to do the following:
 *  - parse the event
 *  - validate the submission data
 *  - authenticate the user
 *  - save the data
 *  - send emails
 */
