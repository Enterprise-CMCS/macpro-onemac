import SPAEmailTemplates from "./SPAEmailTemplates";
import SPARAIEmailTemplates from "./SPARAIEmailTemplates";
import WaiverEmailTemplates from "./WaiverEmailTemplates";
import DefaultEmailTemplates from "./DefaultEmailTemplates";
import { CHANGE_REQUEST_TYPES } from "../changeRequest/changeRequestTypes";

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
            retval = DefaultEmailTemplates;
            break;
    }

    return retval;
}
