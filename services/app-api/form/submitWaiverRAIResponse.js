import { Validate, waiverRAIResponse } from "cmscommonlib";

import handler from "../libs/handler-lib";
import { submitAny } from "./submitAny";
import { defaultFormConfig } from "./defaultFormConfig";

export const waiverRAIResponseFormConfig = {
  ...defaultFormConfig,
  ...waiverRAIResponse,
  getParentInfo: (myId) => [myId, Validate.getWaiverTypeFromNumber(myId)],
};

export const main = handler(async (event) =>
  submitAny(event, waiverRAIResponseFormConfig)
);
