import handler from "../libs/handler-lib";
import { processAny } from "./processAny";
import { defaultFormConfig } from "./defaultFormConfig";

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
  validateSubmission: (data) => {
    if (data) return true;
    return null;
  },
};

export const main = handler(async (event) => {
  try {
    return processAny(event, baseWaiverConfig);
  } catch (error) {
    console.log("Exception: ", error);
    throw error;
  }
});
