import { Workflow, RESPONSE_CODE } from "cmscommonlib";

import { CMSWithdrawalNotice } from "../email/CMSWithdrawalNotice";
import { stateWithdrawalReceipt } from "../email/stateWithdrawalReceipt";

export const defaultWithdrawConfig = {
  newStatus: Workflow.ONEMAC_STATUS.WITHDRAWAL_REQUESTED,
  successResponseCode: RESPONSE_CODE.PACKAGE_WITHDRAW_SUCCESS,
  emailFunctions: [CMSWithdrawalNotice, stateWithdrawalReceipt],
};
