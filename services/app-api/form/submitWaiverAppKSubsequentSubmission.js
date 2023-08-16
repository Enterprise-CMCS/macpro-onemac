import { waiverAppKSubsequentSubmission } from "cmscommonlib";
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
  appendToSchema: {
    parentType: defaultParentType,
    waiverAuthority: defaultWaiverAuthoritySchema,
  },
};

export const main = handler(async (event) =>
  submitAny(event, waiverAppKSubsequentSubmissionFormConfig)
);
