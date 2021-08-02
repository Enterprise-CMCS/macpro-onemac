import { userTypes } from "../libs/userLib";
import { format } from "date-fns";
const userStatus = {
  active: "Granted",
  denied: "Denied",
  pending: "Pending",
  revoked: "Revoked",
};

const submissionTypes = {
  spa: "Medicaid SPA",
  chipsparai: "CHIP SPA RAI",
  chipspa: "CHIP SPA",
  waiver: "Waiver",
  sparai: "SPA RAI",
  waiverrai: "Waiver RAI",
  waiverextension: "Temporary Extension Request",
  waiverappk: "1915(c) Appendix K Amendment",
};

export const tableListExportToCSV = (exportType, JSONData, ReportTitle) => {
  var CSV = "";

  var row = "";

  switch (exportType) {
    case "submission-table":
      row += "SPA ID/Waiver Number,Type,State,Date Submitted,Submitted By,";
      break;
    case "user-table":
      row += "Name,Email,State,Status,Role,Last Modified,Modified By,";
      break;
    default:
  }

  row = row.slice(0, -1);

  CSV += row + "\r\n";

  for (var i = 0; i < JSONData.length; i++) {
    row = "";
    switch (exportType) {
      case "submission-table":
        row += JSONData[i].transmittalNumber + ",";
        row += submissionTypes[JSONData[i].type] + ",";
        row += JSONData[i].territory + ",";
        try {
          row += '"' + format(JSONData[i].submittedAt, "MMM d, yyyy") + '",';
        } catch (e) {
          console.warn(
            `Invalid time value in row ${i}: ${JSONData[i].submittedAt}`
          );
          row += '"' + JSONData[i].submittedAt + '",';
        }
        row += JSONData[i].user.firstName + " ";
        row += JSONData[i].user.lastName;
        break;
      case "user-table":
        row += JSONData[i].firstName + " ";
        row += JSONData[i].lastName + ",";
        row += JSONData[i].email + ",";
        row += JSONData[i].stateCode + ",";
        row += userStatus[JSONData[i].latest.status] + ",";
        row += userTypes[JSONData[i].role] + ",";
        row +=
          '"' +
          format(JSONData[i].latest.date * 1000, "MMM d, yyyy hh:mm a") +
          '",';
        row += JSON.stringify(JSONData[i].latest.doneByName);
        break;
      default:
    }
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
