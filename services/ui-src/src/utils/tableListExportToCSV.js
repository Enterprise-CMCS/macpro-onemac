import { roleLabels, ChangeRequest } from "cmscommonlib";
import { format } from "date-fns";

const CSV_HEADER = {
  "submission-table":
    "SPA ID/Waiver Number,Type,State,Date Submitted,Submitted By",
  "package-dashboard":
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
  medicaidspa: "Medicaid SPA",
  chipsparai: "CHIP SPA RAI",
  chipspa: "CHIP SPA",
  waiver: "Waiver",
  medicaidsparai: "Medicaid SPA RAI",
  waiverrai: "Waiver RAI",
  waiverextension: "Temporary Extension Request",
  waiverappk: "1915(c) Appendix K Amendment",
};

export const serializeDate = (date) => {
  try {
    return '"' + format(date, "MMM d, yyyy") + '"';
  } catch (e) {
    if (process.env.NODE_ENV !== "test") {
      console.warn(`Invalid time value: ${date}`);
    }
    return '"' + date + '"';
  }
};

const rowTransformer = {
  "submission-table": (row) => [
    row.transmittalNumber,
    submissionTypes[row.type],
    row.territory,
    serializeDate(row.submittedAt),
    JSON.stringify(row.user.firstName + " " + row.user.lastName),
  ],
  "package-dashboard": (row) => [
    row.componentId,
    ChangeRequest.LABEL[row.componentType],
    row.componentId ? row.componentId.toString().substring(0, 2) : "--",
    serializeDate(row.submissionTimestamp),
    JSON.stringify(row.submitterName),
  ],
  "user-table": (row) => [
    JSON.stringify(row.fullName),
    row.email,
    row.territory,
    userStatus[row.status],
    roleLabels[row.role],
    serializeDate(row.date * 1000),
    JSON.stringify(row.doneByName),
  ],
};

export const tableToCSV = (exportType, JSONData) => {
  let CSV = CSV_HEADER[exportType] ?? "";
  CSV += "\r\n";

  for (const JSONRow of JSONData) {
    const tform = rowTransformer[exportType] ?? Object.values;
    const row = tform(JSONRow);
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
