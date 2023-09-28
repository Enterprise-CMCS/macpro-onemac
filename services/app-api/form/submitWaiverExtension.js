import {
  waiverTemporaryExtension,
  waiverTemporaryExtension1915b,
  waiverTemporaryExtension1915c,
  Workflow,
} from "cmscommonlib";
import Joi from "joi";
import handler from "../libs/handler-lib";
import { submitAny } from "./submitAny";
import { defaultFormConfig, waiverExtensionText } from "./defaultFormConfig";

export const waiverTemporaryExtensionFormConfig = {
  ...defaultFormConfig,
  ...waiverTemporaryExtension,
  newStatus: Workflow.ONEMAC_STATUS.TE_REQUESTED,
  appendToSchema: {
    parentId: Joi.string().required(),
    parentType: Joi.string().optional(),
    temporaryExtensionType: Joi.string().required(),
  },
  closingRemarks: waiverExtensionText,
};

export const waiverTemporaryExtension1915bFormConfig = {
  ...waiverTemporaryExtensionFormConfig,
  ...waiverTemporaryExtension1915b,
};

export const waiverTemporaryExtension1915cFormConfig = {
  ...waiverTemporaryExtensionFormConfig,
  ...waiverTemporaryExtension1915c,
};

export const main = handler(async (event) => {
  let data, formConfig;
  try {
    data = JSON.parse(event.body);
  } catch (error) {
    console.log("event couldn't parse: ", error);
    throw error;
  }

  if (
    data.temporaryExtensionType ===
    waiverTemporaryExtension1915b.temporaryExtensionType
  ) {
    formConfig = waiverTemporaryExtension1915bFormConfig;
  } else if (
    data.temporaryExtensionType ===
    waiverTemporaryExtension1915c.temporaryExtensionType
  ) {
    formConfig = waiverTemporaryExtension1915cFormConfig;
  } else {
    console.error(
      "Temporary Extension Type not found - ",
      data.temporaryExtensionType
    );
    throw new Error(
      "Temporary Extension Type not found - " + data.temporaryExtensionType
    );
  }
  console.log("formConfig: ", formConfig);
  return await submitAny(event, formConfig);
});
