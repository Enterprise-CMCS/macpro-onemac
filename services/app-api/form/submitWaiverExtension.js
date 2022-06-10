import { Validate, waiverTemporaryExtension } from "cmscommonlib";
import Joi from "joi";
import handler from "../libs/handler-lib";
import { submitAny } from "./submitAny";
import { defaultFormConfig } from "./defaultFormConfig";

export const waiverTemporaryExtensionFormConfig = {
  ...defaultFormConfig,
  ...waiverTemporaryExtension,
  getParentInfo: (myId) => Validate.getParentWaiver(myId),
  appendToSchema: {
    parentId: Joi.string().optional(),
    parentType: Joi.string().optional(),
  },
};

export const main = handler(async (event) =>
  submitAny(event, waiverTemporaryExtensionFormConfig)
);
