import { waiverAppendixKRAIResponse } from "cmscommonlib";

import handler from "../libs/handler-lib";
import { submitAny } from "./submitAny";
import {
  defaultFormConfig,
  defaultParentId,
  defaultParentType,
} from "./defaultFormConfig";

export const waiverAppendixKRAIResponseFormConfig = {
  ...defaultFormConfig,
  ...waiverAppendixKRAIResponse,
  appendToSchema: {
    parentId: defaultParentId,
    parentType: defaultParentType,
  },
};

export const main = handler(async (event) =>
  submitAny(event, waiverAppendixKRAIResponseFormConfig)
);
