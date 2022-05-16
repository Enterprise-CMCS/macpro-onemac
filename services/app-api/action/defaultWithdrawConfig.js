import { Workflow, RESPONSE_CODE } from "cmscommonlib";

export const defaultWithdrawConfig = {
  newStatus: Workflow.ONEMAC_STATUS.WITHDRAWN,
  successResponseCode: RESPONSE_CODE.PACKAGE_WITHDRAW_SUCCESS,
};
