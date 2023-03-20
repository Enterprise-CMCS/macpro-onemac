const tableToCSV = (rows, transformMap) => {
  if (rows.length === 0) {
    return "";
  }

  let CSV = rows[0].cells.map((cell) => cell.column.Header).join(",");

  CSV += "\r\n";

  const transformedData = rows.map((row) =>
    row.cells.map((cell) => {
      if (transformMap[cell.column.id]) {
        return '"' + transformMap[cell.column.id](cell) + '"';
      }
      return '"' + cell.value + '"';
    })
  );

  for (const item of transformedData) {
    CSV += Object.values(item).join(",") + "\r\n";
  }

  return CSV;
};

export const portalTableExportToCSV = (rows, transformMap, reportTitle) => {
  const CSV = tableToCSV(rows, transformMap);

  if (CSV === "") {
    alert("Invalid data");
    return;
  }

  var fileName = "Report_";

  fileName += reportTitle.replace(/ /g, "_");

  var uri = "data:text/csv;charset=utf-8," + escape(CSV);

  var link = document.createElement("a");
  link.href = uri;

  link.style = "visibility:hidden";
  link.download = fileName + ".csv";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
