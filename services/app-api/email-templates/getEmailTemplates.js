import SPAEmailTemplates from "./SPAEmailTemplates";
import SPARAIEmailTemplates from "./SPARAIEmailTemplates";
import WaiverEmailTemplates from "./WaiverEmailTemplates";
import { CHANGE_REQUEST_TYPES } from "../changeRequest/changeRequestTypes";

/**
 * Get a singleton object that overloads the getCMSEmail and getStateEmail
 * with the specfic functions for the data type.
 * @param {String} type the change request type sent to the back end
 * @returns {Object, undefined} the object with the functions, or undefined
 * to let developer know the emails haven't been set for that type.
 */

export default function getEmailTemplates(type) {
  let retval = {};

    switch(type) {
        case CHANGE_REQUEST_TYPES.WAIVER:
            retval = WaiverEmailTemplates;
            break;
        case CHANGE_REQUEST_TYPES.AMENDMENT:
            retval = SPAEmailTemplates;
            break;
        case CHANGE_REQUEST_TYPES.SPA_RAI:
            retval = SPARAIEmailTemplates;
            break;
        default:
            retval = undefined;
            break;
    }

    return retval;
}
