import SPA from "./SPA";
import SPARAI from "./SPARAI";
import Waiver from "./Waiver";
import WaiverRAI from "./WaiverRAI";
import WaiverExtension from "./WaiverExtension";
import { CHANGE_REQUEST_TYPES } from "./changeRequestTypes";
import { territoryList } from "../libs/territoryLib";
import {DateTime} from "luxon";

/**
 * Get a singleton object that overloads the getCMSEmail and getStateEmail
 * with the specfic functions for the data type.
 * @param {String} type the change request type sent to the back end
 * @returns {Object, undefined} the object with the functions, or undefined
 * to let developer know the emails haven't been set for that type.
 */

export default function getChangeRequestFunctions(type) {
  let retval = {};

    switch(type) {
        case CHANGE_REQUEST_TYPES.WAIVER:
            retval = Waiver;
            break;
        case CHANGE_REQUEST_TYPES.SPA:
            retval = SPA;
            break;
        case CHANGE_REQUEST_TYPES.SPA_RAI:
            retval = SPARAI;
            break;
        case CHANGE_REQUEST_TYPES.WAIVER_RAI:
            retval = WaiverRAI;
            break;
        case CHANGE_REQUEST_TYPES.WAIVER_EXTENSION:
            retval = WaiverExtension;
            break;
        default:
            retval = undefined;
            break;
    }

    return retval;
}

/**
 * Get HTML containing links representing the attached documents.
 * @param {Object} uploads data describing the uploaded file, with title, url, and filename
 * @returns {String} HTML with the document links.
 */
export function getLinksHtml(uploads) {
    let html = "";
    if(Array.isArray(uploads) && uploads.length > 0) {
        html = "<ul>";
        uploads.forEach(async (upload) => {
        html += "<li>" + upload.title + ": <a href=\"" + upload.url +"\">" + upload.filename + "</a></li>";
        });
    html += "</ul>";
    }
    return html;
}

/**
 * takes a UTC timestamp, converts to CMS TimeZone, and formats it in the CMS email way
 * @param {Number} theTimestamp the Unix timestamp to be used as the date
 * @returns {String} CMS approved date format.
 */
export function getCMSDateFormat(theTimestamp) {
    const theDate = DateTime.fromMillis(theTimestamp).setZone('America/New_York');

    return theDate.toFormat("DDDD '@ 11:59pm' ZZZZ");
}

/**
 * Validate Field Territory/State Code
 * @param {value} Transmittal Number Field Entered on Change Event.
 */
export function hasValidStateCode(fieldValue) {

    const result = territoryList.some(
        state => state['value'] === fieldValue.substring(0,2)
    );

    return result;

};
