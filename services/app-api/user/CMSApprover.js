import { USER_TYPES } from "./userTypes";
import { getCurrentStatus } from "./user-util";
import { RESPONSE_CODE } from "../libs/response-codes";
import { USER_STATUS } from "./userStatus";

/**
 * CMS Approver specific functions.
 *
 * all CMS Approvers manage all State Admin Users
 *
 * @class
 */
class CMSApprover {
  /**
   * CMS Approvers manage the State Admins
   * @returns {Object} Scan parameters for dynamodb
   */
   getScanParams(){
    const scanParams = {
      TableName: process.env.userTableName,
      FilterExpression: "#ty = :userType0",
      ExpressionAttributeNames: { "#ty": "type" },
      ExpressionAttributeValues: {":userType0": USER_TYPES.STATE_ADMIN},
    };
    return scanParams;
  }

  /**
   * CMS Approvers do NOT have a state
   * @returns {Boolean} false because we do not check if the states match
   */
  shouldICheckState() {
    return false;
  }

  /**
   * CMS Approvers have to be active to see user lists
   * @returns {String} null if ok to go, the response code if not
   */
  canIRequestThis(doneBy) {
    let myCurrentStatus = getCurrentStatus(doneBy.attributes).status;
    switch (myCurrentStatus) {
      case USER_STATUS.PENDING:
        return RESPONSE_CODE.CALLING_USER_PENDING;
      case USER_STATUS.REVOKED:
        return RESPONSE_CODE.CALLING_USER_REVOKED;
      case USER_STATUS.DENIED:
        return RESPONSE_CODE.CALLING_USER_DENIED;
    }
    return undefined;
  }

  /**
   * takes the raw user data and transforms into
   * what to send to front end.
   *
   * CMS Approver gets all State Admins, regardless of State
   *
   * @param {userResult} Array of User Objects from database
   * @returns {userRows} the list of users
   */
  transformUserList(userResult) {
    let userRows = [];
    let errorList = [];
    let i = 1;

    console.log("results:", JSON.stringify(userResult));

    // if there are no items, return an empty user list
    if (!userResult.Items) return userRows;

    userResult.Items.forEach((oneUser) => {
      // State Admins must have the attribute section
      if (!oneUser.attributes) {
        errorList.push(
          "Attributes data required for this role, but not found ",
          oneUser
        );
        return;
      }

      oneUser.attributes.forEach((oneAttribute) => {
        // State Admins must have the history section
        if (!oneAttribute.history) {
          errorList.push(
            "History data required for this role, but not found ",
            oneUser
          );
          return;
        }

        userRows.push({
          id: i,
          email: oneUser.id,
          firstName: oneUser.firstName,
          lastName: oneUser.lastName,
          stateCode: oneAttribute.stateCode,
          latest: getCurrentStatus(oneAttribute.history),
        });
        i++;
      });
    });

    console.log("error List is ", errorList);

    console.log("Response:", userRows);

    return userRows;
  }
}

const instance = new CMSApprover();
Object.freeze(instance);
export default instance;
