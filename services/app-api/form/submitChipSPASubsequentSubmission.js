import { chipSPASubsequentSubmission } from "cmscommonlib";
import handler from "../libs/handler-lib";
import { submitAny } from "./submitAny";
import { defaultFormConfig, defaultParentType } from "./defaultFormConfig";

export const chipSPASubsequentSubmissionFormConfig = {
  ...defaultFormConfig,
  ...chipSPASubsequentSubmission,
  appendToSchema: {
    parentType: defaultParentType,
  },
};

export const main = handler(async (event) =>
  submitAny(event, chipSPASubsequentSubmissionFormConfig)
);
