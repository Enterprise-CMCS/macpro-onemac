import { withdrawRAIResponse, RESPONSE_CODE, Workflow } from "cmscommonlib";
import handler from "../libs/handler-lib";
import { submitAny } from "./submitAny";
import { defaultWithdrawConfig } from "./defaultFormConfig";

export const withdrawRAIFormConfig = {
  ...defaultWithdrawConfig,
  ...withdrawRAIResponse,
  successResponseCode: RESPONSE_CODE.WITHDRAW_RAI_REQUESTED,
  newStatus: Workflow.ONEMAC_STATUS.WITHDRAW_RAI_REQUESTED,
};

export const main = handler(async (event) =>
  submitAny(event, withdrawRAIFormConfig)
);
