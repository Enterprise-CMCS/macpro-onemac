import { chipSPARAIResponse } from "cmscommonlib";

import handler from "../libs/handler-lib";
import { submitAny } from "./submitAny";
import {
  defaultFormConfig,
  defaultParentId,
  defaultParentType,
  chipSpaRAIText,
} from "./defaultFormConfig";

export const chipSPARAIResponseFormConfig = {
  ...defaultFormConfig,
  ...chipSPARAIResponse,
  appendToSchema: {
    parentId: defaultParentId,
    parentType: defaultParentType,
  },
  closingRemarks: chipSpaRAIText,
};

export const main = handler(async (event) =>
  submitAny(event, chipSPARAIResponseFormConfig)
);
