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

  /**
   * takes the raw user data and transforms into
   * what to send to front end.
   *
   * State Users should not get this far
   *
   * @param {userResult} Array of User Objects from database
   * @returns {userRows} the list of users
   */
  transformUserList(userResult) {
    return RESPONSE_CODE.USER_NOT_AUTHORIZED;
  }
}

const instance = new StateUser();
Object.freeze(instance);
export default instance;
