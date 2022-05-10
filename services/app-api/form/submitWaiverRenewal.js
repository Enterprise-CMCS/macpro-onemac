import Joi from "joi";
import { Validate, waiverRenewal } from "cmscommonlib";

import handler from "../libs/handler-lib";
import { submitAny } from "./submitAny";
import { defaultFormConfig } from "./defaultFormConfig";

export const waiverRenewalFormConfig = {
  ...defaultFormConfig,
  ...waiverRenewal,
  appendToSchema: {
    waiverAuthority: Joi.string().required(),
    // Should look into a real validation with choices centrally located in cmscommonlib
    //      waiverAuthority: Joi.string().valid(WAIVER_AUTHORITY_CHOICES).required(),
    proposedEffectiveDate: [Joi.string().isoDate(), Joi.string().valid("none")],
  },
};

export const main = handler(async (event) =>
  submitAny(event, waiverRenewalFormConfig)
);
