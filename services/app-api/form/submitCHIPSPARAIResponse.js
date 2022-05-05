// import Joi from "joi";
import { chipSPARAIResponse, Workflow } from "cmscommonlib";

import handler from "../libs/handler-lib";
import { submitAny } from "./submitAny";
import { defaultFormConfig } from "./defaultFormConfig";

export const chipSPARAIResponseFormConfig = {
  ...defaultFormConfig,
  ...chipSPARAIResponse,
  CMSCcAddresses: process.env.chipCcEmail?.split(";")?.filter((s) => s.trim()),
  getParentInfo: (myId) => [myId, Workflow.ONEMAC_TYPE.CHIP_SPA],
};

export const main = handler(async (event) =>
  submitAny(event, chipSPARAIResponseFormConfig)
);
