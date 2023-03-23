import { waiverTemporaryExtension, Workflow } from "cmscommonlib";
import Joi from "joi";
import handler from "../libs/handler-lib";
import { submitAny } from "./submitAny";
import { defaultFormConfig } from "./defaultFormConfig";

export const waiverTemporaryExtensionFormConfig = {
  ...defaultFormConfig,
  ...waiverTemporaryExtension,
  newStatus: Workflow.ONEMAC_STATUS.TE_REQUESTED,
  appendToSchema: {
    parentId: Joi.string().required(),
    parentType: Joi.string().optional(),
    temporaryExtensionType: Joi.string().required(),
  },
};

export const main = handler(async (event) =>
  submitAny(event, waiverTemporaryExtensionFormConfig)
);
