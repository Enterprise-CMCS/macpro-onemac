import { medicaidSPARAIResponse, Workflow } from "cmscommonlib";

import handler from "../libs/handler-lib";
import { submitAny } from "./submitAny";
import { defaultFormConfig } from "./defaultFormConfig";

export const medicaidSPARAIResponseFormConfig = {
  ...defaultFormConfig,
  ...medicaidSPARAIResponse,
  getParentInfo: (myId) => [myId, Workflow.ONEMAC_TYPE.SPA],
};

export const main = handler(async (event) =>
  submitAny(event, medicaidSPARAIResponseFormConfig)
);
