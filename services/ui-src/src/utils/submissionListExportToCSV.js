import {formatDate} from "./date-utils";

const submissionTypes =
    {
        "spa": "CHIP SPA",
        "chipsparai": "CHIP SPA RAI",
        "chipspa": "Medicaid SPA",
        "waiver": "Waiver",
        "sparai": "SPA RAI",
        "waiverrai": "Waiver RAI",
        "waiverextension": "Temporary Extension Request",
        "waiverappk": "1915(c) Appendix K Amendment"
    }

export const SubmissionListExportToCSV = (JSONData, ReportTitle, ShowLabel, columns) => {

    var CSV = "";

    if (ShowLabel) {
        var row = "";
        columns.forEach((header) => {
            row += header.Header + ",";
            return;
        })

        row = row.slice(0, -1);

        CSV += row + "\r\n";
    }

    for (var i = 0; i < JSONData.length; i++) {
        row = "";
        row += JSONData[i].transmittalNumber + ","
        row += submissionTypes[JSONData[i].type] + ","
        row += JSONData[i].territory + ","
        row += "\"" + formatDate(JSONData[i].submittedAt) + "\","
        row += JSONData[i].user.firstName + " "
        row += JSONData[i].user.lastName

        row.slice(0, row.length - 1);

        CSV += row + "\r\n";
    }

    if (CSV === "") {
        alert("Invalid data");
        return;
    }

    var fileName = "Report_";

    fileName += ReportTitle.replace(/ /g, "_");

    var uri = "data:text/csv;charset=utf-8," + escape(CSV);

    var link = document.createElement("a");
    link.href = uri;


    link.style = "visibility:hidden";
    link.download = fileName + ".csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
