import { chipSPAWithdraw } from "cmscommonlib";
import handler from "../libs/handler-lib";
import { submitAny } from "./submitAny";
import { defaultWithdrawConfig } from "./defaultFormConfig";
import { disableRaiResponseWithdraw } from "./disableRaiWithdraw";

export const withdrawCHIPSPAFormConfig = {
  ...defaultWithdrawConfig,
  ...chipSPAWithdraw,
};

export const main = handler(async (event) => {
  const lambdaReturn = await submitAny(event, withdrawCHIPSPAFormConfig);
  await disableRaiResponseWithdraw(event, "withdrawLambda");
  return lambdaReturn;
});
