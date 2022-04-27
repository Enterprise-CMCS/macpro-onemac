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
    const validateDefaultResult = validateAny(
      data,
      baseWaiver.idRegex,
      baseWaiver.requiredAttachments,
      baseWaiver.optionalAttachments
    );

    // base waiver specific validation
    const baseWaiverSchema = Joi.object({
      waiverAuthority: Joi.string().valid(WAIVER_AUTHORITY_CHOICES).required(),
      proposedEffectiveDate: Joi.string().isoDate().required(),
    });

    const { error: basicError, value: valueAfterBasic } =
      baseWaiverSchema.validate(data);
    if (basicError) {
      if (process.env.NODE_ENV !== "test") {
        console.error(basicError, valueAfterBasic);
      }
      return basicError;
    }
    return null;
  },
};

export const main = handler(async (event) => {
  try {
    return submitAny(event, baseWaiverFormConfig);
  } catch (error) {
    console.log("Exception: ", error);
    throw error;
  }
});
