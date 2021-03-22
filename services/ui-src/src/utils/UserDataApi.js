import { API } from "aws-amplify";
import { ROUTES } from "../Routes";

/**
 * Singleton class to perform operations with the user tables backend.
 */
class UserDataApi {
  /**
   * Fetch a specific record from the backend.
   * @return {Array} a list of change requests
   */
  async getUserData() {
    try {
      return await API.get("userDataAPI", `/getUser`);
    } catch (error) {
      console.log(
        `There was an error fetching data for the user.`,
        error
      );
      throw error;
    }
  }
}



export function isAllowedRoleRoute(role, route) {
  const STATEUSER_ALLOWED_ROUTES = [
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
  ]

  const STATEADMIN_ALLOWED_ROUTES = [
    ROUTES.COMPONENT_PAGE,
    ROUTES.DASHBOARD,
    ROUTES.METRICS,
    ROUTES.PROFILE
  ]

  const CMSAPPROVER_ALLOWED_ROUTES = [
    ROUTES.COMPONENT_PAGE,
    ROUTES.DASHBOARD,
    ROUTES.METRICS,
    ROUTES.PROFILE
  ]

  const SYSTEMADMIN_ALLOWED_ROUTES = [
    ROUTES.COMPONENT_PAGE,
    ROUTES.DASHBOARD,
    ROUTES.METRICS,
    ROUTES.PROFILE
  ]

  const ROLE_ACL = {
    "stateuser": STATEUSER_ALLOWED_ROUTES,
    "stateadmin": STATEADMIN_ALLOWED_ROUTES,
    "cmsapprover": CMSAPPROVER_ALLOWED_ROUTES,
    "systemadmin": SYSTEMADMIN_ALLOWED_ROUTES

  }

  const canAccessRoute = ROLE_ACL.[role].includes(route)
  console.log("Validate Permissions:" + canAccessRoute)
  return canAccessRoute;

}

const instance = new UserDataApi();
Object.freeze(instance);

export default instance;
