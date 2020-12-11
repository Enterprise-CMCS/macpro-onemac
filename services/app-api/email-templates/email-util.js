import {format, utcToZonedTime} from "date-fns-tz";

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
export function getESTDateFormat(theTimestamp) {
    console.log("TimeStamp is: "+theTimestamp);
    const theDate = new Date(theTimestamp);
    console.log("theDate is: "+theDate.toString());
    const cmsTimeZone = 'America/New_York';
    const cmsDate = utcToZonedTime(theDate, cmsTimeZone);
    console.log("cmsDate is: "+cmsDate);

    return format(cmsDate, 'MMMM d, yyyy @ 11:59 zzz', { timeZone: 'America/New_York' });
}