import {formatDateOnly} from "./date-utils";

/**
 * Convert Submission S3 Bucket JSON data into react-table format
 * @Param data - JSON Data from a AWS S3 Bucket scan.
 * @returns the react-table format.
 */
export function formatSubmissionS3Data(data) {
    const tableData = []
    data.forEach(newData => {
        tableData.push({
            transmittalNumber: newData.transmittalNumber,
            territory: newData.territory,
            createdAt: formatDateOnly(newData.createdAt),
            email: newData.user.email,
            state: newData.state,
            type: newData.type
        })
    });
    return tableData;
}
