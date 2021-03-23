import { USER_TYPES } from "./userTypes";
import { getStatusDetails } from "./user-util";

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
   * Returns the list of active States for this user.
   * @returns {Object} the User json
   */
  getAuthorizedStateList(user) {}

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
          phone: oneUser.phone,
          stateCode: oneAttribute.stateCode,
          ...getStatusDetails(oneAttribute.history),
        });
        i++;
      });
    });

    console.log("error List is ", errorList);

    console.log("Response:", userRows);
    // Return the retrieved item
    return userRows;
  }
}

const instance = new StateAdmin();
Object.freeze(instance);
export default instance;

/*
{
  "id": { "S": "'${userEmail}'" },
  "type": { "S": "stateadmin" },
  "attributes": { "L": [
    { "M":  {
      "stateCode": { "S": "{stateCode}" },
      "history": { "L": [
        { "M": {
          "status": { "S": "pending" },
          "date": { "N": "'${createddate}'" },
          "doneBy": { "S": "systemsadmin@cms.hhs.local"
        }
      }
    },
   ]
  }
}

partition key is email
sort key is state.status
extra fields: firstName, lastName, congnito?, Okta?

*/
