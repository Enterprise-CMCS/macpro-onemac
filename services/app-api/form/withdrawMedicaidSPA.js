import { medicaidSPAWithdraw } from "cmscommonlib";
import handler from "../libs/handler-lib";
import { submitAny } from "./submitAny";
import { defaultFormConfig } from "./defaultFormConfig";
import { CMSWithdrawalNotice } from "../email/CMSWithdrawalNotice";

export const withdrawMedicaidSPAFormConfig = {
  ...defaultFormConfig,
  ...medicaidSPAWithdraw,
  buildCMSNotice: CMSWithdrawalNotice,
};

export const main = handler(async (event) =>
  submitAny(event, withdrawMedicaidSPAFormConfig)
);
