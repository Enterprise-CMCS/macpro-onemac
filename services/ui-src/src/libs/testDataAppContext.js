export const stateSubmitterInitialAuthState = {
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
        "/componentpage",
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
      validRoutes: [
        "/",
        "/componentpage",
        "/profile",
        "/devlogin",
        "/FAQ",
        "/dashboard",
      ],
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
      validRoutes: [
        "/",
        "/componentpage",
        "/profile",
        "/devlogin",
        "/FAQ",
        "/dashboard",
      ],
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
      validRoutes: [
        "/",
        "/componentpage",
        "/profile",
        "/devlogin",
        "/FAQ",
        "/dashboard",
      ],
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
      validRoutes: [
        "/",
        "/componentpage",
        "/profile",
        "/devlogin",
        "/FAQ",
        "/dashboard",
      ],
    },
  },
};

export const cmsApproverDeniedInitialAuthState = {
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
          date: 1617149287,
          doneBy: "systemadmintest@cms.hhs.local",
          status: "denied",
        },
      ],
      id: "cmsapproverrevoked@cms.hhs.local",
      firstName: "Rhonda",
      lastName: "Denied",
      type: "cmsapprover",
      validRoutes: [
        "/",
        "/componentpage",
        "/profile",
        "/devlogin",
        "/FAQ",
        "/usermanagement",
        "/metrics",
      ],
    },
  },
};

export const cmsApproverRevokedInitialAuthState = {
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
          date: 1617149287,
          doneBy: "systemadmintest@cms.hhs.local",
          status: "revoked",
        },
      ],
      id: "cmsapproverrevoked@cms.hhs.local",
      firstName: "Rhonda",
      lastName: "Revoked",
      type: "cmsapprover",
      validRoutes: [
        "/",
        "/componentpage",
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
      firstName: "Unita",
      lastName: "Goodcode",
      attributes: [
        {
          date: 1617149287,
          doneBy: "systemadmintest@cms.hhs.local",
          status: "revoked",
        },
      ],
      id: "cmsapproverrevoked@cms.hhs.local",
      firstName: "Rhonda",
      lastName: "Revoked",
      type: "helpdesk",
      validRoutes: [
        "/",
        "/componentpage",
        "/profile",
        "/devlogin",
        "/FAQ",
        "/dashboard",
      ],
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
      firstName: "Unita",
      lastName: "Goodcode",
      attributes: [
        {
          date: 1617149287,
          doneBy: "systemadmintest@cms.hhs.local",
          status: "denied",
        },
      ],
      id: "cmsapproverrevoked@cms.hhs.local",
      firstName: "Rhonda",
      lastName: "Denied",
      type: "helpdesk",
      validRoutes: [
        "/",
        "/componentpage",
        "/profile",
        "/devlogin",
        "/FAQ",
        "/dashboard",
      ],
    },
  },
};
