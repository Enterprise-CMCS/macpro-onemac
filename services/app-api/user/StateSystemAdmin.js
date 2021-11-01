import { USER_TYPE } from "cmscommonlib";

/**
 * State System Admin specific functions.
 * @class
 */
class StateSystemAdmin {
  /**
   * State System Admin "scan for" returns State Submitters
   *
   * @returns {Object} Scan parameters for dynamodb
   */
  getScanParams() {
    const scanParams = {
      TableName: process.env.userTableName,
      FilterExpression: "#ty = :userType0",
      ExpressionAttributeNames: { "#ty": "type" },
      ExpressionAttributeValues: { ":userType0": USER_TYPE.STATE_SUBMITTER },
    };
    return scanParams;
  }

  /**
   * State System Admins can only manage their approved state
   * @returns {true} check state for State System Admins
   */
  shouldICheckState() {
    return true;
  }
}

const instance = new StateSystemAdmin();
Object.freeze(instance);
export default instance;
