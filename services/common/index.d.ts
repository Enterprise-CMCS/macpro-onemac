export const RESPONSE_CODE: Record<string, string>;
export const ROUTES: Record<string, string>;
export enum USER_STATUS {
  ACTIVE = "active",
  PENDING = "pending",
  DENIED = "denied",
  REVOKED = "revoked",
}
export const USER_TYPE: Record<string, string>;

export class UserRole {
  canAccessDashboard: boolean;
  canAccessUserManagement: boolean;
}

export const getUserRoleObj: (
  role: typeof USER_TYPE[keyof typeof USER_TYPE],
  isEua?: boolean
) => UserRole;
