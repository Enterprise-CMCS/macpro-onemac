import Joi from "joi";

import { territoryCodeList } from "cmscommonlib";

export const validateAny = (
  data,
  idRegex,
  requiredAttachments,
  optionalAttachments
) => {
  const MIME_TYPE_PATTERN =
    /(application|audio|font|image|message|model|multipart|text|video)\/.+/;

  const attachmentSchema = Joi.object({
    contentType: Joi.string().pattern(MIME_TYPE_PATTERN).required(),
    filename: Joi.string().required(),
    s3Key: Joi.string().required(),
    title: Joi.string().valid(
      ...[...requiredAttachments, ...optionalAttachments].map((uploadCfg) =>
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
    transmittalNumber: Joi.string().regex(idRegex).required(),
    transmittalNumberWarningMessage: Joi.string().allow(""),
    attachments: Joi.array().items(attachmentSchema).min(1).required(),
    submitterName: Joi.string().required(),
    submitterEmail: Joi.string().required(),
  });

  const { error: basicError, value: valueAfterBasic } =
    basicSchema.validate(data);
  if (basicError) {
    if (process.env.NODE_ENV !== "test") {
      console.error(basicError, valueAfterBasic);
    }
    return basicError;
  }
  /*
  let attachments = Joi.array().items(
    
  );
  for (const field of config.requiredUploads) {
    uploads = uploads.has(
      attachmentSchema.append({
        title: Joi.string().valid(getUploadName(field)).valid().required(),
      })
    );
  }
  for (const field of [...config.requiredUploads, ...config.optionalUploads]) {
    if (typeof field !== "string" && field.allowMultiple === false) {
      uploads = uploads.unique(
        (a, b) => a.title === b.title && a.title === field.title
      );
    }
  }

  const advancedSchema = basicSchema.append({
    transmittalNumber,
    uploads,
  });

  const { error: advancedError, value: valueAfterAdvanced } =
    advancedSchema.validate(data);
  if (advancedError) {
    if (process.env.NODE_ENV !== "test") {
      console.error(advancedError, valueAfterAdvanced);
    }
    return advancedError;
  }
  */
  return null;
};
