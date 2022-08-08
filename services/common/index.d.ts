export const RESPONSE_CODE: Record<string, string>;
export { ROUTES, ONEMAC_ROUTES, TYPE_TO_DETAIL_ROUTE } from "./routes.js";

export const approvedBlueWarningMessage: string;
export enum USER_STATUS {
  ACTIVE = "active",
  PENDING = "pending",
  DENIED = "denied",
  REVOKED = "revoked",
}
export enum USER_ROLE {
  STATE_SUBMITTER = "statesubmitter",
  CMS_REVIEWER = "cmsreviewer",
  STATE_SYSTEM_ADMIN = "statesystemadmin",
  CMS_ROLE_APPROVER = "cmsroleapprover",
  SYSTEM_ADMIN = "systemadmin",
  HELPDESK = "helpdesk",
}

export interface FieldHint {
  text: string;
  className?: string;
}

export class UserRole {
  canAccessDashboard: boolean;
  canAccessForms: boolean;
  canAccessMetrics: boolean;
  canAccessUserManagement: boolean;
  canDownloadCsv: boolean;
}

export type RoleEntry = {
  role: USER_ROLE;
  status: USER_STATUS;
  territory?: string;
};
export const inFlightRoleRequestForUser: (
  roleList: RoleEntry[]
) => USER_ROLE | null;

export const effectiveRoleForUser: (
  roleList: RoleEntry[]
) => [USER_ROLE, USER_STATUS] | null;

export const getUserRoleObj: (
  roleInfo: USER_ROLE | RoleEntry[] | undefined
) => UserRole;

export const getActiveTerritories: (roleList: RoleEntry[]) => string[];

export type SelectOption = { label: string; value: string };

export const territoryList: SelectOption[];

export const territoryMap: Record<string, string>;

export type FileUploadProps = {
  title: string;
  allowMultiple?: boolean;
};

export type IdValidation = {
  idMustExist: boolean;
  errorLevel: string;
  existenceAppend?: string;
  existenceRegex?: string | RegExp;
  validateParentId?: boolean;
};

export namespace ChangeRequest {
  type TransmittalNumberInfo = {
    idLabel: string;
    idRegex: string;
    idAddtionalErrorMessage?: string;
    idFormat: string;
    idFieldHint: FieldHint[];
    idFAQLink: string;
    idExistValidations: {
      existenceRegex?: RegExp;
      existenceAppend?: string;
      idMustExist?: boolean;
      errorLevel: string;
    }[];
  };
  type ParentNumberInfo = {
    idLabel: string;
    idRegex: string;
    idAddtionalErrorMessage?: string;
    idFormat: string;
    idFieldHint: FieldHint[];
    parentNotFoundMessage: string;
  };

  type WaiverFormInfo = {
    actionType: { optionsList: SelectOption[] };
    waiverAuthority: { optionsList: SelectOption[] };
    newTransmittalNumber: TransmittalNumberInfo;
    amendmentTransmittalNumber: TransmittalNumberInfo;
    renewalTransmittalNumber: TransmittalNumberInfo;
    proposedEffectiveDate: { fieldName: string };
  };

  export enum PACKAGE_ACTION {
    RESPOND_TO_RAI = "Respond to RAI",
    WITHDRAW = "Withdraw",
    REQUEST_TEMPORARY_EXTENSION = "Request a Temporary Extension",
  }

  export type FormInfo = {
    pageTitle: string;
    subheaderMessage?: { __html: string };
    detailsHeader?: string;
    parentNumber?: ParentNumberInfo;
    transmittalNumber: TransmittalNumberInfo;
    requiredUploads: unknown;
    optionalUploads: unknown;
    raiLink: string;
    overrideType?: string;
    overrideActionType?: string;
    overrideSuccessLanding?: ROUTES;
  } & Partial<WaiverFormInfo>;

  export const CONFIG: Record<string, FormInfo>;
  export const TYPE: Record<string, string>;
  export const LABEL: Record<string, string>;
}

export namespace Workflow {
  export enum PACKAGE_ACTION {
    RESPOND_TO_RAI = "Respond to RAI",
    WITHDRAW = "Withdraw",
    REQUEST_TEMPORARY_EXTENSION = "Request a Temporary Extension",
  }
  export const ONEMAC_TYPE: Record<string, string>;
  export const ONEMAC_LABEL: Record<string, string>;
  export const ONEMAC_STATUS: Record<string, string>;
  export const ALLOW_WAIVER_EXTENSION_TYPE: string[];
  export enum PACKAGE_GROUP {
    SPA = "spa",
    WAIVER = "waiver",
  }
  export enum NINETY_DAY_STATUS {
    PENDING = "Pending",
    CLOCK_STOPPED = "Clock Stopped",
    NA = "N/A",
  }

  export const defaultActionsByStatus: Record<string, PACKAGE_ACTION[]>;
  export const baseWaiverActionsByStatus: Record<string, PACKAGE_ACTION[]>;
  export const waiverExtensionActionsByStatus: Record<string, PACKAGE_ACTION[]>;
  export const get90thDayText: (
    currentStatus: string,
    clockEndTimestamp: date
  ) => string;
}

export * as Validate from "./idValidation.js";
//export * as Workflow from "./workflow.js";

export { baseWaiver } from "./type/baseWaiver";
export { waiverTemporaryExtension } from "./type/waiverTemporaryExtension.js";
export { waiverRenewal } from "./type/waiverRenewal.js";
export { waiverAmendment } from "./type/waiverAmendment.js";
export { waiverAppendixK } from "./type/waiverAppendixK.js";
export { waiverRAIResponse } from "./type/waiverRAIResponse.js";
export { medicaidSPA } from "./type/medicaidSPA.js";
export { medicaidSPARAIResponse } from "./type/medicaidSPARAIResponse.js";
export { chipSPA } from "./type/chipSPA.js";
export { chipSPARAIResponse } from "./type/chipSPARAIResponse.js";
