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
 * Submitting a Base Waiver MUST do the following to return SUCCESS:
 *  - parse the event
 *  - authenticate the user
 *  - validate the submission data
 *  - save the data as a new component
 *  - send email to notify CMS
 *
 * Submitting also:
 *  - sends submission receipt
 */

const baseWaiverConfig = {
  ...defaultFormConfig,
  typeLabel: "1915(b) Base Waiver",
};

export const main = handler(async (event) => {
  try {
    return processAny(event, baseWaiverConfig);
  } catch (error) {
    console.log("Exception: ", error);
    throw error;
  }
});
