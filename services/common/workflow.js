import { chipSPA } from "./type/chipSPA.js";
import { chipSPARAIResponse } from "./type/chipSPARAIResponse.js";
import { initialWaiver } from "./type/initialWaiver.js";
import { medicaidSPA } from "./type/medicaidSPA.js";
import { medicaidSPARAIResponse } from "./type/medicaidSPARAIResponse.js";
import { waiverAmendment } from "./type/waiverAmendment.js";
import { waiverAppendixK } from "./type/waiverAppendixK.js";
import { waiverRAIResponse } from "./type/waiverRAIResponse.js";
import { waiverRenewal } from "./type/waiverRenewal.js";
import { waiverTemporaryExtension } from "./type/waiverTemporaryExtension.js";

export const ONEMAC_TYPE = {
  CHIP_SPA: chipSPA.componentType,
  CHIP_SPA_RAI: chipSPARAIResponse.componentType,
  MEDICAID_SPA: medicaidSPA.componentType,
  MEDICAID_SPA_RAI: medicaidSPARAIResponse.componentType,
  WAIVER: "waiver",
  WAIVER_INITIAL: initialWaiver.componentType,
  WAIVER_AMENDMENT: waiverAmendment.componentType,
  WAIVER_RENEWAL: waiverRenewal.componentType,
  WAIVER_RAI: waiverRAIResponse.componentType,
  WAIVER_EXTENSION: waiverTemporaryExtension.componentType,
  WAIVER_APP_K: waiverAppendixK.componentType,
};

export const ONEMAC_LABEL = {
  [ONEMAC_TYPE.CHIP_SPA]: chipSPA.typeLabel,
  [ONEMAC_TYPE.MEDICAID_SPA]: medicaidSPA.typeLabel,
  [ONEMAC_TYPE.WAIVER_INITIAL]: initialWaiver.typeLabel,
  [ONEMAC_TYPE.WAIVER_RENEWAL]: waiverRenewal.typeLabel,
  [ONEMAC_TYPE.WAIVER_APP_K]: waiverAppendixK.typeLabel,
  [ONEMAC_TYPE.WAIVER_EXTENSION]: waiverTemporaryExtension.typeLabel,
  [ONEMAC_TYPE.WAIVER_AMENDMENT]: waiverAmendment.typeLabel,
  [ONEMAC_TYPE.WAIVER_RAI]: waiverRAIResponse.typeLabel,
};

import { ONEMAC_STATUS } from "./lib/onemacStatus.js";
export { ONEMAC_STATUS } from "./lib/onemacStatus.js";

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
