import { RESPONSE_CODE } from "cmscommonlib";

/**
 * CMSReiewer User specific functions.
 *
 * all CMSReiewer User can view all Users except CMS System Admins
 *
 * @class
 */
class CMSReviewer {
  /**
   * CMS Reviewers don't see any users
   * @returns {String} the User Role
   */
  getScanParams() {
    return RESPONSE_CODE.USER_NOT_AUTHORIZED;
  }

  /**
   * CMSReiewer User do NOT have a state
   * @returns {Boolean} false because we do not check if the states match
   */
  shouldICheckState() {
    return false;
  }

  /**
   * CMSReiewer User have to be active to see user lists
   * @returns {String} null always as CMSReiewer User can have a read-only view of all users with any statuses
   */
  canIRequestThis() {
    return undefined;
  }

  /**
   * takes the raw user data and transforms into
   * what to send to front end.
   *
   * CMSReiewer User gets all users except CMS System Admins
   *
   * @returns {userRows} the list of users
   */
  transformUserList() {
    return RESPONSE_CODE.USER_NOT_AUTHORIZED;
  }
}

const instance = new CMSReviewer();
Object.freeze(instance);
export default instance;
