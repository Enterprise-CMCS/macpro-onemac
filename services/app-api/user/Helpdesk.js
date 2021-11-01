import { USER_TYPE } from "cmscommonlib";

/**
 * Helpdesk User specific functions.
 *
 * all Helpdesk User can view all Users except CMS System Admins
 *
 * @class
 */
class Helpdesk {
  /**
   * Help Desk users see all users
   * @returns {String} the User Role
   */
  getScanParams() {
    const scanParams = {
      TableName: process.env.userTableName,
      FilterExpression: "#ty <> :userType",
      ExpressionAttributeNames: { "#ty": "type" },
      ExpressionAttributeValues: { ":userType": USER_TYPE.SYSTEM_ADMIN },
    };
    return scanParams;
  }

  /**
   * Helpdesk User do NOT have a state
   * @returns {Boolean} false because we do not check if the states match
   */
  shouldICheckState() {
    return false;
  }
}

const instance = new Helpdesk();
Object.freeze(instance);
export default instance;
