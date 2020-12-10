import {Parser} from 'json2csv';
import {formatDate} from "../utils/date-utils";
const {transforms: {unwind}} = require('json2csv');

/**
 *
 *  Convert SPA Form S3 Bucket Json to CSV Format.
 *  @param {data} JSON string.
 *  @returns a CSV string
 */

export function s3JsonToCsv(data) {
    try {
        const fields = ['transmittalNumber', 'territory', 'createdAt', 'user.email', 'type', 'uploads.title'];
        const transforms = [unwind({paths: ['uploads', 'uploads.title']})];
        const opts = {fields, transforms};

        try {
            const parser = new Parser(opts);
            const csvData = parser.parse(data);
            return csvData;
        } catch (err) {
            console.error(err);
        }
    } catch (error) {
        console.log("Error while fetching list.", error);
    }
}

/*
 * Format the createdAt Json Timestamp field to Readable Date.
 *  @param {data} JSON string.
 *  @returns a updated JSON for createdAt Field.
 */
function formatFormDate(data) {
    data.forEach( newData => newData.createdAt = formatDate(newData.createdAt)  );
    return data;
}





