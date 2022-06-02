import { chipSPA } from "cmscommonlib";

import handler from "../libs/handler-lib";
import { submitAny } from "./submitAny";
import { defaultFormConfig } from "./defaultFormConfig";

export const chipSPAFormConfig = {
  ...defaultFormConfig,
  ...chipSPA,
  CMSCcAddresses: process.env.chipCcEmail?.split(";")?.filter((s) => s.trim()),
};

export const main = handler(async (event) =>
  submitAny(event, chipSPAFormConfig)
);
