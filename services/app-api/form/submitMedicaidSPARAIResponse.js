import { medicaidSPARAIResponse } from "cmscommonlib";

import handler from "../libs/handler-lib";
import { submitAny } from "./submitAny";
import {
  defaultFormConfig,
  defaultParentId,
  defaultParentType,
  medicaidSpaRAIText,
} from "./defaultFormConfig";

export const medicaidSPARAIResponseFormConfig = {
  ...defaultFormConfig,
  ...medicaidSPARAIResponse,
  appendToSchema: {
    parentId: defaultParentId,
    parentType: defaultParentType,
  },
  closingRemarks: medicaidSpaRAIText,
};

export const main = handler(async (event) =>
  submitAny(event, medicaidSPARAIResponseFormConfig)
);
