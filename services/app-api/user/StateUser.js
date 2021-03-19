import { RESPONSE_CODE } from "../libs/response-codes";

/**
 * State User specific functions.
 * @class
 */
class StateUser {
  /**
   * State User "scan for" returns that the
   * State User currently has no users to show on
   * the User Management Dashboard
   * @returns {String} the User Role
   */
  getScanFor() {
    return RESPONSE_CODE.USER_NOT_AUTHORIZED;
  }
}

const instance = new StateUser();
Object.freeze(instance);
export default instance;
