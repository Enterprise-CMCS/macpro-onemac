import { chipSPA } from "cmscommonlib";
import handler from "../libs/handler-lib";
import { submitAny } from "./submitAny";
import {
  chipSpaText,
  defaultFormConfig,
  defaultProposedEffectiveDateSchema,
} from "./defaultFormConfig";

export const chipSPAFormConfig = {
  ...defaultFormConfig,
  ...chipSPA,
  appendToSchema: {
    proposedEffectiveDate: defaultProposedEffectiveDateSchema,
  },
  closingRemarks: chipSpaText,
};

export const main = handler(async (event) =>
  submitAny(event, chipSPAFormConfig)
);
