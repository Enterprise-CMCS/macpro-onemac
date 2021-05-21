import { USER_TYPES } from "./userTypes";
import { getCurrentStatus } from "./user-util";

/**
 * Helpdesk User specific functions.
 *
 * all Helpdesk User can view all Users except CMS System Admins
 *
 * @class
 */
class Helpdesk {
  /**
   * CMS Approvers manage the State Admins
   * @returns {String} the User Role
   */
   getScanParams() {
    let scanParams = {
      TableName: process.env.userTableName,
      FilterExpression:  "#ty <> :userType",
      ExpressionAttributeNames: { "#ty": "type" },
      ExpressionAttributeValues: { ":userType": "systemadmin" },
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

  /**
   * Helpdesk User have to be active to see user lists
   * @returns {String} null always as Helpdesk User can have a read-only view of all users with any statuses
   */
  canIRequestThis(doneBy) {
    return undefined;
  }

  /**
   * takes the raw user data and transforms into
   * what to send to front end.
   *
   * Helpdesk User gets all users except CMS System Admins
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
      // All users must have the attribute section
      if (!oneUser.attributes) {
        errorList.push(
          "Attributes data required for this role, but not found ",
          oneUser
        );
        return;
      }
      if (oneUser.type !== 'cmsapprover' && oneUser.type !== 'helpdesk'){
        oneUser.attributes.forEach((oneAttribute) => {
          // State Admins and State Users must have the history section
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
            role: oneUser.type,
            latest: getCurrentStatus(oneAttribute.history),
          });
          i++;
        });
      }
      // Helpdesk users and CMS Approvers must not have the history section
      else {
        userRows.push({
          id: i,
          email: oneUser.id,
          firstName: oneUser.firstName,
          lastName: oneUser.lastName,
          stateCode: 'N/A',
          role: oneUser.type,
          latest: getCurrentStatus(oneUser.attributes),
        });
        i++;
      }

    });

    console.log("error List is ", errorList);

    console.log("Response:", userRows);

    return userRows;
  }
}

const instance = new Helpdesk();
Object.freeze(instance);
export default instance;
