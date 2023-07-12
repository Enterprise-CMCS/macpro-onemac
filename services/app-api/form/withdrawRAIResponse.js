import { withdrawRAIResponse, RESPONSE_CODE } from "cmscommonlib";
import handler from "../libs/handler-lib";
import { submitAny } from "./submitAny";
import { defaultWithdrawConfig } from "./defaultFormConfig";

export const withdrawRAIFormConfig = {
  ...defaultWithdrawConfig,
  successResponseCode: RESPONSE_CODE.WITHDRAW_RAI_REQUESTED,
  ...withdrawRAIResponse,
};

export const main = handler(async (event) =>
  submitAny(event, withdrawRAIFormConfig)
);
