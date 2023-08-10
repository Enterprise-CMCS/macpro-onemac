import { withdrawRAIResponse, RESPONSE_CODE, Workflow } from "cmscommonlib";
import handler from "../libs/handler-lib";
import { submitAny } from "./submitAny";
import { defaultWithdrawConfig } from "./defaultFormConfig";
import { CMSWithdrawRaiNotice } from "../email/CMSWithdrawRaiNotice";
import { stateWithdrawRaiReceipt } from "../email/stateWithdrawRaiReceipt";

export const withdrawRAIFormConfig = {
  ...defaultWithdrawConfig,
  ...withdrawRAIResponse,
  buildCMSNotice: CMSWithdrawRaiNotice,
  buildStateReceipt: stateWithdrawRaiReceipt,
  successResponseCode: RESPONSE_CODE.WITHDRAW_RAI_REQUESTED,
  newStatus: Workflow.ONEMAC_STATUS.WITHDRAW_RAI_REQUESTED,
};

export const main = handler(async (event) =>
  submitAny(event, withdrawRAIFormConfig)
);
