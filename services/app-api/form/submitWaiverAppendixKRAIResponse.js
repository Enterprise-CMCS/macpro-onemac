import { Workflow } from "cmscommonlib";
import { Validate, waiverAppendixKRAIResponse } from "cmscommonlib";

import handler from "../libs/handler-lib";
import { submitAny } from "./submitAny";
import { defaultFormConfig } from "./defaultFormConfig";

export const waiverAppendixKRAIResponseFormConfig = {
  ...defaultFormConfig,
  ...waiverAppendixKRAIResponse,
  getParentInfo: (myId) => [myId, Workflow.ONEMAC_TYPE.WAIVER_APP_K],
};

export const main = handler(async (event) =>
  submitAny(event, waiverAppendixKRAIResponseFormConfig)
);
