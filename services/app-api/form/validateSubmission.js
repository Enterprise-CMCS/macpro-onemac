import Joi from "joi";

import { territoryCodeList } from "cmscommonlib";

const getCommonSchema = (idRegex, possibleAttachmentTitles) => {
  const MIME_TYPE_PATTERN =
    /(application|audio|font|image|message|model|multipart|text|video)\/.+/;

  const attachmentSchema = Joi.object({
    contentType: Joi.string().pattern(MIME_TYPE_PATTERN).required(),
    filename: Joi.string().required(),
    s3Key: Joi.string().required(),
    title: Joi.string().valid(...possibleAttachmentTitles),
    url: Joi.string().uri().required(),
  });
  const basicSchema = Joi.object({
    additionalInformation: Joi.string().allow("").max(4000),
    territory: Joi.string()
      .valid(...territoryCodeList)
      .required(),
    componentId: Joi.string().regex(new RegExp(idRegex)).required(),
    transmittalNumberWarningMessage: Joi.string().allow(""),
    attachments: Joi.array().items(attachmentSchema).min(1).required(),
    submitterName: Joi.string().required(),
    submitterEmail: Joi.string().required(),
  });

  return basicSchema;
};

export const validateSubmission = (data, config) => {
  console.log("validate this data: ", data);

  if (!config.deprecatedAttachmentTypes) config.deprecatedAttachmentTypes = [];
  // possible attachment titles are built from Required, Optional, and Deprecated
  const possibleAttachmentTitles = config.requiredAttachments
    .concat(config.optionalAttachments, config.deprecatedAttachmentTypes)
    .map((uploadCfg) =>
      typeof uploadCfg === "string" ? uploadCfg : uploadCfg.title
    );
  // start with the Schema for all form submissions
  const theSchema = getCommonSchema(
    config.idRegex,
    possibleAttachmentTitles
  ).append(config.appendToSchema);

  try {
    const { error: validationError, value: valueOfValidationError } =
      theSchema.validate(data);
    if (validationError) {
      if (process.env.NODE_ENV !== "test") {
        console.error(validationError, valueOfValidationError);
      }
      console.log(validationError, valueOfValidationError);
      return validationError;
    }
  } catch (e) {
    console.log("validateSubmission error: ", e);
  }

  return null;
};
