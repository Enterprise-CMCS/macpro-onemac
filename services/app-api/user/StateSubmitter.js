import { RESPONSE_CODE } from "cmscommonlib";

/**
 * State Submitter specific functions.
 * @class
 */
class StateSubmitter {
  /**
   * State Submitter "scan for" returns that the
   * State Submitter currently has no users to show on
   * the User Management Dashboard
   * @returns {String} the User Role
   */
  getScanParams() {
    return RESPONSE_CODE.USER_NOT_AUTHORIZED;
  }

  /**
   * State Submitters may not see user lists
   * @returns {String} null if ok to go, the response code if not
   */
  canIRequestThis() {
    return RESPONSE_CODE.USER_NOT_AUTHORIZED;
  }

  /**
   * State Submitters have state associations
   * @returns {true} check state for State Submitters
   */
  shouldICheckState() {
    return true;
  }

  /**
   * takes the raw user data and transforms into
   * what to send to front end.
   *
   * State Submitters should not get this far
   *
   * @returns {userRows} the list of users
   */
  transformUserList() {
    return RESPONSE_CODE.USER_NOT_AUTHORIZED;
  }
}

const instance = new StateSubmitter();
Object.freeze(instance);
export default instance;
