import { waiverAmendmentWithdraw } from "cmscommonlib";
import handler from "../libs/handler-lib";
import { submitAny } from "./submitAny";
import { defaultWithdrawConfig } from "./defaultFormConfig";

export const withdrawWaiverAmendmentFormConfig = {
  ...defaultWithdrawConfig,
  ...waiverAmendmentWithdraw,
};

export const main = handler(async (event) =>
  submitAny(event, withdrawWaiverAmendmentFormConfig)
);
