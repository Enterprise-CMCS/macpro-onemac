import { medicaidSPARAIResponse } from "cmscommonlib";

import handler from "../libs/handler-lib";
import { submitAny } from "./submitAny";
import {
  defaultFormConfig,
  defaultParentId,
  defaultParentType,
} from "./defaultFormConfig";

export const medicaidSPARAIResponseFormConfig = {
  ...defaultFormConfig,
  ...medicaidSPARAIResponse,
  appendToSchema: {
    parentId: defaultParentId,
    parentType: defaultParentType,
  },
};

export const main = handler(async (event) =>
  submitAny(event, medicaidSPARAIResponseFormConfig)
);
