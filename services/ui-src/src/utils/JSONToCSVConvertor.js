import {formatDate} from "./date-utils";

export const JSONToCSVConvertor = (JSONData, ReportTitle, ShowLabel, columns) => {

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
        row += JSONData[i].type + ","
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

    //Generate a file name
    var fileName = "Report_";

    fileName += ReportTitle.replace(/ /g, "_");

    //Initialize file format you want csv or xls
    var uri = "data:text/csv;charset=utf-8," + escape(CSV);

    // Now the little tricky part.
    // you can use either>> window.open(uri);
    // but this will not work in some browsers
    // or you will not get the correct file extension

    //this trick will generate a temp <a /> tag
    var link = document.createElement("a");
    link.href = uri;

    //set the visibility hidden so it will not effect on your web-layout
    link.style = "visibility:hidden";
    link.download = fileName + ".csv";

    //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
