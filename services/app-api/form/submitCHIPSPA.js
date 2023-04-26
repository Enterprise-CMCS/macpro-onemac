import { chipSPA } from "cmscommonlib";
import handler from "../libs/handler-lib";
import { submitAny } from "./submitAny";
import {
  defaultFormConfig,
  defaultProposedEffectiveDateSchema,
} from "./defaultFormConfig";

export const chipSPAFormConfig = {
  ...defaultFormConfig,
  ...chipSPA,
  CMSToAddresses: [process.env.reviewerCHIPEmail],
  CMSCcAddresses: process.env.chipCcEmail?.split(";")?.filter((s) => s.trim()),
  appendToSchema: {
    proposedEffectiveDate: defaultProposedEffectiveDateSchema,
  },
};

export const main = handler(async (event) =>
  submitAny(event, chipSPAFormConfig)
);
