import { waiverAppendixKWithdraw } from "cmscommonlib";
import handler from "../libs/handler-lib";
import { submitAny } from "./submitAny";
import { defaultWithdrawConfig } from "./defaultFormConfig";
import { disableRaiResponseWithdraw } from "./disableRaiWithdraw";

export const withdrawWaiverAppendixKFormConfig = {
  ...defaultWithdrawConfig,
  ...waiverAppendixKWithdraw,
};

export const main = handler(async (event) => {
  const lambdaReturn = await submitAny(
    event,
    withdrawWaiverAppendixKFormConfig
  );
  await disableRaiResponseWithdraw(event, "withdrawLambda");
  return lambdaReturn;
});
