import { medicaidSPASubsequentSubmission } from "cmscommonlib";
import handler from "../libs/handler-lib";
import { submitAny } from "./submitAny";
import { defaultSubsequentSubmissionConfig } from "./defaultFormConfig";

export const medicaidSPASubsequentSubmissionFormConfig = {
  ...defaultSubsequentSubmissionConfig,
  ...medicaidSPASubsequentSubmission,
};

export const main = handler(async (event) =>
  submitAny(event, medicaidSPASubsequentSubmissionFormConfig)
);
