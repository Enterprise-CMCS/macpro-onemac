import handler from "../libs/handler-lib";
import { submitAny } from "./submitAny";
import {
  defaultFormConfig,
  defaultParentType,
  defaultWaiverAuthoritySchema,
} from "./defaultFormConfig";
import {
  initialWaiverB4SubsequentSubmission,
  initialWaiverBSubsequentSubmission,
  waiverAuthorityB,
  waiverAuthorityB4,
  RESPONSE_CODE,
} from "cmscommonlib";

export const initialWaiverSubsequentSubmissionFormConfig = {
  ...defaultFormConfig,
  successResponseCode:
    RESPONSE_CODE.SUCCESSFULLY_SUBMITTED_SUBSEQUENT_SUBMISSION,
  appendToSchema: {
    parentType: defaultParentType,
    waiverAuthority: defaultWaiverAuthoritySchema,
  },
};

export const initialWaiverB4SubsequentFormConifg = {
  ...initialWaiverSubsequentSubmissionFormConfig,
  ...initialWaiverB4SubsequentSubmission,
};

export const intialWaiverBSubsequentFormConifg = {
  ...initialWaiverSubsequentSubmissionFormConfig,
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
    formConfig = intialWaiverBSubsequentFormConifg;
  } else {
    throw new Error("Waiver Authority not found");
  }

  return await submitAny(event, formConfig);
});
