// import { RESPONSE_CODE } from "../libs/response-codes";
import { USER_TYPES } from "./userTypes";

/**
 * State User specific functions.
 * @class
 */
class StateAdmin {
  /**
   * State User "scan for" returns that the
   * State User currently has no users to show on
   * the User Management Dashboard
   * @returns {String} the User Role
   */
  getScanFor() {
    return USER_TYPES.STATE_USER;
  }
}

const instance = new StateAdmin();
Object.freeze(instance);
export default instance;
