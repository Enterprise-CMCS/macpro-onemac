import { USER_STATUS } from "cmscommonlib";

export const stateSubmitterInitialAuthState = {
  isAuthenticating: false,
  isAuthenticated: true,
  isLoggedInAsDeveloper: false,
  userRole: "statesubmitter",
  userStatus: USER_STATUS.ACTIVE,
  activeTerritories: ["MI", "VA"],
  userProfile: {
    cmsRoles: "onemac-state-user",
    email: "statesubmitteractive@cms.hhs.local",
    firstName: "Unit",
    lastName: "Tester",
    userData: {
      firstName: "Unita",
      lastName: "Goodcode",
      roleList: [
        { role: "statesubmitter", status: "active", territory: "MI" },
        { role: "statesubmitter", status: "active", territory: "VA" },
      ],
      email: "statesubmitteractive@cms.hhs.local",
      validRoutes: [
        "/",
        "/profile",
        "/devlogin",
        "/FAQ",
        "/dashboard",
        "/dashboard",
        "/new",
        "/medicaidspa",
        "/medicaidsparai",
        "/chipspa",
        "/chipsparai",
        "/waiver",
        "/waiverappk",
        "/waiverextension",
        "/waiverrai",
      ],
    },
  },
};

export const statesubmitterRevokedInitialAuthState = {
  isAuthenticating: false,
  isAuthenticated: true,
  isLoggedInAsDeveloper: false,
  userRole: "statesubmitter",
  userStatus: "revoked",
  userProfile: {
    cmsRoles: "onemac-state-user",
    email: "statesubmitteractive@cms.hhs.local",
    firstName: "Unit",
    lastName: "Tester",
    userData: {
      firstName: "Unita",
      lastName: "Goodcode",
      roleList: [
        {
          role: "statesubmitter",
          territory: "VA",
          status: "revoked",
        },
      ],
      email: "statesubmitteractive@cms.hhs.local",
      validRoutes: ["/", "/profile", "/devlogin", "/FAQ", "/dashboard"],
    },
  },
};

export const statesubmitterDeniedInitialAuthState = {
  isAuthenticating: false,
  isAuthenticated: true,
  isLoggedInAsDeveloper: false,
  userRole: "statesubmitter",
  userStatus: "denied",
  activeTerritories: [],
  userProfile: {
    cmsRoles: "onemac-state-user",
    email: "statesubmitteractive@cms.hhs.local",
    firstName: "Unit",
    lastName: "Tester",
    userData: {
      firstName: "Unita",
      lastName: "Goodcode",
      roleList: [
        {
          territory: "VA",
          status: "denied",
          role: "statesubmitter",
        },
      ],
      email: "statesubmitteractive@cms.hhs.local",
      validRoutes: ["/", "/profile", "/devlogin", "/FAQ", "/dashboard"],
    },
  },
};

export const stateAdminRevokedInitialAuthState = {
  isAuthenticating: false,
  isAuthenticated: true,
  isLoggedInAsDeveloper: false,
  userRole: "statesystemadmin",
  userStatus: "revoked",
  activeTerritories: [],
  userProfile: {
    cmsRoles: "onemac-state-user",
    email: "statesubmitteractive@cms.hhs.local",
    firstName: "Unit",
    lastName: "Tester",
    userData: {
      firstName: "Unita",
      lastName: "Goodcode",
      roleList: [
        {
          territory: "VA",
          status: "revoked",
          role: "statesubmitter",
        },
      ],
      email: "statesubmitteractive@cms.hhs.local",
      validRoutes: ["/", "/profile", "/devlogin", "/FAQ", "/dashboard"],
    },
  },
};

export const stateAdminDeniedInitialAuthState = {
  isAuthenticating: false,
  isAuthenticated: true,
  isLoggedInAsDeveloper: false,
  userRole: "statesystemadmin",
  userStatus: "denied",
  activeTerritories: [],
  userProfile: {
    cmsRoles: "onemac-state-user",
    email: "statesubmitteractive@cms.hhs.local",
    firstName: "Unit",
    lastName: "Tester",
    userData: {
      firstName: "Unita",
      lastName: "Goodcode",
      roleList: [
        {
          territory: "VA",
          role: "statesystemadmin",
          status: "denied",
        },
      ],
      email: "statesubmitteractive@cms.hhs.local",
      validRoutes: ["/", "/profile", "/devlogin", "/FAQ", "/dashboard"],
    },
  },
};

export const cmsRoleApproverDeniedInitialAuthState = {
  isAuthenticating: false,
  isAuthenticated: true,
  isLoggedInAsDeveloper: false,
  userRole: "cmsroleapprover",
  userStatus: "denied",
  userProfile: {
    cmsRoles: "onemac-state-user",
    email: "statesubmitteractive@cms.hhs.local",
    firstName: "Unit",
    lastName: "Tester",
    userData: {
      roleList: [
        {
          role: "cmsroleapprover",
          territory: "N/A",
          status: "denied",
        },
      ],
      email: "cmsroleapproverrevoked@cms.hhs.local",
      firstName: "Rhonda",
      lastName: "Denied",
      validRoutes: [
        "/",
        "/profile",
        "/devlogin",
        "/FAQ",
        "/usermanagement",
        "/metrics",
      ],
    },
  },
};

export const cmsRoleApproverRevokedInitialAuthState = {
  isAuthenticating: false,
  isAuthenticated: true,
  isLoggedInAsDeveloper: false,
  userRole: "cmsroleapprover",
  userStatus: "revoked",
  userProfile: {
    cmsRoles: "onemac-state-user",
    email: "statesubmitteractive@cms.hhs.local",
    firstName: "Unit",
    lastName: "Tester",
    userData: {
      roleList: [
        {
          role: "cmsroleapprover",
          territory: "N/A",
          status: "revoked",
        },
      ],
      email: "cmsroleapproverrevoked@cms.hhs.local",
      firstName: "Rhonda",
      lastName: "Revoked",
      validRoutes: [
        "/",
        "/profile",
        "/devlogin",
        "/FAQ",
        "/usermanagement",
        "/metrics",
      ],
    },
  },
};
export const helpDeskDeniedInitialAuthState = {
  isAuthenticating: false,
  isAuthenticated: true,
  isLoggedInAsDeveloper: false,
  userRole: "helpdesk",
  userStatus: "denied",
  userProfile: {
    cmsRoles: "onemac-state-user",
    email: "statesubmitteractive@cms.hhs.local",
    firstName: "Unit",
    lastName: "Tester",
    userData: {
      roleList: [
        {
          role: "helpdesk",
          territory: "N/A",
          status: "denied",
        },
      ],
      email: "cmsroleapproverrevoked@cms.hhs.local",
      firstName: "Rhonda",
      lastName: "Revoked",
      validRoutes: ["/", "/profile", "/devlogin", "/FAQ", "/dashboard"],
    },
  },
};
export const helpDeskActiveInitialAuthState = {
  isAuthenticating: false,
  isAuthenticated: true,
  isLoggedInAsDeveloper: false,
  userRole: "helpdesk",
  userStatus: "active",
  userProfile: {
    cmsRoles: "onemac-state-user",
    email: "statesubmitteractive@cms.hhs.local",
    firstName: "Unit",
    lastName: "Tester",
    userData: {
      roleList: [
        {
          role: "helpdesk",
          territory: "N/A",
          status: "active",
        },
      ],
      email: "helpdesk@nightwatch.test",
      firstName: "Help",
      lastName: "Desk",
      validRoutes: ["/", "/profile", "/devlogin", "/FAQ", "/dashboard"],
    },
  },
};

export const helpDeskRevokedInitialAuthState = {
  isAuthenticating: false,
  isAuthenticated: true,
  isLoggedInAsDeveloper: false,
  userRole: "helpdesk",
  userStatus: "revoked",
  userProfile: {
    cmsRoles: "onemac-state-user",
    email: "statesubmitteractive@cms.hhs.local",
    firstName: "Unit",
    lastName: "Tester",
    userData: {
      roleList: [
        {
          role: "helpdesk",
          territory: "N/A",
          status: "revoked",
        },
      ],
      email: "cmsroleapproverrevoked@cms.hhs.local",
      firstName: "Rhonda",
      lastName: "Denied",
      validRoutes: ["/", "/profile", "/devlogin", "/FAQ", "/dashboard"],
    },
  },
};

export const cmsUserNoAuthState = {
  isAuthenticating: true,
  isAuthenticated: false,
  isLoggedInAsDeveloper: false,
  userProfile: {
    cmsRoles: "onemac-cms-user",
    email: "cmsuserunregistered@cms.hhs.local",
    firstName: "Unit",
    lastName: "Tester",
    userData: {
      firstName: "Unita",
      lastName: "Goodcode",
      roleList: [],
      email: "cmsuserunregistered@cms.hhs.local",
      validRoutes: [
        "/",
        "/profile",
        "/devlogin",
        "/FAQ",
        "/usermanagement",
        "/metrics",
        "/signup",
        "/signup/cmsreviewer",
      ],
    },
  },
};

export const stateUserNoAuthState = {
  isAuthenticating: true,
  isAuthenticated: false,
  isLoggedInAsDeveloper: false,
  userProfile: {
    cmsRoles: "onemac-state-user",
    email: "stateuserunregistered@cms.hhs.local",
    firstName: "Unit",
    lastName: "Tester",
    userData: {
      firstName: "Unita",
      lastName: "Goodcode",
      roleList: [],
      email: "stateuserunregistered@cms.hhs.local",
      validRoutes: [
        "/",
        "/profile",
        "/devlogin",
        "/FAQ",
        "/dashboard",
        "/signup",
        "/signup/state",
      ],
    },
  },
};

export const systemAdminInitialAuthState = {
  isAuthenticating: false,
  isAuthenticated: true,
  isLoggedInAsDeveloper: false,
  userRole: "systemadmin",
  userStatus: "active",
  userProfile: {
    cmsRoles: "onemac-authorizer",
    email: "systemadmintest@cms.hhs.local",
    firstName: "Allofit",
    lastName: "Admining",
    userData: {
      firstName: "Allofit",
      email: "systemadmintest@cms.hhs.local",
      lastName: "Admining",
      roleList: [{ role: "systemadmin", status: "active", territory: "N/A" }],
      validRoutes: [
        "/",
        "/profile",
        "/dashboard",
        "/dashboard",
        "/FAQ",
        "/usermanagement",
        "/metrics",
      ],
    },
  },
};
