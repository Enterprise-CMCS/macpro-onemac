import { medicaidSPA } from "cmscommonlib";

import handler from "../libs/handler-lib";
import { submitAny } from "./submitAny";
import { defaultFormConfig } from "./defaultFormConfig";

export const medicaidSPAFormConfig = {
  ...defaultFormConfig,
  ...medicaidSPA,
};

export const main = handler(async (event) =>
  submitAny(event, medicaidSPAFormConfig)
);
