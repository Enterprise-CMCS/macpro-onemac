import { initialWaiverWithdraw } from "cmscommonlib";
import handler from "../libs/handler-lib";
import { submitAny } from "./submitAny";
import { defaultWithdrawConfig } from "./defaultFormConfig";
import { disableRaiResponseWithdraw } from "./disableRaiWithdraw";

export const withdrawInitialWaiverFormConfig = {
  ...defaultWithdrawConfig,
  ...initialWaiverWithdraw,
};

export const main = handler(async (event) => {
  const lambdaReturn = await submitAny(event, withdrawInitialWaiverFormConfig);
  await disableRaiResponseWithdraw(event, "withdrawLambda");
  return lambdaReturn;
});
