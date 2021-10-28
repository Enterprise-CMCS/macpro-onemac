import { getCurrentStatus } from "./user-util";
import { USER_TYPE, RESPONSE_CODE } from "cmscommonlib";
import { USER_STATUS } from "./userStatus";

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
   * State System Admins have to have one active state
   * @returns {String} null if ok to go, the response code if not
   */
  canIRequestThis(doneBy) {
    const myCurrentStatus = getCurrentStatus(
      doneBy.attributes[0].history
    ).status;
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
   * State System Admins can only manage their approved state
   * @returns {true} check state for State System Admins
   */
  shouldICheckState() {
    return true;
  }

  /**
   * takes the raw user data and transforms into
   * what to send to front end.
   *
   * State System Admin gets all State Submitters for their State
   *
   * @param {userResult} Array of User Objects from database
   * @returns {userRows} the list of users
   */
  transformUserList(userResult, stateList) {
    const userRows = [];
    const errorList = [];
    let i = 1;

    console.log("results:", JSON.stringify(userResult));

    // if there are no items, return an empty user list
    if (!userResult.Items) return userRows;

    userResult.Items.forEach((oneUser) => {
      // State System Admins must have the attribute section
      if (!oneUser.attributes) {
        errorList.push(
          "Attributes data required for this role, but not found ",
          oneUser
        );
        return;
      }

      oneUser.attributes.forEach((oneAttribute) => {
        // State System Admins must have the history section
        if (!oneAttribute.history) {
          errorList.push(
            "History data required for this role, but not found ",
            oneUser
          );
          return;
        }

        // skip states not on the Admin's list, not an error
        if (!stateList.includes(oneAttribute.stateCode)) return;

        userRows.push({
          id: i,
          email: oneUser.id,
          firstName: oneUser.firstName,
          lastName: oneUser.lastName,
          stateCode: oneAttribute.stateCode,
          latest: getCurrentStatus(oneAttribute.history),
          role: oneUser.type,
        });
        i++;
      });
    });

    console.log("error List is ", errorList);

    console.log("Response:", userRows);

    return userRows;
  }
}

const instance = new StateSystemAdmin();
Object.freeze(instance);
export default instance;
