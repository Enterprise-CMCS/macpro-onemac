import Joi from "joi";
import { baseWaiver } from "cmscommonlib";

import handler from "../libs/handler-lib";
import { submitAny } from "./submitAny";
import { validateAny } from "./validateAny";

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

const baseWaiverFormConfig = {
  ...baseWaiver,
  validateSubmission: (data) => {
    // validate the items required for all forms
    const { error: anyFormError, value: valueAfterAnyForm } = validateAny(
      data,
      baseWaiver.idRegex,
      baseWaiver.requiredAttachments,
      baseWaiver.optionalAttachments
    );
    if (anyFormError) {
      if (process.env.NODE_ENV !== "test") {
        console.error(anyFormError, valueAfterAnyForm);
      }
      return anyFormError;
    }

    // base waiver specific validation
    const baseWaiverSchema = Joi.object({
      waiverAuthority: Joi.string().required(),
      // Should look into a real validation with choices centrally located in cmscommonlib
      //      waiverAuthority: Joi.string().valid(WAIVER_AUTHORITY_CHOICES).required(),
      proposedEffectiveDate: Joi.string().isoDate().required(),
    });

    const { error: baseWaiverError, value: valueAfterBaseWaiverError } =
      baseWaiverSchema.validate(data);
    if (baseWaiverError) {
      if (process.env.NODE_ENV !== "test") {
        console.error(baseWaiverError, valueAfterBaseWaiverError);
      }
      return baseWaiverError;
    }

    return null;
  },
};

export const main = handler(async (event) => {
  try {
    console.log("baseWaiverFormConfig is: ", baseWaiverFormConfig);
    return submitAny(event, baseWaiverFormConfig);
  } catch (error) {
    console.log("Exception: ", error);
    throw error;
  }
});
