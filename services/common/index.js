/**
 * Common Shares Libs for the CMS Submissions Application.
 * This will contain static items needed by both the frontend and backend.
 */


/**
 * Routing Control Shared List
 *
 */
export const ROUTES = {
    DASHBOARD: '/dashboard',
    USER_MANAGEMENT: '/usermanagement',
    FAQ: '/FAQ',
    FAQ_TOP: '/FAQ/#top',
    FAQ_SPA_ID: '/FAQ#spa-id-format',
    FAQ_WAIVER_ID: '/FAQ#waiver-id-format',
    HOME: '/',
    PROFILE: '/profile',
    METRICS: '/metrics',
    DEVLOGIN: '/devlogin',
    SIGNUP: "/signup",
    STATE_SIGNUP: "/signup/state",
    SPA: '/spa',
    SPA_RAI: '/sparai',
    COMPONENT_PAGE: '/componentpage', // temporary placeholder for the developers to house components //
    WAIVER: '/waiver',
    WAIVER_RAI: '/waiverrai',
    WAIVER_EXTENSION: '/waiverextension',
    WAIVER_APP_K: '/waiverappk'
}

const ALL_USERS_ROUTES = [
    ROUTES.HOME,
    ROUTES.COMPONENT_PAGE,
    ROUTES.PROFILE,
    ROUTES.DEVLOGIN,
    ROUTES.FAQ
];

const STATEUSER_ALLOWED_ROUTES = [
    ROUTES.DASHBOARD,
    ROUTES.SPA,
    ROUTES.SPA_RAI,
    ROUTES.WAIVER,
    ROUTES.WAIVER_APP_K,
    ROUTES.WAIVER_EXTENSION,
    ROUTES.WAIVER_RAI
].concat(ALL_USERS_ROUTES);


const STATEADMIN_ALLOWED_ROUTES = [
    ROUTES.USER_MANAGEMENT,
    ROUTES.METRICS
].concat(ALL_USERS_ROUTES);
;

const CMSAPPROVER_ALLOWED_ROUTES = [
    ROUTES.USER_MANAGEMENT,
    ROUTES.METRICS,
].concat(ALL_USERS_ROUTES);
;

const SYSTEMADMIN_ALLOWED_ROUTES = [
    ROUTES.USER_MANAGEMENT,
    ROUTES.METRICS,
].concat(ALL_USERS_ROUTES);

export const ROLES = {
    STATE_USER: "stateuser",
    STATE_ADMIN: "stateadmin",
    CMS_APPROVER: "cmsapprover",
    SYSTEM_ADMIN: "systemadmin"
}

export const ROLE_ACL = {
    "stateuser": STATEUSER_ALLOWED_ROUTES,
    "stateadmin": STATEADMIN_ALLOWED_ROUTES,
    "cmsapprover": CMSAPPROVER_ALLOWED_ROUTES,
    "systemadmin": SYSTEMADMIN_ALLOWED_ROUTES
};




