import Joi from "joi";

import { territoryCodeList } from "cmscommonlib";

export const getCommonSchema = (
  idRegex,
  requiredAttachments,
  optionalAttachments
  // ,
  // deprecatedAttachmentTypes
) => {
  const MIME_TYPE_PATTERN =
    /(application|audio|font|image|message|model|multipart|text|video)\/.+/;

  const attachmentSchema = Joi.object({
    contentType: Joi.string().pattern(MIME_TYPE_PATTERN).required(),
    filename: Joi.string().required(),
    s3Key: Joi.string().required(),
    title: Joi.string().valid(
      ...[
        ...requiredAttachments,
        ...optionalAttachments /* , ...deprecatedAttachmentTypes */,
      ].map((uploadCfg) =>
        typeof uploadCfg === "string" ? uploadCfg : uploadCfg.title
      )
    ),
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
    submitterId: Joi.string().allow(""),
    submissionId: Joi.string().allow(""),
  });

  return basicSchema;
};

export const validateSubmission = (data, config) => {
  console.log("validate this data: ", data);
  // start with the Schema for all form submissions
  const theSchema = getCommonSchema(
    config.idRegex,
    config.requiredAttachments,
    config.optionalAttachments
    // ,
    // config.deprecatedAttachmentTypes
  ).append(config.appendToSchema);

  const { error: validationError, value: valueOfValidationError } =
    theSchema.validate(data);
  if (validationError) {
    if (process.env.NODE_ENV !== "test") {
      console.error(validationError, valueOfValidationError);
    }
    console.log(validationError, valueOfValidationError);
    return validationError;
  }

  return null;
};
