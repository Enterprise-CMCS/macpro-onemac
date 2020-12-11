import {format, addDays} from "date-fns";

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
 * Get the EST 90th day from the submitted Date (with submitted Date as day 0)
 * @param {Number} startTimestamp the Unix timestamp for the start date of the 90 day period.
 * @returns {String} CMS approved 90th day formatted for readability.
 */
export function get90thDay(startTimestamp) {

    var estTimestamp = startTimestamp-18000;  // subtract the amount of milliseconds between UTC and EST
    var realNumberOfDays = 90;

    return format(addDays(estTimestamp, realNumberOfDays), "MMMM d, yyyy") + " @ 11:59 EST";
}