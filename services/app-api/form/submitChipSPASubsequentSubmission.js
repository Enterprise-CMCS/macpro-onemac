import { chipSPASubsequentSubmission } from "cmscommonlib";
import handler from "../libs/handler-lib";
import { submitAny } from "./submitAny";
import { defaultSubsequentSubmissionConfig } from "./defaultFormConfig";

export const chipSPASubsequentSubmissionFormConfig = {
  ...defaultSubsequentSubmissionConfig,
  ...chipSPASubsequentSubmission,
};

export const main = handler(async (event) =>
  submitAny(event, chipSPASubsequentSubmissionFormConfig)
);
