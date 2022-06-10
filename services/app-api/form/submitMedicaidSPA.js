import { medicaidSPA } from "cmscommonlib";
import Joi from "joi";
import handler from "../libs/handler-lib";
import { submitAny } from "./submitAny";
import { defaultFormConfig } from "./defaultFormConfig";

export const medicaidSPAFormConfig = {
  ...defaultFormConfig,
  ...medicaidSPA,
  appendToSchema: {
    proposedEffectiveDate: [Joi.string().isoDate(), Joi.string().valid("none")],
  },
};

export const main = handler(async (event) =>
  submitAny(event, medicaidSPAFormConfig)
);
