import handler from "../libs/handler-lib";
import { submitAny } from "./submitAny";
import { defaultWaiverSubsequentSubmissionConfig } from "./defaultFormConfig";
import {
  initialWaiverB4SubsequentSubmission,
  initialWaiverBSubsequentSubmission,
  waiverAuthorityB,
  waiverAuthorityB4,
} from "cmscommonlib";

export const initialWaiverB4SubsequentFormConifg = {
  ...defaultWaiverSubsequentSubmissionConfig,
  ...initialWaiverB4SubsequentSubmission,
};

export const initialWaiverBSubsequentFormConifg = {
  ...defaultWaiverSubsequentSubmissionConfig,
  ...initialWaiverBSubsequentSubmission,
};

export const main = handler(async (event) => {
  let data, formConfig;
  try {
    data = JSON.parse(event.body);
  } catch (error) {
    console.log("event couldn't parse: ", error);
    throw error;
  }

  if (data.waiverAuthority === waiverAuthorityB4.value) {
    formConfig = initialWaiverB4SubsequentFormConifg;
  } else if (data.waiverAuthority === waiverAuthorityB.value) {
    formConfig = initialWaiverBSubsequentFormConifg;
  } else {
    throw new Error("Waiver Authority not found");
  }

  return await submitAny(event, formConfig);
});
