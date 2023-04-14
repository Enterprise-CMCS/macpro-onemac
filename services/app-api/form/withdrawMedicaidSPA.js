import { medicaidSPAWithdraw } from "cmscommonlib";
import handler from "../libs/handler-lib";
import { submitAny } from "./submitAny";
import { defaultWithdrawConfig } from "./defaultFormConfig";

export const withdrawMedicaidSPAFormConfig = {
  ...defaultWithdrawConfig,
  ...medicaidSPAWithdraw,
};

export const main = handler(async (event) =>
  submitAny(event, withdrawMedicaidSPAFormConfig)
);
