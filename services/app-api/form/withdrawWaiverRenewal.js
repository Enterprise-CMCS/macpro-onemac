import { waiverRenewalWithdraw } from "cmscommonlib";
import handler from "../libs/handler-lib";
import { submitAny } from "./submitAny";
import { defaultWithdrawConfig } from "./defaultFormConfig";

export const withdrawWaiverRenewalFormConfig = {
  ...defaultWithdrawConfig,
  ...waiverRenewalWithdraw,
};

export const main = handler(async (event) =>
  submitAny(event, withdrawWaiverRenewalFormConfig)
);
