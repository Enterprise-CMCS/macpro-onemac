import { waiverRenewalSubsequentSubmission } from "cmscommonlib";
import handler from "../libs/handler-lib";
import { submitAny } from "./submitAny";
import { defaultWaiverSubsequentSubmissionConfig } from "./defaultFormConfig";

export const waiverRenewalSubsequentSubmissionFormConfig = {
  ...defaultWaiverSubsequentSubmissionConfig,
  ...waiverRenewalSubsequentSubmission,
};

export const main = handler(async (event) =>
  submitAny(event, waiverRenewalSubsequentSubmissionFormConfig)
);
