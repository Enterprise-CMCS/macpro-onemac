import { USER_TYPE } from "cmscommonlib";

/**
 * CMS Role Approver specific functions.
 *
 * all CMS Role Approvers manage all State System Admin Users
 *
 * @class
 */
class CMSRoleApprover {
  /**
   * CMS Role Approvers manage the State System Admins
   * @returns {Object} Scan parameters for dynamodb
   */
  getScanParams() {
    const scanParams = {
      TableName: process.env.userTableName,
      FilterExpression: "#ty = :userType0 or #ty = :userType1",
      ExpressionAttributeNames: { "#ty": "type" },
      ExpressionAttributeValues: {
        ":userType0": USER_TYPE.STATE_SYSTEM_ADMIN,
        ":userType1": USER_TYPE.CMS_REVIEWER,
      },
    };
    return scanParams;
  }

  /**
   * CMS Role Approvers do NOT have a state
   * @returns {Boolean} false because we do not check if the states match
   */
  shouldICheckState() {
    return false;
  }
}

const instance = new CMSRoleApprover();
Object.freeze(instance);
export default instance;
