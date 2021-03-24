import { USER_TYPES } from "./userTypes";
import { getCurrentStatus } from "./user-util";

/**
 * System Admin specific functions.
 * @class
 */
class SystemAdmin {
  /**
   * System Admin "scan for" returns CMS Approvers
   * @returns {String} the User Role
   */
  getScanFor() {
    return USER_TYPES.CMS_APPROVER;
  }

  /**
   * takes the raw user data and transforms into
   * what to send to front end.
   *
   * System Admin gets all CMS Approvers, regardless of State
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
      // CMS Approvers must have the attribute section
      if (!oneUser.attributes) {
        errorList.push(
          "Attributes data required for this role, but not found ",
          oneUser
        );
        return;
      }

      userRows.push({
        id: i,
        email: oneUser.id,
        firstName: oneUser.firstName,
        lastName: oneUser.lastName,
        status: getCurrentStatus(oneUser.attributes),
      });
      i++;
    });

    console.log("error List is ", errorList);

    console.log("Response:", userRows);
    // Return the retrieved item
    return userRows;
  }
}

const instance = new SystemAdmin();
Object.freeze(instance);
export default instance;
