import StateUser from "./StateUser";
import StateAdmin from "./StateAdmin";
import CMSApprover from "./CMSApprover";
import SystemAdmin from "./SystemAdmin";
import { USER_TYPES } from "./userTypes";

/**
 * Get a singleton object that overloads user functions
 * with the specfic functions for the user role.
 * @param {String} type the user type sent to the back end
 * @returns {Object, undefined} the object with the functions, or undefined
 * to let developer know the emails haven't been set for that type.
 */

export const getUserFunctions = (doneBy) => {
  let retval = {};

  // what users they see depends on what role they are
  switch (doneBy.type) {
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
};

export const getCurrentStatus = (attr) => {
  const latestAttribute = attr.reduce((latestItem, currentItem) =>
    currentItem.date > latestItem.date ? currentItem : latestItem
  );
  return latestAttribute;
};

const isLatestAttributeActive = (attr) => {
  return getCurrentStatus(attr).status === "active";
};

export const getAuthorizedStateList = (user) => {
  let tempStateList = [];

  if (!user.attributes) return tempStateList;

  user.attributes.forEach((attribute) => {
    isLatestAttributeActive(attribute.history)
      ? tempStateList.push(attribute.stateCode)
      : null;
  });

  return tempStateList;
};
