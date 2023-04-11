export const ONEMAC_TYPE = {
  CHIP_SPA: "chipspa",
  CHIP_SPA_RAI: "chipsparai",
  CHIP_SPA_WITHDRAW: "chipspawithdraw",
  MEDICAID_SPA: "medicaidspa",
  MEDICAID_SPA_RAI: "medicaidsparai",
  MEDICAID_SPA_WITHDRAW: "medicaidspawithdraw",
  WAIVER: "waiver",
  WAIVER_INITIAL: "waivernew",
  WAIVER_INITIAL_WITHDRAW: "waivernewwithdraw",
  WAIVER_AMENDMENT: "waiveramendment",
  WAIVER_AMENDMENT_WITHDRAW: "waiveramendmentwithdraw",
  WAIVER_RENEWAL: "waiverrenewal",
  WAIVER_RENEWAL_WITHDRAW: "waiverrenewalwithdraw",
  WAIVER_RAI: "waiverrai",
  WAIVER_EXTENSION: "waiverextension",
  WAIVER_APP_K: "waiverappk",
  WAIVER_APP_K_RAI: "waiverappkrai",
  WAIVER_APP_K_WITHDRAW: "waiverappkwithdraw",
};

export const ONEMAC_LABEL = {
  [ONEMAC_TYPE.CHIP_SPA]: "CHIP SPA",
  [ONEMAC_TYPE.MEDICAID_SPA]: "Medicaid SPA",
  [ONEMAC_TYPE.WAIVER_INITIAL]: "1915(b) Initial Waiver",
  [ONEMAC_TYPE.WAIVER_RENEWAL]: "1915(b) Waiver Renewal",
  [ONEMAC_TYPE.WAIVER_APP_K]: "1915(c) Appendix K Amendment",
  [ONEMAC_TYPE.WAIVER_EXTENSION]: "Temporary Extension",
  [ONEMAC_TYPE.WAIVER_AMENDMENT]: "1915(b) Waiver Amendment",
  [ONEMAC_TYPE.WAIVER_RAI]: "1915(b) RAI Response",
};

export const ONEMAC_STATUS = {
  INACTIVATED: "Inactivated",
  SUBMITTED: "Submitted",
  PENDING: "Under Review",
  PENDING_CONCURRENCE: "Pending - Concurrence",
  PENDING_APPROVAL: "Pending - Approval",
  RAI_ISSUED: "RAI Issued",
  APPROVED: "Approved",
  DISAPPROVED: "Disapproved",
  WITHDRAWN: "Package Withdrawn",
  WITHDRAWAL_REQUESTED: "Withdrawal Requested",
  TE_REQUESTED: "TE Requested",
  TERMINATED: "Waiver Terminated",
  UNKNOWN: "-- --",
};

export const SEATOOL_STATUS = {
  PENDING: "Pending",
  PENDING_RAI: "Pending-RAI",
  APPROVED: "Approved",
  DISAPPROVED: "Disapproved",
  WITHDRAWN: "Withdrawn",
  TERMINATED: "Terminated",
  PENDING_CONCURRENCE: "Pending-Concurrence",
  UNSUBMITTED: "Unsubmitted",
  PENDING_APPROVAL: "Pending-Approval",
  UNKNOWN: "unknown",
};

export const PACKAGE_ACTION = {
  RESPOND_TO_RAI: "Respond to RAI",
  WITHDRAW: "Withdraw Package",
  REQUEST_TEMPORARY_EXTENSION: "Request a Temporary Extension",
  ADD_AMENDMENT: "Add Amendment",
};

export const PACKAGE_GROUP = {
  SPA: "spa",
  WAIVER: "waiver",
};

export const defaultActionsByStatus = {
  [ONEMAC_STATUS.INACTIVATED]: [],
  [ONEMAC_STATUS.SUBMITTED]: [],
  [ONEMAC_STATUS.PENDING]: [PACKAGE_ACTION.WITHDRAW],
  [ONEMAC_STATUS.PENDING_CONCURRENCE]: [PACKAGE_ACTION.WITHDRAW],
  [ONEMAC_STATUS.PENDING_APPROVAL]: [PACKAGE_ACTION.WITHDRAW],
  [ONEMAC_STATUS.RAI_ISSUED]: [
    PACKAGE_ACTION.WITHDRAW,
    PACKAGE_ACTION.RESPOND_TO_RAI,
  ],
  [ONEMAC_STATUS.APPROVED]: [],
  [ONEMAC_STATUS.DISAPPROVED]: [],
  [ONEMAC_STATUS.WITHDRAWAL_REQUESTED]: [],
  [ONEMAC_STATUS.WITHDRAWN]: [],
  [ONEMAC_STATUS.TERMINATED]: [],
  [ONEMAC_STATUS.UNKNOWN]: [],
};

export const initialWaiverActionsByStatus = {
  ...defaultActionsByStatus,
  [ONEMAC_STATUS.APPROVED]: [
    PACKAGE_ACTION.REQUEST_TEMPORARY_EXTENSION,
    PACKAGE_ACTION.ADD_AMENDMENT,
  ],
};

export const renewalWaiverActionsByStatus = initialWaiverActionsByStatus;

export const waiverExtensionActionsByStatus = {
  ...defaultActionsByStatus,
  [ONEMAC_STATUS.RAI_ISSUED]: [PACKAGE_ACTION.WITHDRAW],
  [ONEMAC_STATUS.PAUSED]: [PACKAGE_ACTION.WITHDRAW],
};

export const raiActionsByStatus = {
  ...defaultActionsByStatus,
  [ONEMAC_STATUS.PENDING]: [],
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
  [ONEMAC_TYPE.WAIVER_RENEWAL]: renewalWaiverActionsByStatus,
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
    case ONEMAC_STATUS.PENDING:
      return NINETY_DAY_STATUS.PENDING;
    default:
      return clockEndTimestamp;
  }
};
