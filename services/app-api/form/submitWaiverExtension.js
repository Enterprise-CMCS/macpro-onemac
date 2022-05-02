// import Joi from "joi";
import { Validate, waiverTemporaryExtension } from "cmscommonlib";

import handler from "../libs/handler-lib";
import { submitAny } from "./submitAny";
import { getCommonSchema } from "./getCommonSchema";
import { defaultFormConfig } from "./defaultFormConfig";

const waiverTemporaryExtensionFormConfig = {
  ...defaultFormConfig,
  ...waiverTemporaryExtension,
  validateSubmission: (data) => {
    // start with the Schema for all form submissions
    const waiverTemporaryExtensionSchema = getCommonSchema(
      waiverTemporaryExtension.idRegex,
      waiverTemporaryExtension.requiredAttachments,
      waiverTemporaryExtension.optionalAttachments
    );

    const {
      error: waiverTemporaryExtensionError,
      value: valueAfterWaiverTemporaryExtensionError,
    } = waiverTemporaryExtensionSchema.validate(data);
    if (waiverTemporaryExtensionError) {
      if (process.env.NODE_ENV !== "test") {
        console.error(
          waiverTemporaryExtensionError,
          valueAfterWaiverTemporaryExtensionError
        );
      }
      return waiverTemporaryExtensionError;
    }

    return null;
  },
  getParentInfo: (data) => Validate.getParentPackage(data),
};

export const main = handler(async (event) => {
  try {
    console.log(
      "waiverTemporaryExtensionFormConfig is: ",
      waiverTemporaryExtensionFormConfig
    );
    return submitAny(event, waiverTemporaryExtensionFormConfig);
  } catch (error) {
    console.log("Exception: ", error);
    throw error;
  }
});
