import StateUser from "./StateUser";
import StateAdmin from "./StateAdmin";
import CMSApprover from "./CMSApprover";
import SystemAdmin from "./SystemAdmin";
import { USER_TYPES } from "./userTypes";
import { USER_STATUS } from "./userStatus";

/**
 * Get a singleton object that overloads user functions
 * with the specfic functions for the user role.
 * @param {String} type the user type sent to the back end
 * @returns {Object, undefined} the object with the functions, or undefined
 * to let developer know the emails haven't been set for that type.
 */

export const getUserFunctions = type => {
  let retval = {};

    // what users they see depends on what role they are
    switch (type) {
        case USER_TYPES.STATE_USER:
            retval = StateUser;
            break;
        case USER_TYPES.STATE_ADMIN:
            retval = StateAdmin;
            break;
        case USER_TYPES.CMS_APPROVER:
            retval = CMSApprover;
            break;
        case USER_TYPES.SYSTEM_ADMIN:
            retval = SystemAdmin;
            break;
        default:
            retval = undefined;
            break;
      }

    return retval;
}

export const getStatusDetails = statusList =>  {

    let currentStatus;
    let mostRecentTime = 0;
    let actionDate = 0;
    let mostRecentPending = 0; // most recent pending date is request date

    statusList.forEach((oneStatus) => {
      if (oneStatus.date > mostRecentTime) {
        currentStatus = oneStatus.status;
        mostRecentTime = oneStatus.date;
      }
      if (
        oneStatus.status === USER_STATUS.PENDING &&
        oneStatus.date > mostRecentPending
      ) {
        mostRecentPending = oneStatus.date;
      }
    });
    if (currentStatus !== USER_STATUS.PENDING) {
      actionDate = mostRecentTime;
    }
    return {
      status: currentStatus,
      requestDate: mostRecentPending,
      actionDate: actionDate,
    };

};