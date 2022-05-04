import Joi from "joi";
import { baseWaiver } from "cmscommonlib";

import handler from "../libs/handler-lib";
import { submitAny } from "./submitAny";
import { defaultFormConfig } from "./defaultFormConfig";

/**
 * Submitting a Base Waiver MUST do the following to return SUCCESS:
 *  - parse the event
 *  - authenticate the user
 *  - validate the submission data
 *  - save the data as a new component
 *  - send email to notify CMS
 *
 * Submitting also:
 *  - sends submission receipt
 */

export const baseWaiverFormConfig = {
  ...defaultFormConfig,
  ...baseWaiver,
  appendToSchema: {
    waiverAuthority: Joi.string().required(),
    // Should look into a real validation with choices centrally located in cmscommonlib
    //      waiverAuthority: Joi.string().valid(WAIVER_AUTHORITY_CHOICES).required(),
    proposedEffectiveDate: [Joi.string().isoDate(), Joi.string().valid("none")],
  },
};

export const main = handler(async (event) =>
  submitAny(event, baseWaiverFormConfig)
);

// export const main = handler(async (event) => {
//   try {
//     console.log("baseWaiverFormConfig is: ", baseWaiverFormConfig);
//     return submitAny(event, baseWaiverFormConfig);
//   } catch (error) {
//     console.log("Exception: ", error);
//     throw error;
//   }
// });
