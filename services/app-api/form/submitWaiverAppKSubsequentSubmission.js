import { waiverAppKSubsequentSubmission, RESPONSE_CODE } from "cmscommonlib";
import handler from "../libs/handler-lib";
import { submitAny } from "./submitAny";
import {
  defaultFormConfig,
  defaultParentType,
  defaultWaiverAuthoritySchema,
} from "./defaultFormConfig";

export const waiverAppKSubsequentSubmissionFormConfig = {
  ...defaultFormConfig,
  ...waiverAppKSubsequentSubmission,
  successResponseCode:
    RESPONSE_CODE.SUCCESSFULLY_SUBMITTED_SUBSEQUENT_SUBMISSION,
  appendToSchema: {
    parentType: defaultParentType,
    waiverAuthority: defaultWaiverAuthoritySchema,
  },
};

export const main = handler(async (event) =>
  submitAny(event, waiverAppKSubsequentSubmissionFormConfig)
);
