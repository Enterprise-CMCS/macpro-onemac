import { USER_STATUS, USER_TYPE } from "cmscommonlib";
import { getCurrentStatus } from "./user-util";
import { RESPONSE_CODE } from "cmscommonlib";

/**
 * CMS Role Approver specific functions.
 *
 * all CMS Role Approvers manage all State Admin Users
 *
 * @class
 */
class CMSRoleApprover {
  /**
   * CMS Role Approvers manage the State Admins
   * @returns {Object} Scan parameters for dynamodb
   */
  getScanParams() {
    const scanParams = {
      TableName: process.env.userTableName,
      FilterExpression: "#ty = :userType0 or #ty = :userType1",
      ExpressionAttributeNames: { "#ty": "type" },
      ExpressionAttributeValues: {
        ":userType0": USER_TYPE.STATE_ADMIN,
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

  /**
   * CMS Role Approvers have to be active to see user lists
   * @returns {String} null if ok to go, the response code if not
   */
  canIRequestThis(doneBy) {
    const myCurrentStatus = getCurrentStatus(doneBy.attributes).status;
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
   * CMS Role Approver gets all State Admins, regardless of State
   *
   * @param {userResult} Array of User Objects from database
   * @returns {userRows} the list of users
   */
  transformUserList(userResult) {
    const userRows = [];
    const errorList = [];
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

      const baseRow = {
        email: oneUser.id,
        firstName: oneUser.firstName,
        lastName: oneUser.lastName,
        role: oneUser.type,
      };

      if (oneUser.type === USER_TYPE.STATE_ADMIN) {
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
            ...baseRow,
            id: i++,
            stateCode: oneAttribute.stateCode,
            latest: getCurrentStatus(oneAttribute.history),
          });
        });
      } else {
        userRows.push({
          ...baseRow,
          id: i++,
          stateCode: "N/A",
          latest: getCurrentStatus(oneUser.attributes),
        });
      }
    });

    console.log("error List is ", errorList);

    console.log("Response:", userRows);

    return userRows;
  }
}

const instance = new CMSRoleApprover();
Object.freeze(instance);
export default instance;
