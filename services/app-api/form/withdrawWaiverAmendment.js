import { waiverAmendmentWithdraw } from "cmscommonlib";
import handler from "../libs/handler-lib";
import { submitAny } from "./submitAny";
import { defaultWithdrawConfig } from "./defaultFormConfig";
import { disableRaiResponseWithdraw } from "./disableRaiWithdraw";

export const withdrawWaiverAmendmentFormConfig = {
  ...defaultWithdrawConfig,
  ...waiverAmendmentWithdraw,
};

export const main = handler(async (event) => {
  const lambdaReturn = await submitAny(
    event,
    withdrawWaiverAmendmentFormConfig
  );
  await disableRaiResponseWithdraw(event, "withdrawLambda");
  return lambdaReturn;
});
