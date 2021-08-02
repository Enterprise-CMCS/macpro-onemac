import { tableToCSV } from "./tableListExportToCSV";

it("provides correct header row for submissions table", () => {
  const output = tableToCSV("submission-table", [], "");
  const outputElements = output.split("\n")[0].trim().split(",");
  expect(outputElements).toContain("SPA ID/Waiver Number");
  expect(outputElements).toContain("Type");
  expect(outputElements).toContain("State");
  expect(outputElements).toContain("Date Submitted");
  expect(outputElements).toContain("Submitted By");
});

it("provides correct header row for user table", () => {
  const output = tableToCSV("user-table", [], "");
  const outputElements = output.split("\n")[0].trim().split(",");
  expect(outputElements).toContain("Name");
  expect(outputElements).toContain("Email");
  expect(outputElements).toContain("State");
  expect(outputElements).toContain("Status");
  expect(outputElements).toContain("Role");
  expect(outputElements).toContain("Last Modified");
  expect(outputElements).toContain("Modified By");
});
