import {
  waiverAmendmentSubsequentSubmission,
  waiverAmendmentB4SubsequentSubmission,
  waiverAmendmentBSubsequentSubmission,
  waiverAuthorityB,
  waiverAuthorityB4,
} from "cmscommonlib";
import handler from "../libs/handler-lib";
import { submitAny } from "./submitAny";
import { defaultWaiverSubsequentSubmissionConfig } from "./defaultFormConfig";

export const waiverAmendmentSubsequentSubmissionFormConfig = {
  ...defaultWaiverSubsequentSubmissionConfig,
  ...waiverAmendmentSubsequentSubmission,
};

export const waiverAmendmentB4SubsequentFormConifg = {
  ...waiverAmendmentSubsequentSubmissionFormConfig,
  ...waiverAmendmentB4SubsequentSubmission,
};

export const waiverAmendmentBSubsequentFormConifg = {
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
    formConfig = waiverAmendmentB4SubsequentFormConifg;
  } else if (data.waiverAuthority === waiverAuthorityB.value) {
    formConfig = waiverAmendmentBSubsequentFormConifg;
  } else {
    throw new Error("Waiver Authority not found");
  }

  return await submitAny(event, formConfig);
});
