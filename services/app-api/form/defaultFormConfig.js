import Joi from "joi";

export const defaultFormConfig = {
  CMSToAddresses: [process.env.reviewerEmail, process.env.testingEmail].filter(
    Boolean
  ),
  CMSCcAddresses: [],
};

export const defaultProposedEffectiveDateSchema = [
  Joi.string().isoDate(),
  Joi.string().valid("none"),
];
export const defaultTitleSchema = Joi.string().required();
export const defaultWaiverAuthoritySchema = Joi.string().required();
export const defaultParentId = Joi.string().required();
export const defaultParentType = Joi.string().required();
