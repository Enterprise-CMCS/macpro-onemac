import { waiverTemporaryExtension } from "cmscommonlib";
import Joi from "joi";
import handler from "../libs/handler-lib";
import { submitAny } from "./submitAny";
import { defaultFormConfig } from "./defaultFormConfig";

export const waiverTemporaryExtensionFormConfig = {
  ...defaultFormConfig,
  ...waiverTemporaryExtension,
  appendToSchema: {
    parentId: Joi.string().required(),
    parentType: Joi.string().required(),
  },
};

export const main = handler(async (event) =>
  submitAny(event, waiverTemporaryExtensionFormConfig)
);
