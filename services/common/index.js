
export const ROUTES = {
    DASHBOARD: '/dashboard',
    FAQ: '/FAQ',
    FAQ_TOP: '/FAQ/#top',
    FAQ_SPA_ID: '/FAQ#spa-id-format',
    FAQ_WAIVER_ID: '/FAQ#waiver-id-format',
    HOME: '/',
    PROFILE: '/profile',
    METRICS: '/metrics',
    DEVLOGIN: '/devlogin',
    SPA: '/spa',
    SPA_RAI: '/sparai',
    COMPONENT_PAGE: '/componentpage', // temporary placeholder for the developers to house components //
    WAIVER: '/waiver',
    WAIVER_RAI: '/waiverrai',
    WAIVER_EXTENSION: '/waiverextension',
    WAIVER_APP_K: '/waiverappk'
}

/**
 * Fetch a valid routes for a role from the backend if route is undefined.
 * Return true or false if role has access to a route when route provided.
 * @return {Array} a list routes or a boolean true/false;
 */


    const STATEUSER_ALLOWED_ROUTES = [
        ROUTES.HOME,
        ROUTES.COMPONENT_PAGE,
        ROUTES.DASHBOARD,
        ROUTES.METRICS,
        ROUTES.PROFILE,
        ROUTES.SPA,
        ROUTES.SPA_RAI,
        ROUTES.WAIVER,
        ROUTES.WAIVER_APP_K,
        ROUTES.WAIVER_EXTENSION,
        ROUTES.WAIVER_RAI
    ];

    const STATEADMIN_ALLOWED_ROUTES = [
        ROUTES.HOME,
        ROUTES.COMPONENT_PAGE,
        ROUTES.DASHBOARD,
        ROUTES.METRICS,
        ROUTES.PROFILE
    ];

    const CMSAPPROVER_ALLOWED_ROUTES = [
        ROUTES.HOME,
        ROUTES.COMPONENT_PAGE,
        ROUTES.DASHBOARD,
        ROUTES.METRICS,
        ROUTES.PROFILE
    ];

    const SYSTEMADMIN_ALLOWED_ROUTES = [
        ROUTES.HOME,
        ROUTES.COMPONENT_PAGE,
        ROUTES.DASHBOARD,
        ROUTES.METRICS,
        ROUTES.PROFILE
    ];

 export  const ROLE_ACL = {
        "stateuser": STATEUSER_ALLOWED_ROUTES,
        "stateadmin": STATEADMIN_ALLOWED_ROUTES,
        "cmsapprover": CMSAPPROVER_ALLOWED_ROUTES,
        "systemadmin": SYSTEMADMIN_ALLOWED_ROUTES
    };




