import { waiverAppendixK } from "cmscommonlib";

import handler from "../libs/handler-lib";
import { submitAny } from "./submitAny";
import {
  defaultFormConfig,
  defaultTitleSchema,
  defaultWaiverSchema,
} from "./defaultFormConfig";

export const waiverAppendixKFormConfig = {
  ...defaultFormConfig,
  ...waiverAppendixK,
  appendToSchema: {
    ...defaultWaiverSchema,
    title: defaultTitleSchema,
  },
};

export const main = handler(async (event) =>
  submitAny(event, waiverAppendixKFormConfig)
);
