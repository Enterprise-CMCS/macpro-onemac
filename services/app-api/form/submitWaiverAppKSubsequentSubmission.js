import { waiverAppKSubsequentSubmission } from "cmscommonlib";
import handler from "../libs/handler-lib";
import { submitAny } from "./submitAny";
import { defaultWaiverSubsequentSubmissionConfig } from "./defaultFormConfig";

export const waiverAppKSubsequentSubmissionFormConfig = {
  ...defaultWaiverSubsequentSubmissionConfig,
  ...waiverAppKSubsequentSubmission,
};

export const main = handler(async (event) =>
  submitAny(event, waiverAppKSubsequentSubmissionFormConfig)
);
