import SPA from "./SPA";
import SPARAI from "./SPARAI";
import Waiver from "./Waiver";
import WaiverRAI from "./WaiverRAI";
import WaiverExtension from "./WaiverExtension";
import {territoryList} from "../libs/territoryLib";
import {DateTime} from "luxon";
const CHANGE_REQUEST_TYPES = {
    SPA: 'spa',
    SPA_RAI: 'sparai',
    WAIVER: 'waiver',
    WAIVER_RAI: 'waiverrai',
    WAIVER_EXTENSION: 'waiverextension'
};

/**
 * Get a singleton object that overloads the getCMSEmail and getStateEmail
 * with the specfic functions for the data type.
 * @param {String} type the change request type sent to the back end
 * @returns {Object, undefined} the object with the functions, or undefined
 * to let developer know the emails haven't been set for that type.
 */

export default function getChangeRequestFunctions(type) {
  const availableTypes = [
      {type: CHANGE_REQUEST_TYPES.SPA, val: SPA},
      {type: CHANGE_REQUEST_TYPES.SPA_RAI, val: SPARAI},
      {type: CHANGE_REQUEST_TYPES.WAIVER, val: Waiver},
      {type: CHANGE_REQUEST_TYPES.WAIVER_RAI, val: WaiverRAI},
      {type: CHANGE_REQUEST_TYPES.WAIVER_EXTENSION, val: WaiverExtension},
  ];

  return availableTypes.find(request => request.type === type).val;
}

/**
 * Get HTML containing links representing the attached documents.
 * @param {Object} uploads data describing the uploaded file, with title, url, and filename
 * @returns {String} HTML with the document links.
 */
export function getLinksHtml(uploads) {
    let list = Array.from(uploads).map(upload => {
        let {title, url, filename} = upload;
        return `<li>${title}: <a href="${url}">${filename}</a></li>`;
    });
    return `<ul>${list}</ul>`;
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
 * @param {Object} fieldValue Transmittal Number Field Entered on Change Event.
 */
export function hasValidStateCode(fieldValue) {
    return territoryList.some(
        state => state['value'] === fieldValue.substring(0, 2)
    );

};
