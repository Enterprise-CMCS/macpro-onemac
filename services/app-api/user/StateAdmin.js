import { USER_TYPES } from "./userTypes";
import { getCurrentStatus } from "./user-util";

/**
 * State Admin specific functions.
 * @class
 */
class StateAdmin {
  /**
   * State Admin "scan for" returns State Users
   *
   * @returns {String} the User Role
   */
  getScanFor() {
    return USER_TYPES.STATE_USER;
  }

  /**
   * State Admins can only manage their approved state
   * @returns {true} check state for State Admins
   */
   shouldICheckState() {
    return true;
  }

  /**
   * takes the raw user data and transforms into
   * what to send to front end.
   *
   * State Admin gets all State Users for their State
   *
   * @param {userResult} Array of User Objects from database
   * @returns {userRows} the list of users
   */
  transformUserList(userResult, stateList) {
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

        // skip states not on the Admin's list, not an error
        if (!stateList.includes(oneAttribute.stateCode)) return;

        userRows.push({
          id: i,
          email: oneUser.id,
          firstName: oneUser.firstName,
          lastName: oneUser.lastName,
          stateCode: oneAttribute.stateCode,
          status: getCurrentStatus(oneAttribute.history),
        });
        i++;
      });
    });

    console.log("error List is ", errorList);

    console.log("Response:", userRows);

    return userRows;
  }
}

const instance = new StateAdmin();
Object.freeze(instance);
export default instance;
