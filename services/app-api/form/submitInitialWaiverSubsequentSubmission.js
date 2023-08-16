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
} from "cmscommonlib";

export const initialWaiverSubsequentSubmissionFormConfig = {
  ...defaultFormConfig,
  appendToSchema: {
    parentType: defaultParentType,
    waiverAuthority: defaultWaiverAuthoritySchema,
  },
};

export const initialWaiverB4FormConifg = {
  ...initialWaiverSubsequentSubmissionFormConfig,
  ...initialWaiverB4SubsequentSubmission,
};

export const intialWaiverBFormConifg = {
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
    formConfig = initialWaiverB4FormConifg;
  } else if (data.waiverAuthority === waiverAuthorityB.value) {
    formConfig = intialWaiverBFormConifg;
  } else {
    throw new Error("Waiver Authority not found");
  }

  return await submitAny(event, formConfig);
});
