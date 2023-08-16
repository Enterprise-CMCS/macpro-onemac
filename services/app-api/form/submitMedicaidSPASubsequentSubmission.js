import { medicaidSPASubsequentSubmission, RESPONSE_CODE } from "cmscommonlib";
import handler from "../libs/handler-lib";
import { submitAny } from "./submitAny";
import { defaultFormConfig, defaultParentType } from "./defaultFormConfig";

export const medicaidSPASubsequentSubmissionFormConfig = {
  ...defaultFormConfig,
  ...medicaidSPASubsequentSubmission,
  successResponseCode:
    RESPONSE_CODE.SUCCESSFULLY_SUBMITTED_SUBSEQUENT_SUBMISSION,
  appendToSchema: {
    parentType: defaultParentType,
  },
};

export const main = handler(async (event) =>
  submitAny(event, medicaidSPASubsequentSubmissionFormConfig)
);
