import StateSubmitter from "./StateSubmitter";
import StateAdmin from "./StateAdmin";
import CMSRoleApprover from "./CMSRoleApprover";
import SystemAdmin from "./SystemAdmin";
import Helpdesk from "./Helpdesk";
import { USER_TYPE } from "cmscommonlib";

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
    case USER_TYPE.STATE_SUBMITTER:
      retval = StateSubmitter;
      break;
    case USER_TYPE.STATE_ADMIN:
      retval = StateAdmin;
      break;
    case USER_TYPE.CMS_ROLE_APPROVER:
      retval = CMSRoleApprover;
      break;
    case USER_TYPE.SYSTEM_ADMIN:
      retval = SystemAdmin;
      break;
    case USER_TYPE.HELPDESK:
      retval = Helpdesk;
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
  const tempStateList = [];

  if (
    !user?.attributes ||
    (!user?.attributes?.history && isLatestAttributeActive(user.attributes))
  )
    return "All";

  user.attributes.forEach((attribute) => {
    isLatestAttributeActive(attribute.history)
      ? tempStateList.push(attribute?.stateCode)
      : null;
  });

  return tempStateList;
};
