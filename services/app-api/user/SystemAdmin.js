import { USER_TYPE } from "cmscommonlib";
import { getCurrentStatus } from "./user-util";

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

  /**
   * takes the raw user data and transforms into
   * what to send to front end.
   *
   * System Admin gets all CMS Role Approvers, regardless of State
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
      // All users must have the attribute section
      if (!oneUser.attributes) {
        errorList.push(
          "Attributes data required for this role, but not found ",
          oneUser
        );
        return;
      }
      if (
        oneUser.type === "statesubmitter" ||
        oneUser.type === "statesystemadmin"
      ) {
        oneUser.attributes.forEach((oneAttribute) => {
          // State System Admins and State Submitters must have the history section
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
      // Helpdesk users and CMS Role Approvers must not have the history section
      else {
        userRows.push({
          id: i,
          email: oneUser.id,
          firstName: oneUser.firstName,
          lastName: oneUser.lastName,
          stateCode: "N/A",
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

const instance = new SystemAdmin();
Object.freeze(instance);
export default instance;
