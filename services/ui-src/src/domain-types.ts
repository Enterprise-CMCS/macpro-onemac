import { USER_STATUS, USER_ROLE, RoleEntry } from "cmscommonlib";
import { DialogSize } from "@cmsgov/design-system/dist/types/Dialog/Dialog";

export type UserProfile = {
  cmsRoles: string;
  email: string;
  firstName: string;
  lastName: string;
  userData: UserRecord;
};

export type UserRecord = {
  roleList: RoleEntry[];
  validRoutes?: string[];
  phoneNumber?: string;
  fullName: string;
  effRole?: string;
  effStatus?: string;
};

export type AccessHistoryEvent = {
  date: number;
  status: string;
};

export type StateAccessAttribute = {
  stateCode: string;
  history: AccessHistoryEvent[];
};

export type AppContextValue = {
  isAuthenticating: boolean;
  isAuthenticated: boolean;
  isLoggedInAsDeveloper: boolean;
  userProfile: Partial<UserProfile>;
  userRole: USER_ROLE | null;
  userStatus: USER_STATUS | null;
  activeTerritories: string[] | null;
  setUserInfo: (isDeveloper?: boolean) => Promise<void>;
  updatePhoneNumber: (phoneNumber: string) => Promise<void>;
  useConfirmationDialog: (
    heading: string,
    acceptText: string,
    cancelText: string,
    message: string,
    onAccept?: any,
    onDeny?: any
  ) => Promise<void>;
};

export type PackageRowValue = {
  componentId: string;
  componentType: string;
  expirationTimestamp?: number;
  ninetiethDay?: number;
  packageStatus: string;
  submissionTimestamp: number;
  submitter: string;
  territory: string;
};

export type LocationState = {
  passCode?: string;
};
