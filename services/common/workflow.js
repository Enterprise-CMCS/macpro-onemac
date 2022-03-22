import { TYPE } from "./changeRequest";

export const ONEMAC_TYPE = {
  ...TYPE,
};

export const ONEMAC_LABEL = {
  [ONEMAC_TYPE.CHIP_SPA]: "CHIP SPA",
  [ONEMAC_TYPE.SPA]: "Medicaid SPA",
  [ONEMAC_TYPE.WAIVER_BASE]: "1915(b) Base Waiver",
  [ONEMAC_TYPE.WAIVER_RENEWAL]: "1915(b) Waiver Renewal",
  [ONEMAC_TYPE.WAIVER_APP_K]: "1915(c) Appendix K Amendment",
  [ONEMAC_TYPE.WAIVER_EXTENSION]: "1915(b) Temporary Extension",
  [ONEMAC_TYPE.WAIVER_AMENDMENT]: "1915(b) Amendment",
  [ONEMAC_TYPE.WAIVER_RAI]: "1915(b) RAI Response",
};

export const ONEMAC_STATUS = {
  UNSUBMITTED: "Unsubmitted",
  SUBMITTED: "Submitted",
  IN_REVIEW: "Package In Review",
  RAI_ISSUED: "RAI Issued",
  APPROVED: "Package Approved",
  DISAPPROVED: "Package Disapproved",
  WITHDRAWN: "Withdrawn",
  TERMINATED: "Waiver Terminated",
  PAUSED: "Review Paused, Off the Clock",
};

export const PACKAGE_ACTION = {
  RESPOND_TO_RAI: "Respond to RAI",
  WITHDRAW: "Withdraw",
};

export const PACKAGE_GROUP = {
  SPA: "spa",
  WAIVER: "waiver",
};

export const MY_PACKAGE_GROUP = {
  [ONEMAC_TYPE.CHIP_SPA]: PACKAGE_GROUP.SPA,
  [ONEMAC_TYPE.CHIP_SPA_RAI]: PACKAGE_GROUP.SPA,
  [ONEMAC_TYPE.SPA]: PACKAGE_GROUP.SPA,
  [ONEMAC_TYPE.SPA_RAI]: PACKAGE_GROUP.SPA,
  [ONEMAC_TYPE.WAIVER]: PACKAGE_GROUP.WAIVER,
  [ONEMAC_TYPE.WAIVER_RAI]: PACKAGE_GROUP.WAIVER,
  [ONEMAC_TYPE.WAIVER_BASE]: PACKAGE_GROUP.WAIVER,
  [ONEMAC_TYPE.WAIVER_RENEWAL]: PACKAGE_GROUP.WAIVER,
  [ONEMAC_TYPE.WAIVER_AMENDMENT]: PACKAGE_GROUP.WAIVER,
  [ONEMAC_TYPE.WAIVER_EXTENSION]: PACKAGE_GROUP.WAIVER,
  [ONEMAC_TYPE.WAIVER_APP_K]: PACKAGE_GROUP.WAIVER,
};

export const defaultActionsByStatus = {
  [ONEMAC_STATUS.UNSUBMITTED]: [],
  [ONEMAC_STATUS.SUBMITTED]: [PACKAGE_ACTION.WITHDRAW],
  [ONEMAC_STATUS.IN_REVIEW]: [PACKAGE_ACTION.WITHDRAW],
  [ONEMAC_STATUS.RAI_ISSUED]: [
    PACKAGE_ACTION.WITHDRAW,
    PACKAGE_ACTION.RESPOND_TO_RAI,
  ],
  [ONEMAC_STATUS.APPROVED]: [],
  [ONEMAC_STATUS.DISAPPROVED]: [],
  [ONEMAC_STATUS.WITHDRAWN]: [],
  [ONEMAC_STATUS.TERMINATED]: [],
};

export const raiActionsByStatus = {
  [ONEMAC_STATUS.UNSUBMITTED]: [],
  [ONEMAC_STATUS.SUBMITTED]: [],
  [ONEMAC_STATUS.IN_REVIEW]: [],
  [ONEMAC_STATUS.RAI_ISSUED]: [],
  [ONEMAC_STATUS.APPROVED]: [],
  [ONEMAC_STATUS.DISAPPROVED]: [],
  [ONEMAC_STATUS.WITHDRAWN]: [],
  [ONEMAC_STATUS.TERMINATED]: [],
};

export const ACTIONS = {
  [ONEMAC_TYPE.CHIP_SPA]: defaultActionsByStatus,
  [ONEMAC_TYPE.CHIP_SPA_RAI]: raiActionsByStatus,
  [ONEMAC_TYPE.SPA]: defaultActionsByStatus,
  [ONEMAC_TYPE.SPA_RAI]: raiActionsByStatus,
  [ONEMAC_TYPE.WAIVER]: defaultActionsByStatus,
  [ONEMAC_TYPE.WAIVER_RAI]: raiActionsByStatus,
  [ONEMAC_TYPE.WAIVER_BASE]: defaultActionsByStatus,
  [ONEMAC_TYPE.WAIVER_RENEWAL]: defaultActionsByStatus,
  [ONEMAC_TYPE.WAIVER_AMENDMENT]: defaultActionsByStatus,
  [ONEMAC_TYPE.WAIVER_EXTENSION]: defaultActionsByStatus,
  [ONEMAC_TYPE.WAIVER_APP_K]: defaultActionsByStatus,
};

export const NINETY_DAY_STATUS = {
  PENDING: "Pending",
  CLOCK_STOPPED: "Clock Stopped",
  NA: "N/A",
};

export const get90thDayText = (currentStatus, clockEndTimestamp) => {
  switch (currentStatus) {
    case ONEMAC_STATUS.RAI_ISSUED:
      return NINETY_DAY_STATUS.CLOCK_STOPPED;
    case ONEMAC_STATUS.APPROVED:
    case ONEMAC_STATUS.DISAPPROVED:
    case ONEMAC_STATUS.TERMINATED:
    case ONEMAC_STATUS.WITHDRAWN:
      return NINETY_DAY_STATUS.NA;
    case ONEMAC_STATUS.SUBMITTED:
    case ONEMAC_STATUS.UNSUBMITTED:
    case ONEMAC_STATUS.IN_REVIEW:
      return NINETY_DAY_STATUS.PENDING;
    default:
      return clockEndTimestamp;
  }
};
