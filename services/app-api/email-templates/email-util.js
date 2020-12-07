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
 * Get the 90th day from the created Date (with created Date as day 0)
 * @param {Date} startDate the start date of the 90 day period.
 * @returns {String} CMS approved 90th day formatted for readability.
 */
export function get90thDay(startDate) {
    var realNumberOfDays = 90;

    return format(addDays(startDate, realNumberOfDays), "MMMM d, yyyy")+" @ 11:59pm EST";
}