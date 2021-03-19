// import { RESPONSE_CODE } from "../libs/response-codes";
import { USER_TYPES } from "./userTypes";

/**
 * State User specific functions.
 * @class
 */
class CMSApprover {
  /**
   * State User "scan for" returns that the
   * State User currently has no users to show on
   * the User Management Dashboard
   * @returns {String} the User Role
   */
  getScanFor() {
    return USER_TYPES.CMS_APPROVER;
  }
}

const instance = new CMSApprover();
Object.freeze(instance);
export default instance;
