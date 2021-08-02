import { format } from "date-fns";

import { serializeDate, tableToCSV } from "./tableListExportToCSV";

describe("date output", () => {
  it("shapes a valid date into the right format", () => {
    const date = new Date();
    expect(serializeDate(date)).toContain(format(date, "MMM d, yyyy"));
  });

  it("outputs quoted raw value if an invalid date is passed in", () => {
    const date = null;
    expect(serializeDate(date)).toBe('"' + date + '"');
  });
});

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
