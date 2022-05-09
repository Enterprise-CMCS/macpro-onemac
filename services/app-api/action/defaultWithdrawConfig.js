import { Workflow } from "cmscommonlib";

export const defaultWithdrawConfig = {
  idLabel: "Default ID",
  newStatus: Workflow.ONEMAC_STATUS.WITHDRAWN,
  validateSubmission: (data) => {
    if (data) return true;
    return null;
  },
};
