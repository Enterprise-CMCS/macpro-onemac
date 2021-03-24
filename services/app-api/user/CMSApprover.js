import { USER_TYPES } from "./userTypes";
import { getCurrentStatus } from "./user-util";

/**
 * CMS Approver specific functions.
 *
 * all CMS Approvers manage all State Admin Users
 *
 * @class
 */
class CMSApprover {
  /**
   * Returns the managed user role
   * @returns {String} the User Role
   */
  getScanFor() {
    return USER_TYPES.STATE_ADMIN;
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
    let i=1;

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
          status: getCurrentStatus(oneAttribute.history),
        });
        i++;
      });
    });

    console.log("Response:", userRows);

    return userRows;
  }
}

const instance = new CMSApprover();
Object.freeze(instance);
export default instance;

/*
{  "id": { "S": "'${testuser}'" },
 "type": { "S": "cmsapprover" },
 "attributes": { "L": [
   { "M": {
     "status": { "S": "active" },
     "date": { "N": "'${createddate}'" },
     "doneBy": { "S": "systemsadmin@cms.hhs.local"
    }
    }
  } ]
}
*/