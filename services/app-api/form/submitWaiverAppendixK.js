import { waiverAppendixK } from "cmscommonlib";

import handler from "../libs/handler-lib";
import { submitAny } from "./submitAny";
import {
  defaultFormConfig,
  defaultProposedEffectiveDateSchema,
  defaultTitleSchema,
  defaultWaiverAuthoritySchema,
} from "./defaultFormConfig";

export const waiverAppendixKFormConfig = {
  ...defaultFormConfig,
  ...waiverAppendixK,
  appendToSchema: {
    waiverAuthority: defaultWaiverAuthoritySchema,
    proposedEffectiveDate: defaultProposedEffectiveDateSchema,
    title: defaultTitleSchema,
  },
};

export const main = handler(async (event) =>
  submitAny(event, waiverAppendixKFormConfig)
);
