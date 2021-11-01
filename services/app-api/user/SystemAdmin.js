import { USER_TYPE } from "cmscommonlib";

/**
 * System Admin specific functions.
 * @class
 */
class SystemAdmin {
  /**
   * System Admin "scan for" returns everyone but system admins
   * @returns {Object} Object of Scan Parameters for DynamnoDB Scan
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
   * System Admins are not restricted by state
   * @returns {false} do not check state for System Admins
   */
  shouldICheckState() {
    return false;
  }
}

const instance = new SystemAdmin();
Object.freeze(instance);
export default instance;
