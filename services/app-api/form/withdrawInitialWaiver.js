import { initialWaiverWithdraw } from "cmscommonlib";
import handler from "../libs/handler-lib";
import { submitAny } from "./submitAny";
import { defaultWithdrawConfig } from "./defaultFormConfig";

export const withdrawInitialWaiverFormConfig = {
  ...defaultWithdrawConfig,
  ...initialWaiverWithdraw,
};

export const main = handler(async (event) =>
  submitAny(event, withdrawInitialWaiverFormConfig)
);
