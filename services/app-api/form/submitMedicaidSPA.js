import { medicaidSPA } from "cmscommonlib";
import handler from "../libs/handler-lib";
import { submitAny } from "./submitAny";
import {
  defaultFormConfig,
  defaultProposedEffectiveDateSchema,
} from "./defaultFormConfig";

export const medicaidSPAFormConfig = {
  ...defaultFormConfig,
  ...medicaidSPA,
  appendToSchema: {
    proposedEffectiveDate: defaultProposedEffectiveDateSchema,
  },
};

export const main = handler(async (event) =>
  submitAny(event, medicaidSPAFormConfig)
);
