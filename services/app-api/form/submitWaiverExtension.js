import { Validate, waiverTemporaryExtension } from "cmscommonlib";

import handler from "../libs/handler-lib";
import { submitAny } from "./submitAny";
import { defaultFormConfig } from "./defaultFormConfig";

export const waiverTemporaryExtensionFormConfig = {
  ...defaultFormConfig,
  ...waiverTemporaryExtension,
  getParentInfo: (myId) => Validate.getParentWaiver(myId),
};

export const main = handler(async (event) =>
  submitAny(event, waiverTemporaryExtensionFormConfig)
);
