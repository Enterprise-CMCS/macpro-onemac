import { userTypes } from "../libs/userLib";
import { format } from "date-fns";

const CSV_HEADER = {
  "submission-table":
    "SPA ID/Waiver Number,Type,State,Date Submitted,Submitted By",
  "user-table": "Name,Email,State,Status,Role,Last Modified,Modified By",
};

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

const serializeDate = (date) => {
  try {
    return '"' + format(date, "MMM d, yyyy") + '"';
  } catch (e) {
    console.warn(`Invalid time value: ${date}`);
    return '"' + date + '"';
  }
};

export const tableToCSV = (exportType, JSONData) => {
  let CSV = CSV_HEADER[exportType] ?? "";
  CSV += "\r\n";

  for (const JSONRow of JSONData) {
    const row = [];
    // eslint-disable-next-line default-case
    switch (exportType) {
      case "submission-table":
        row.push(JSONRow.transmittalNumber);
        row.push(submissionTypes[JSONRow.type]);
        row.push(JSONRow.territory);
        row.push(serializeDate(JSONRow.submittedAt));
        row.push(JSONRow.user.firstName + " " + JSONRow.user.lastName);
        break;
      case "user-table":
        row.push(JSONRow.user.firstName + " " + JSONRow.user.lastName);
        row.push(JSONRow.email);
        row.push(JSONRow.stateCode);
        row.push(userStatus[JSONRow.latest.status]);
        row.push(userTypes[JSONRow.role]);
        row.push(serializeDate(JSONRow.latest.date));
        row.push(JSON.stringify(JSONRow.latest.doneByName));
    }

    CSV += row.join(",") + "\r\n";
  }

  return CSV;
};

export const tableListExportToCSV = (exportType, JSONData, ReportTitle) => {
  const CSV = tableToCSV(exportType, JSONData);

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
