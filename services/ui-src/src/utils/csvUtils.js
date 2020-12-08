import {Parser} from 'json2csv';
import {formatDate} from "../utils/date-utils";
const {transforms: {unwind}} = require('json2csv');

export function s3JsonToCsv(data) {
    console.log(formatFormDate(data))
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

function formatFormDate(data) {
    data.forEach( newData => newData.createdAt = formatDate(newData.createdAt)  );
    return data;
}





