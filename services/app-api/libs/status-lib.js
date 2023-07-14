import { Workflow } from "cmscommonlib";

/*  from packagelist to know what the "clean" statuses are
const initialStatuses = [
  Workflow.ONEMAC_STATUS.UNSUBMITTED,
  Workflow.ONEMAC_STATUS.SUBMITTED,
  Workflow.ONEMAC_STATUS.PENDING,
  Workflow.ONEMAC_STATUS.RAI_ISSUED,
  Workflow.ONEMAC_STATUS.APPROVED,
  Workflow.ONEMAC_STATUS.DISAPPROVED,
  Workflow.ONEMAC_STATUS.WITHDRAWN,
  Workflow.ONEMAC_STATUS.TERMINATED,
  Workflow.ONEMAC_STATUS.PAUSED,
  Workflow.ONEMAC_STATUS.UNKNOWN,
];
*/

export const cmsStatusUIMap = {
  [Workflow.ONEMAC_STATUS.SUBMITTED]: "Submitted - Intake Needed",
  [Workflow.ONEMAC_STATUS.INACTIVATED]: "Inactivated",
  [Workflow.ONEMAC_STATUS.PENDING]: "Pending",
  [Workflow.ONEMAC_STATUS.PENDING_CONCURRENCE]: "Pending - Concurrence",
  [Workflow.ONEMAC_STATUS.PENDING_APPROVAL]: "Pending - Approval",
  [Workflow.ONEMAC_STATUS.RAI_ISSUED]: "Pending - RAI",
  [Workflow.ONEMAC_STATUS.APPROVED]: "Approved",
  [Workflow.ONEMAC_STATUS.DISAPPROVED]: "Disapproved",
  [Workflow.ONEMAC_STATUS.WITHDRAW_RAI_ENABLED]:
    "RAI Response Withdraw Enabled",
  [Workflow.ONEMAC_STATUS.WITHDRAW_RAI_REQUESTED]:
    "Formal RAI Response - Withdrawal Requested",
  [Workflow.ONEMAC_STATUS.WITHDRAWAL_REQUESTED]: "Submitted - Intake Needed",
  [Workflow.ONEMAC_STATUS.TE_REQUESTED]: "Requested",
  [Workflow.ONEMAC_STATUS.WITHDRAWN]: "Package Withdrawn",
  [Workflow.ONEMAC_STATUS.TERMINATED]: "Waiver Terminated",
  [Workflow.ONEMAC_STATUS.UNKNOWN]: "-- --",
};

export const stateStatusUIMap = {
  [Workflow.ONEMAC_STATUS.SUBMITTED]: "Submitted",
  [Workflow.ONEMAC_STATUS.INACTIVATED]: "Inactivated",
  [Workflow.ONEMAC_STATUS.PENDING]: "Under Review",
  [Workflow.ONEMAC_STATUS.PENDING_CONCURRENCE]: "Under Review",
  [Workflow.ONEMAC_STATUS.PENDING_APPROVAL]: "Under Review",
  [Workflow.ONEMAC_STATUS.RAI_ISSUED]: "RAI Issued",
  [Workflow.ONEMAC_STATUS.APPROVED]: "Approved",
  [Workflow.ONEMAC_STATUS.DISAPPROVED]: "Disapproved",
  [Workflow.ONEMAC_STATUS.WITHDRAWAL_REQUESTED]: "Withdrawal Requested",
  [Workflow.ONEMAC_STATUS.WITHDRAW_RAI_ENABLED]:
    "RAI Response Withdraw Enabled",
  [Workflow.ONEMAC_STATUS.WITHDRAW_RAI_REQUESTED]:
    "Formal RAI Response - Withdrawal Requested",
  [Workflow.ONEMAC_STATUS.TE_REQUESTED]: "Submitted",
  [Workflow.ONEMAC_STATUS.WITHDRAWN]: "Package Withdrawn",
  [Workflow.ONEMAC_STATUS.TERMINATED]: "Waiver Terminated",
  [Workflow.ONEMAC_STATUS.UNKNOWN]: "-- --",
};
