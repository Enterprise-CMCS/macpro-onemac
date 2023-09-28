import { initialWaiverB4, initialWaiverB } from "cmscommonlib";

import handler from "../libs/handler-lib";
import { submitAny } from "./submitAny";
import {
  defaultFormConfig,
  defaultWaiverSchema,
  waiverActionText,
} from "./defaultFormConfig";

/**
 * Submitting a Initial Waiver MUST do the following to return SUCCESS:
 *  - parse the event
 *  - authenticate the user
 *  - validate the submission data
 *  - save the data as a new component
 *  - send email to notify CMS
 *
 * Submitting also:
 *  - sends submission receipt
 */

const initialWaiverFormConfig = {
  ...defaultFormConfig,
  appendToSchema: {
    ...defaultWaiverSchema,
  },
  closingRemarks: waiverActionText,
};

export const initialWaiverB4FormConifg = {
  ...initialWaiverFormConfig,
  ...initialWaiverB4,
};

export const intialWaiverBFormConifg = {
  ...initialWaiverFormConfig,
  ...initialWaiverB,
};

export const main = handler(async (event) => {
  let data, formConfig;
  try {
    data = JSON.parse(event.body);
  } catch (error) {
    console.log("event couldn't parse: ", error);
    throw error;
  }

  if (data.waiverAuthority === initialWaiverB4.waiverAuthority.value) {
    formConfig = initialWaiverB4FormConifg;
  } else if (data.waiverAuthority === initialWaiverB.waiverAuthority.value) {
    formConfig = intialWaiverBFormConifg;
  } else {
    throw new Error("Waiver Authority not found");
  }

  return await submitAny(event, formConfig);
});
