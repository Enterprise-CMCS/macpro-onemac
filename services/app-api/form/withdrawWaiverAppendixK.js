import { waiverAppendixKWithdraw } from "cmscommonlib";
import handler from "../libs/handler-lib";
import { submitAny } from "./submitAny";
import { defaultWithdrawConfig } from "./defaultFormConfig";

export const withdrawWaiverAppendixKFormConfig = {
  ...defaultWithdrawConfig,
  ...waiverAppendixKWithdraw,
};

export const main = handler(async (event) =>
  submitAny(event, withdrawWaiverAppendixKFormConfig)
);
