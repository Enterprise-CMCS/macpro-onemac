export type UserProfile = {
  cmsRoles: string;
  email: string;
  firstName: string;
  lastName: string;
  userData: UserRecord;
};

export type UserRecord = {
  type: string;
  attributes: StateAccessAttribute[] | AccessHistoryEvent[];
  validRoutes?: string[];
  phoneNumber?: string;
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
  isValidRoute: boolean;
  userProfile: Partial<UserProfile> | null;
  userStatus: string | null;
  setUserInfo: (isDeveloper?: boolean) => Promise<void>;
  updatePhoneNumber: (phoneNumber: string) => Promise<void>;
};
