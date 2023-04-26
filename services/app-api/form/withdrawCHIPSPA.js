import { chipSPAWithdraw } from "cmscommonlib";
import handler from "../libs/handler-lib";
import { submitAny } from "./submitAny";
import { defaultWithdrawConfig } from "./defaultFormConfig";

export const withdrawCHIPSPAFormConfig = {
  ...defaultWithdrawConfig,
  ...chipSPAWithdraw,
  CMSToAddresses: [process.env.reviewerCHIPEmail],
  CMSCcAddresses: process.env.chipCcEmail?.split(";")?.filter((s) => s.trim()),
};

export const main = handler(async (event) =>
  submitAny(event, withdrawCHIPSPAFormConfig)
);
