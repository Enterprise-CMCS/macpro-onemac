export const ONEMAC_TYPE = {
  CHIP_SPA: "chipspa",
  CHIP_SPA_RAI: "chipsparai",
  CHIP_SPA_WITHDRAW: "chipspawithdraw",
  CHIP_SPA_SUBSEQUENT_SUBMISSION: "chipspasubsequent",
  MEDICAID_SPA: "medicaidspa",
  MEDICAID_SPA_RAI: "medicaidsparai",
  MEDICAID_SPA_WITHDRAW: "medicaidspawithdraw",
  MEDICAID_SPA_SUBSEQUENT_SUBMISSION: "medicaidspasubsequent",
  WAIVER: "waiver",
  WAIVER_INITIAL: "waivernew",
  WAIVER_INITIAL_WITHDRAW: "waivernewwithdraw",
  WAIVER_INITIAL_SUBSEQUENT_SUBMISSION: "waivernewsubsequent",
  WAIVER_AMENDMENT: "waiveramendment",
  WAIVER_AMENDMENT_WITHDRAW: "waiveramendmentwithdraw",
  WAIVER_AMENDMENT_SUBSEQUENT_SUBMISSION: "waiveramendmentsubsequent",
  WAIVER_RENEWAL: "waiverrenewal",
  WAIVER_RENEWAL_WITHDRAW: "waiverrenewalwithdraw",
  WAIVER_RENEWAL_SUBSEQUENT_SUBMISSION: "waiverrenewalsubsequent",
  WAIVER_RAI: "waiverrai",
  WAIVER_EXTENSION: "waiverextension",
  WAIVER_EXTENSION_B: "waiverextensionb",
  WAIVER_EXTENSION_C: "waiverextensionc",
  WAIVER_APP_K: "waiverappk",
  WAIVER_APP_K_RAI: "waiverappkrai",
  WAIVER_APP_K_WITHDRAW: "waiverappkwithdraw",
  WAIVER_APP_K_SUBSEQUENT_SUBMISSION: "waiverappksubsequent",
  ENABLE_RAI_WITHDRAW: "enableraiwithdraw",
  RAI_RESPONSE_WITHDRAW: "rairesponsewithdraw",
};

export const ONEMAC_LABEL = {
  [ONEMAC_TYPE.CHIP_SPA]: "CHIP SPA",
  [ONEMAC_TYPE.MEDICAID_SPA]: "Medicaid SPA",
  [ONEMAC_TYPE.WAIVER_INITIAL]: "1915(b) Initial Waiver",
  [ONEMAC_TYPE.WAIVER_RENEWAL]: "1915(b) Waiver Renewal",
  [ONEMAC_TYPE.WAIVER_APP_K]: "1915(c) Appendix K Amendment",
  [ONEMAC_TYPE.WAIVER_EXTENSION]: "Temporary Extension",
  [ONEMAC_TYPE.WAIVER_EXTENSION_B]: "1915(b) Temporary Extension",
  [ONEMAC_TYPE.WAIVER_EXTENSION_C]: "1915(c) Temporary Extension",
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
  WITHDRAW_RAI_ENABLED: "RAI Response Withdraw Enabled",
  WITHDRAW_RAI_REQUESTED: "Formal RAI Response - Withdrawal Requested",
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
  WITHDRAW_RAI: "Withdraw Formal RAI Response",
  REQUEST_TEMPORARY_EXTENSION: "Request a Temporary Extension",
  ADD_AMENDMENT: "Add Amendment",
  ENABLE_RAI_WITHDRAWAL: "Enable Formal RAI Response Withdraw",
  SUBSEQUENT_SUBMISSION: "Upload Subsequent Documents",
};

export const PACKAGE_GROUP = {
  SPA: "spa",
  WAIVER: "waiver",
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
