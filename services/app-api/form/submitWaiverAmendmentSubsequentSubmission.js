import {
  waiverAmendmentSubsequentSubmission,
  waiverAmendmentB4SubsequentSubmission,
  waiverAmendmentBSubsequentSubmission,
  waiverAuthorityB,
  waiverAuthorityB4,
} from "cmscommonlib";
import handler from "../libs/handler-lib";
import { submitAny } from "./submitAny";
import {
  defaultFormConfig,
  defaultParentType,
  defaultWaiverAuthoritySchema,
} from "./defaultFormConfig";

export const waiverAmendmentSubsequentSubmissionFormConfig = {
  ...defaultFormConfig,
  ...waiverAmendmentSubsequentSubmission,
  appendToSchema: {
    parentType: defaultParentType,
    waiverAuthority: defaultWaiverAuthoritySchema,
  },
};

export const waiverAmendmentB4FormConifg = {
  ...waiverAmendmentSubsequentSubmissionFormConfig,
  ...waiverAmendmentB4SubsequentSubmission,
};

export const waiverAmendmentBFormConifg = {
  ...waiverAmendmentSubsequentSubmissionFormConfig,
  ...waiverAmendmentBSubsequentSubmission,
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
    formConfig = waiverAmendmentB4FormConifg;
  } else if (data.waiverAuthority === waiverAuthorityB.value) {
    formConfig = waiverAmendmentBFormConifg;
  } else {
    throw new Error("Waiver Authority not found");
  }

  return await submitAny(event, formConfig);
});
