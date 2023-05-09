import Joi from "joi";
import handler from "../libs/handler-lib";
import { submitAny } from "./submitAny";
import { defaultFormConfig, defaultWaiverSchema } from "./defaultFormConfig";
import { waiverRenewalB4, waiverRenewalB } from "cmscommonlib";
import { waiverAuthorityB4, waiverAuthorityB } from "cmscommonlib";

const waiverRenewalFormConfig = {
  ...defaultFormConfig,
  appendToSchema: {
    ...defaultWaiverSchema,
    parentId: Joi.string().required(),
  },
};

export const waiverRenewalB4FormConifg = {
  ...waiverRenewalFormConfig,
  ...waiverRenewalB4,
};

export const waiverRenewalBFormConifg = {
  ...waiverRenewalFormConfig,
  ...waiverRenewalB,
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
    formConfig = waiverRenewalB4FormConifg;
  } else if (data.waiverAuthority === waiverAuthorityB.value) {
    formConfig = waiverRenewalBFormConifg;
  } else {
    throw new Error("Waiver Authority not found");
  }
  return await submitAny(event, formConfig);
});
