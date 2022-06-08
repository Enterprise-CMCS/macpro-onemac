import { chipSPA } from "cmscommonlib";
import Joi from "joi";
import handler from "../libs/handler-lib";
import { submitAny } from "./submitAny";
import { defaultFormConfig } from "./defaultFormConfig";

export const chipSPAFormConfig = {
  ...defaultFormConfig,
  ...chipSPA,
  CMSCcAddresses: process.env.chipCcEmail?.split(";")?.filter((s) => s.trim()),
  appendToSchema: {
    proposedEffectiveDate: [Joi.string().isoDate(), Joi.string().valid("none")],
  },
};

export const main = handler(async (event) =>
  submitAny(event, chipSPAFormConfig)
);
