import { medicaidSPA } from "cmscommonlib";
import handler from "../libs/handler-lib";
import { submitAny } from "./submitAny";
import {
  defaultFormConfig,
  defaultProposedEffectiveDateSchema,
  medicaidSpaText,
} from "./defaultFormConfig";

export const medicaidSPAFormConfig = {
  ...defaultFormConfig,
  ...medicaidSPA,
  appendToSchema: {
    proposedEffectiveDate: defaultProposedEffectiveDateSchema,
  },
  closingRemarks: medicaidSpaText,
};

export const main = handler(async (event) =>
  submitAny(event, medicaidSPAFormConfig)
);
