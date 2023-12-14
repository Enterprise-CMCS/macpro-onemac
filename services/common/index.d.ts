export const RESPONSE_CODE: Record<string, string>;
export const FORM_SUCCESS_RESPONSE_CODES: string[];
export {
  ROUTES,
  ONEMAC_ROUTES,
  TYPE_TO_DETAIL_ROUTE,
  FAQ_TARGET,
} from "./routes.js";

export const approvedBlueWarningMessage: string;

export enum USER_STATUS {
  ACTIVE = "active",
  PENDING = "pending",
  DENIED = "denied",
  REVOKED = "revoked",
}
export enum USER_ROLE {
  DEFAULT_CMS_USER = "defaultcmsuser",
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
  canSeeSubjectAndDescription: boolean;
  canAccessMetrics: boolean;
  canAccessUserManagement: boolean;
  canDownloadCsv: boolean;
  canAccessAdminTools: boolean;
  isCMSUser: boolean;
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

export namespace Workflow {
  export enum PACKAGE_ACTION {
    RESPOND_TO_RAI = "Respond to RAI",
    WITHDRAW = "Withdraw Package",
    REQUEST_TEMPORARY_EXTENSION = "Request a Temporary Extension",
    ADD_AMENDMENT = "Add Amendment",
    ENABLE_RAI_WITHDRAWAL = "Enable Formal RAI Response Withdraw",
    DISABLE_RAI_WITHDRAWAL = "Disable Formal RAI Response Withdraw",
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

  export const defaultActions: Record<string, PACKAGE_ACTION[]>;
  export const initialWaiverActions: Record<string, PACKAGE_ACTION[]>;
  export const renewalWaiverActions: Record<string, PACKAGE_ACTION[]>;
  export const waiverExtensionActions: Record<string, PACKAGE_ACTION[]>;
  export const get90thDayText: (
    currentStatus: string,
    clockEndTimestamp: date
  ) => string;
  export const getActionsForPackage: (
    packageType: string,
    packageStatus: string,
    hasRaiResponse: boolean,
    userRole: UserRole,
    formSource: string
  ) => PACKAGE_ACTION[];
}

export * as Validate from "./idValidation.js";
//export * as Workflow from "./workflow.js";

export { waiverAuthorityB4, waiverAuthorityB } from "./type/waiverAuthority.js";
export {
  initialWaiver,
  initialWaiverB4,
  initialWaiverB,
} from "./type/initialWaiver.js";
export { initialWaiverWithdraw } from "./type/initialWaiverWithdraw.js";
export {
  waiverTemporaryExtension,
  waiverTemporaryExtension1915b,
  waiverTemporaryExtension1915c,
} from "./type/waiverTemporaryExtension.js";
export {
  waiverRenewal,
  waiverRenewalB4,
  waiverRenewalB,
} from "./type/waiverRenewal.js";
export { waiverRenewalWithdraw } from "./type/waiverRenewalWithdraw.js";
export {
  waiverAmendment,
  waiverAmendmentB4,
  waiverAmendmentB,
} from "./type/waiverAmendment.js";
export { waiverAmendmentWithdraw } from "./type/waiverAmendmentWithdraw.js";
export { waiverAppendixK } from "./type/waiverAppendixK.js";
export { waiverAppendixKRAIResponse } from "./type/waiverAppendixKRAIResponse.js";
export { waiverAppendixKWithdraw } from "./type/waiverAppendixKWithdraw.js";
export { waiverRAIResponse } from "./type/waiverRAIResponse.js";
export { medicaidSPA } from "./type/medicaidSPA.js";
export { medicaidSPARAIResponse } from "./type/medicaidSPARAIResponse.js";
export { medicaidSPAWithdraw } from "./type/medicaidSPAWithdraw.js";
export { chipSPA } from "./type/chipSPA.js";
export { chipSPARAIResponse } from "./type/chipSPARAIResponse.js";
export { chipSPAWithdraw } from "./type/chipSPAWithdraw.js";
export { enableRaiWithdraw } from "./type/enableRaiWithdraw.js";
export { disableRaiWithdraw } from "./type/disableRaiWithdraw.js";
export { withdrawRAIResponse } from "./type/withdrawRAIResponse.js";
