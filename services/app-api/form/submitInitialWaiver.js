import Joi from "joi";
import { initialWaiver } from "cmscommonlib";

import handler from "../libs/handler-lib";
import { submitAny } from "./submitAny";
import {
  defaultFormConfig,
  defaultProposedEffectiveDateSchema,
  defaultWaiverAuthoritySchema,
} from "./defaultFormConfig";

/**
 * Submitting a Initial Waiver MUST do the following to return SUCCESS:
 *  - parse the event
 *  - authenticate the user
 *  - validate the submission data
 *  - save the data as a new component
 *  - send email to notify CMS
 *
 * Submitting also:
 *  - sends submission receipt
 */

export const initialWaiverFormConfig = {
  ...defaultFormConfig,
  ...initialWaiver,
  appendToSchema: {
    waiverAuthority: defaultWaiverAuthoritySchema,
    // Should look into a real validation with choices centrally located in cmscommonlib
    //      waiverAuthority: Joi.string().valid(WAIVER_AUTHORITY_CHOICES).required(),
    proposedEffectiveDate: defaultProposedEffectiveDateSchema,
  },
};

export const main = handler(async (event) =>
  submitAny(event, initialWaiverFormConfig)
);
