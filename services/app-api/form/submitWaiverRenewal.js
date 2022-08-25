import Joi from "joi";
import { waiverRenewal } from "cmscommonlib";

import handler from "../libs/handler-lib";
import { submitAny } from "./submitAny";
import {
  defaultFormConfig,
  defaultProposedEffectiveDateSchema,
} from "./defaultFormConfig";

export const waiverRenewalFormConfig = {
  ...defaultFormConfig,
  ...waiverRenewal,
  appendToSchema: {
    waiverAuthority: Joi.string().required(),
    parentId: Joi.string().required(),
    // Should look into a real validation with choices centrally located in cmscommonlib
    //      waiverAuthority: Joi.string().valid(WAIVER_AUTHORITY_CHOICES).required(),
    proposedEffectiveDate: defaultProposedEffectiveDateSchema,
  },
};

export const main = handler(async (event) =>
  submitAny(event, waiverRenewalFormConfig)
);
