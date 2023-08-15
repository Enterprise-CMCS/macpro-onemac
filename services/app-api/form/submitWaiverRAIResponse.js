import { waiverRAIResponse } from "cmscommonlib";

import handler from "../libs/handler-lib";
import { submitAny } from "./submitAny";
import {
  defaultFormConfig,
  defaultParentId,
  defaultParentType,
  waiverRAIText,
} from "./defaultFormConfig";

export const waiverRAIResponseFormConfig = {
  ...defaultFormConfig,
  ...waiverRAIResponse,
  appendToSchema: {
    parentId: defaultParentId,
    parentType: defaultParentType,
  },
  closingRemarks: waiverRAIText,
};

export const main = handler(async (event) =>
  submitAny(event, waiverRAIResponseFormConfig)
);
