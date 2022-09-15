export const ONEMAC_TYPE = {
  CHIP_SPA: "chipspa",
  CHIP_SPA_RAI: "chipsparai",
  MEDICAID_SPA: "medicaidspa",
  MEDICAID_SPA_RAI: "medicaidsparai",
  WAIVER: "waiver",
  WAIVER_INITIAL: "waivernew",
  WAIVER_AMENDMENT: "waiveramendment",
  WAIVER_RENEWAL: "waiverrenewal",
  WAIVER_RAI: "waiverrai",
  WAIVER_EXTENSION: "waiverextension",
  WAIVER_APP_K: "waiverappk",
  WAIVER_APP_K_RAI: "waiverappkrai",
};

export const ONEMAC_LABEL = {
  [ONEMAC_TYPE.CHIP_SPA]: "CHIP SPA",
  [ONEMAC_TYPE.MEDICAID_SPA]: "Medicaid SPA",
  [ONEMAC_TYPE.WAIVER_INITIAL]: "1915(b) Initial Waiver",
  [ONEMAC_TYPE.WAIVER_RENEWAL]: "1915(b) Waiver Renewal",
  [ONEMAC_TYPE.WAIVER_APP_K]: "1915(c) Appendix K Amendment",
  [ONEMAC_TYPE.WAIVER_EXTENSION]: "1915(b) Temporary Extension",
  [ONEMAC_TYPE.WAIVER_AMENDMENT]: "1915(b) Waiver Amendment",
  [ONEMAC_TYPE.WAIVER_RAI]: "1915(b) RAI Response",
};

export const ONEMAC_STATUS = {
  INACTIVATED: "Inactivated",
  UNSUBMITTED: "Unsubmitted",
  SUBMITTED: "Submitted",
  IN_REVIEW: "In Review",
  RAI_ISSUED: "RAI Issued",
  APPROVED: "Approved",
  DISAPPROVED: "Disapproved",
  WITHDRAWN: "Withdrawn",
  TERMINATED: "Terminated",
  PAUSED: "Review Paused, Off the Clock",
};

export const PACKAGE_ACTION = {
  RESPOND_TO_RAI: "Respond to RAI",
  WITHDRAW: "Withdraw",
  REQUEST_TEMPORARY_EXTENSION: "Request a Temporary Extension",
};

export const PACKAGE_GROUP = {
  SPA: "spa",
  WAIVER: "waiver",
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

export const initialWaiverActionsByStatus = {
  ...defaultActionsByStatus,
  [ONEMAC_STATUS.APPROVED]: [PACKAGE_ACTION.REQUEST_TEMPORARY_EXTENSION],
};

export const waiverExtensionActionsByStatus = {
  ...defaultActionsByStatus,
  [ONEMAC_STATUS.RAI_ISSUED]: [PACKAGE_ACTION.WITHDRAW],
  [ONEMAC_STATUS.PAUSED]: [PACKAGE_ACTION.WITHDRAW],
};

export const raiActionsByStatus = {
  ...defaultActionsByStatus,
  [ONEMAC_STATUS.SUBMITTED]: [],
  [ONEMAC_STATUS.IN_REVIEW]: [],
  [ONEMAC_STATUS.RAI_ISSUED]: [],
};

export const ACTIONS = {
  [ONEMAC_TYPE.CHIP_SPA]: defaultActionsByStatus,
  [ONEMAC_TYPE.CHIP_SPA_RAI]: raiActionsByStatus,
  [ONEMAC_TYPE.MEDICAID_SPA]: defaultActionsByStatus,
  [ONEMAC_TYPE.MEDICAID_SPA_RAI]: raiActionsByStatus,
  [ONEMAC_TYPE.WAIVER]: initialWaiverActionsByStatus,
  [ONEMAC_TYPE.WAIVER_RAI]: raiActionsByStatus,
  [ONEMAC_TYPE.WAIVER_INITIAL]: initialWaiverActionsByStatus,
  [ONEMAC_TYPE.WAIVER_RENEWAL]: defaultActionsByStatus,
  [ONEMAC_TYPE.WAIVER_AMENDMENT]: defaultActionsByStatus,
  [ONEMAC_TYPE.WAIVER_EXTENSION]: waiverExtensionActionsByStatus,
  [ONEMAC_TYPE.WAIVER_APP_K]: defaultActionsByStatus,
};

export const ALLOW_WAIVER_EXTENSION_TYPE = [
  ONEMAC_TYPE.WAIVER_INITIAL,
  ONEMAC_TYPE.WAIVER_RENEWAL,
];

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
