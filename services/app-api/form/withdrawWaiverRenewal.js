import { waiverRenewalWithdraw } from "cmscommonlib";
import handler from "../libs/handler-lib";
import { submitAny } from "./submitAny";
import { defaultWithdrawConfig } from "./defaultFormConfig";
import { disableRaiResponseWithdraw } from "./disableRaiWithdraw";

export const withdrawWaiverRenewalFormConfig = {
  ...defaultWithdrawConfig,
  ...waiverRenewalWithdraw,
};

export const main = handler(async (event) => {
  const lambdaReturn = await submitAny(event, withdrawWaiverRenewalFormConfig);
  await disableRaiResponseWithdraw(event, "withdrawLambda");
  return lambdaReturn;
});
