import Joi from "joi";
import {
  waiverAmendmentB4,
  waiverAmendmentB,
  waiverAuthorityB4,
  waiverAuthorityB,
} from "cmscommonlib";
import handler from "../libs/handler-lib";
import { submitAny } from "./submitAny";
import { defaultFormConfig, defaultWaiverSchema } from "./defaultFormConfig";

const waiverAmendmentFormConfig = {
  ...defaultFormConfig,
  appendToSchema: {
    ...defaultWaiverSchema,
    parentId: Joi.string().required(),
  },
};

export const waiverAmendmentB4FormConifg = {
  ...waiverAmendmentFormConfig,
  ...waiverAmendmentB4,
};

export const waiverAmendmentBFormConifg = {
  ...waiverAmendmentFormConfig,
  ...waiverAmendmentB,
};

export const main = handler(async (event) => {
  let data, formConfig;
  try {
    data = JSON.parse(event.body);
  } catch (error) {
    console.log("event couldn't parse: ", error);
    throw error;
  }

  if (data.waiverAuthority === waiverAuthorityB4.value) {
    formConfig = waiverAmendmentB4FormConifg;
  } else if (data.waiverAuthority === waiverAuthorityB.value) {
    formConfig = waiverAmendmentBFormConifg;
  } else {
    throw new Error("Waiver Authority not found");
  }

  return await submitAny(event, formConfig);
});
