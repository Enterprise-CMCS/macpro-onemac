 import {DateTime} from "luxon";

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