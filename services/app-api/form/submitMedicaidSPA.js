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
  CMSCcAddresses: process.env.ccEmail?.split(";")?.filter((s) => s.trim()),
  appendToSchema: {
    proposedEffectiveDate: defaultProposedEffectiveDateSchema,
  },
};

export const main = handler(async (event) =>
  submitAny(event, medicaidSPAFormConfig)
);
