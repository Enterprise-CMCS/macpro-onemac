export const stateUserInitialAuthState = {
  isAuthenticating: false,
  isAuthenticated: true,
  isLoggedInAsDeveloper: false,
  isValidRoute: true,
  userProfile: {
    cmsRoles: "onemac-state-user",
    email: "stateuseractive@cms.hhs.local",
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
      id: "stateuseractive@cms.hhs.local",
      type: "stateuser",
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

export const stateUserRevokedInitialAuthState = {
  isAuthenticating: false,
  isAuthenticated: true,
  isLoggedInAsDeveloper: false,
  isValidRoute: true,
  userProfile: {
    cmsRoles: "onemac-state-user",
    email: "stateuseractive@cms.hhs.local",
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
      id: "stateuseractive@cms.hhs.local",
      type: "stateuser",
      validRoutes: [
        "/",
        "/componentpage",
        "/profile",
        "/devlogin",
        "/FAQ",
        "/dashboard"
      ],
    },
  },
};

export const stateUserDeniedInitialAuthState = {
  isAuthenticating: false,
  isAuthenticated: true,
  isLoggedInAsDeveloper: false,
  isValidRoute: true,
  userProfile: {
    cmsRoles: "onemac-state-user",
    email: "stateuseractive@cms.hhs.local",
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
      id: "stateuseractive@cms.hhs.local",
      type: "stateuser",
      validRoutes: [
        "/",
        "/componentpage",
        "/profile",
        "/devlogin",
        "/FAQ",
        "/dashboard"
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
    email: "stateuseractive@cms.hhs.local",
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
      id: "stateuseractive@cms.hhs.local",
      type: "stateadmin",
      validRoutes: [
        "/",
        "/componentpage",
        "/profile",
        "/devlogin",
        "/FAQ",
        "/dashboard"
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
    email: "stateuseractive@cms.hhs.local",
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
      id: "stateuseractive@cms.hhs.local",
      type: "stateadmin",
      validRoutes: [
        "/",
        "/componentpage",
        "/profile",
        "/devlogin",
        "/FAQ",
        "/dashboard"
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
    email: "stateuseractive@cms.hhs.local",
    firstName: "Unit",
    lastName: "Tester",
    userData: {
      firstName: "Unita",
      lastName: "Goodcode",
      "attributes":[
          {
              "date":1617149287,
              "doneBy":"systemadmintest@cms.hhs.local",
              "status":"denied"}],
        "id":"cmsapproverrevoked@cms.hhs.local",
        "firstName":"Rhonda",
        "lastName":"Denied",
        "type":"cmsapprover",
        "validRoutes":["/",
            "/componentpage",
            "/profile",
            "/devlogin",
            "/FAQ",
            "/usermanagement",
            "/metrics"]
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
        email: "stateuseractive@cms.hhs.local",
        firstName: "Unit",
        lastName: "Tester",
        userData: {
            firstName: "Unita",
            lastName: "Goodcode",
            "attributes":[
                {
                    "date":1617149287,
                    "doneBy":"systemadmintest@cms.hhs.local",
                    "status":"revoked"}],
            "id":"cmsapproverrevoked@cms.hhs.local",
            "firstName":"Rhonda",
            "lastName":"Revoked",
            "type":"cmsapprover",
            "validRoutes":["/",
                "/componentpage",
                "/profile",
                "/devlogin",
                "/FAQ",
                "/usermanagement",
                "/metrics"]
        },
    },
};
