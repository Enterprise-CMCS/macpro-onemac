import Joi from "joi";
import { Validate, waiverAmendment } from "cmscommonlib";

import handler from "../libs/handler-lib";
import { submitAny } from "./submitAny";
import {
  defaultFormConfig,
  defaultProposedEffectiveDateSchema,
} from "./defaultFormConfig";

export const waiverAmendmentFormConfig = {
  ...defaultFormConfig,
  ...waiverAmendment,
  getParentInfo: (myId) => Validate.getParentWaiver(myId),
  appendToSchema: {
    waiverAuthority: Joi.string().required(),
    // Should look into a real validation with choices centrally located in cmscommonlib
    //      waiverAuthority: Joi.string().valid(WAIVER_AUTHORITY_CHOICES).required(),
    proposedEffectiveDate: defaultProposedEffectiveDateSchema,
  },
};

export const main = handler(async (event) =>
  submitAny(event, waiverAmendmentFormConfig)
);
