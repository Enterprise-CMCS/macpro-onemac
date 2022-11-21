import Joi from "joi";

import { RESPONSE_CODE } from "cmscommonlib";

// import { CMSSubmissionNotice } from "../email/CMSSubmissionNotice";
// import { stateSubmissionReceipt } from "../email/stateSubmissionReceipt";

export const defaultFormConfig = {
  CMSToAddresses: [process.env.reviewerEmail, process.env.testingEmail].filter(
    Boolean
  ),
  CMSCcAddresses: [],
  successResponseCode: RESPONSE_CODE.SUCCESSFULLY_SUBMITTED,
  // emailFunctions: [CMSSubmissionNotice, stateSubmissionReceipt],
};

export const defaultProposedEffectiveDateSchema = [
  Joi.string().isoDate(),
  Joi.string().valid("none"),
];
export const defaultTitleSchema = Joi.string().required();
export const defaultWaiverAuthoritySchema = Joi.string().required();
export const defaultParentId = Joi.string().required();
export const defaultParentType = Joi.string().required();
