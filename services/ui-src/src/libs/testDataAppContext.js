import { USER_STATUS } from "cmscommonlib";

export const stateSubmitterInitialAuthState = {
  isAuthenticating: false,
  isAuthenticated: true,
  isLoggedInAsDeveloper: false,
  isValidRoute: true,
  userStatus: USER_STATUS.ACTIVE,
  userProfile: {
    cmsRoles: "onemac-state-user",
    email: "statesubmitteractive@cms.hhs.local",
    firstName: "Unit",
    lastName: "Tester",
    userData: {
      firstName: "Unita",
      lastName: "Goodcode",
      attributes: [
        {
          stateCode: "MI",
          history: [
            {
              date: 1617149287,
              doneBy: "systemsadmin@cms.hhs.local",
              status: "active",
            },
          ],
        },
        {
          stateCode: "VA",
          history: [
            {
              date: 1617149287,
              doneBy: "systemsadmin@cms.hhs.local",
              status: "active",
            },
          ],
        },
      ],
      id: "statesubmitteractive@cms.hhs.local",
      type: "statesubmitter",
      validRoutes: [
        "/",
        "/profile",
        "/devlogin",
        "/FAQ",
        "/dashboard",
        "/dashboard",
        "/new",
        "/spa",
        "/sparai",
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
  isValidRoute: true,
  userProfile: {
    cmsRoles: "onemac-state-user",
    email: "statesubmitteractive@cms.hhs.local",
    firstName: "Unit",
    lastName: "Tester",
    userData: {
      firstName: "Unita",
      lastName: "Goodcode",
      attributes: [
        {
          stateCode: "VA",
          history: [
            {
              date: 1617149287,
              doneBy: "systemsadmin@cms.hhs.local",
              status: "revoked",
            },
          ],
        },
      ],
      id: "statesubmitteractive@cms.hhs.local",
      type: "statesubmitter",
      validRoutes: ["/", "/profile", "/devlogin", "/FAQ", "/dashboard"],
    },
  },
};

export const statesubmitterDeniedInitialAuthState = {
  isAuthenticating: false,
  isAuthenticated: true,
  isLoggedInAsDeveloper: false,
  isValidRoute: true,
  userProfile: {
    cmsRoles: "onemac-state-user",
    email: "statesubmitteractive@cms.hhs.local",
    firstName: "Unit",
    lastName: "Tester",
    userData: {
      firstName: "Unita",
      lastName: "Goodcode",
      attributes: [
        {
          stateCode: "VA",
          history: [
            {
              date: 1617149287,
              doneBy: "systemsadmin@cms.hhs.local",
              status: "denied",
            },
          ],
        },
      ],
      id: "statesubmitteractive@cms.hhs.local",
      type: "statesubmitter",
      validRoutes: ["/", "/profile", "/devlogin", "/FAQ", "/dashboard"],
    },
  },
};

export const stateAdminRevokedInitialAuthState = {
  isAuthenticating: false,
  isAuthenticated: true,
  isLoggedInAsDeveloper: false,
  isValidRoute: true,
  userProfile: {
    cmsRoles: "onemac-state-user",
    email: "statesubmitteractive@cms.hhs.local",
    firstName: "Unit",
    lastName: "Tester",
    userData: {
      firstName: "Unita",
      lastName: "Goodcode",
      attributes: [
        {
          stateCode: "VA",
          history: [
            {
              date: 1617149287,
              doneBy: "systemsadmin@cms.hhs.local",
              status: "revoked",
            },
          ],
        },
      ],
      id: "statesubmitteractive@cms.hhs.local",
      type: "stateadmin",
      validRoutes: ["/", "/profile", "/devlogin", "/FAQ", "/dashboard"],
    },
  },
};

export const stateAdminDeniedInitialAuthState = {
  isAuthenticating: false,
  isAuthenticated: true,
  isLoggedInAsDeveloper: false,
  isValidRoute: true,
  userProfile: {
    cmsRoles: "onemac-state-user",
    email: "statesubmitteractive@cms.hhs.local",
    firstName: "Unit",
    lastName: "Tester",
    userData: {
      firstName: "Unita",
      lastName: "Goodcode",
      attributes: [
        {
          stateCode: "VA",
          history: [
            {
              date: 1617149287,
              doneBy: "systemsadmin@cms.hhs.local",
              status: "denied",
            },
          ],
        },
      ],
      id: "statesubmitteractive@cms.hhs.local",
      type: "stateadmin",
      validRoutes: ["/", "/profile", "/devlogin", "/FAQ", "/dashboard"],
    },
  },
};

export const cmsRoleApproverDeniedInitialAuthState = {
  isAuthenticating: false,
  isAuthenticated: true,
  isLoggedInAsDeveloper: false,
  isValidRoute: true,
  userProfile: {
    cmsRoles: "onemac-state-user",
    email: "statesubmitteractive@cms.hhs.local",
    firstName: "Unit",
    lastName: "Tester",
    userData: {
      attributes: [
        {
          date: 1617149287,
          doneBy: "systemadmintest@cms.hhs.local",
          status: "denied",
        },
      ],
      id: "cmsroleapproverrevoked@cms.hhs.local",
      firstName: "Rhonda",
      lastName: "Denied",
      type: "cmsroleapprover",
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
  isValidRoute: true,
  userProfile: {
    cmsRoles: "onemac-state-user",
    email: "statesubmitteractive@cms.hhs.local",
    firstName: "Unit",
    lastName: "Tester",
    userData: {
      attributes: [
        {
          date: 1617149287,
          doneBy: "systemadmintest@cms.hhs.local",
          status: "revoked",
        },
      ],
      id: "cmsroleapproverrevoked@cms.hhs.local",
      firstName: "Rhonda",
      lastName: "Revoked",
      type: "cmsroleapprover",
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
  isValidRoute: true,
  userProfile: {
    cmsRoles: "onemac-state-user",
    email: "statesubmitteractive@cms.hhs.local",
    firstName: "Unit",
    lastName: "Tester",
    userData: {
      attributes: [
        {
          date: 1617149287,
          doneBy: "systemadmintest@cms.hhs.local",
          status: "revoked",
        },
      ],
      id: "cmsroleapproverrevoked@cms.hhs.local",
      firstName: "Rhonda",
      lastName: "Revoked",
      type: "helpdesk",
      validRoutes: ["/", "/profile", "/devlogin", "/FAQ", "/dashboard"],
    },
  },
};

export const helpDeskRevokedInitialAuthState = {
  isAuthenticating: false,
  isAuthenticated: true,
  isLoggedInAsDeveloper: false,
  isValidRoute: true,
  userProfile: {
    cmsRoles: "onemac-state-user",
    email: "statesubmitteractive@cms.hhs.local",
    firstName: "Unit",
    lastName: "Tester",
    userData: {
      attributes: [
        {
          date: 1617149287,
          doneBy: "systemadmintest@cms.hhs.local",
          status: "denied",
        },
      ],
      id: "cmsroleapproverrevoked@cms.hhs.local",
      firstName: "Rhonda",
      lastName: "Denied",
      type: "helpdesk",
      validRoutes: ["/", "/profile", "/devlogin", "/FAQ", "/dashboard"],
    },
  },
};

export const cmsUserNoAuthState = {
  isAuthenticating: true,
  isAuthenticated: false,
  isLoggedInAsDeveloper: false,
  isValidRoute: true,
  userProfile: {
    cmsRoles: "onemac-cms-user",
    email: "cmsroleapproverunregistered@cms.hhs.local",
    firstName: "Unit",
    lastName: "Tester",
    userData: {
      firstName: "Unita",
      lastName: "Goodcode",
      attributes: [],
      id: "cmsroleapproverunregistered@cms.hhs.local",
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
  isValidRoute: true,
  userProfile: {
    cmsRoles: "onemac-state-user",
    email: "stateuserunregistered@cms.hhs.local",
    firstName: "Unit",
    lastName: "Tester",
    userData: {
      firstName: "Unita",
      lastName: "Goodcode",
      attributes: [],
      id: "stateuserunregistered@cms.hhs.local",
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
  isValidRoute: true,
  userStatus: "active",
  userProfile: {
    cmsRoles: "onemac-authorizer",
    email: "systemadmintest@cms.hhs.local",
    firstName: "Allofit",
    lastName: "Admining",
    userData: {
      firstName: "Allofit",
      lastName: "Admining",
      id: "systemadmintest@cms.hhs.local",
      type: "systemadmin",
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
