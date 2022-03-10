export const RESPONSE_CODE: Record<string, string>;
export const ROUTES: Record<string, string>;
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

export namespace ChangeRequest {
  type TransmittalNumberInfo = {
    idLabel: string;
    idRegex: string;
    idFormat: string;
    idHintText: string;
    idFAQLink: string;
    idExistValidations: {
      existenceRegex?: RegExp;
      idMustExist?: boolean;
      errorLevel: string;
    }[];
  };

  type WaiverFormInfo = {
    actionType: { optionsList: SelectOption[] };
    waiverAuthority: { optionsList: SelectOption[] };
    newTransmittalNumber: TransmittalNumberInfo;
    amendmentTransmittalNumber: TransmittalNumberInfo;
    renewalTransmittalNumber: TransmittalNumberInfo;
  };

  export enum PACKAGE_ACTION {
    RESPOND_TO_RAI = "Respond to RAI",
    WITHDRAW = "Withdraw",
  }

  export type FormInfo = {
    pageTitle: string;
    subheaderMessage?: { __html: string };
    detailsHeader?: string;
    transmittalNumber: TransmittalNumberInfo;
    requiredUploads: unknown;
    optionalUploads: unknown;
    actionsByStatus: Record<string, PACKAGE_ACTION[]>;
    raiLink: string;
  } & Partial<WaiverFormInfo>;

  export const CONFIG: Record<string, FormInfo>;
  export const ONEMAC_STATUS: Record<string, string>;
  export const TYPE: Record<string, string>;
  export const MY_PACKAGE_GROUP: Record<string, string>;
  export enum PACKAGE_GROUP {
    SPA = "spa",
    WAIVER = "waiver",
  }

  export const defaultActionsByStatus: Record<string, PACKAGE_ACTION[]>;
}
