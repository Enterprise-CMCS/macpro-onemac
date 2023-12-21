import { medicaidSPAWithdraw } from "cmscommonlib";
import handler from "../libs/handler-lib";
import { submitAny } from "./submitAny";
import { defaultWithdrawConfig } from "./defaultFormConfig";
import { disableRaiResponseWithdraw } from "./disableRaiWithdraw";

export const withdrawMedicaidSPAFormConfig = {
  ...defaultWithdrawConfig,
  ...medicaidSPAWithdraw,
};

export const main = handler(async (event) => {
  const lambdaReturn = await submitAny(event, withdrawMedicaidSPAFormConfig);
  await disableRaiResponseWithdraw(event, "withdrawLambda");
  return lambdaReturn;
});
