import { ChangeRequest } from "cmscommonlib";
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
  const output = tableToCSV("submission-table", []);
  const outputElements = output.split("\n")[0].trim().split(",");
  expect(outputElements).toContain("SPA ID/Waiver Number");
  expect(outputElements).toContain("Type");
  expect(outputElements).toContain("State");
  expect(outputElements).toContain("Date Submitted");
  expect(outputElements).toContain("Submitted By");
});

it("provides correct header row for package dashboard", () => {
  const output = tableToCSV("package-dashboard", []);
  const outputElements = output.split("\n")[0].trim().split(",");
  expect(outputElements).toContain("SPA ID/Waiver Number");
  expect(outputElements).toContain("Type");
  expect(outputElements).toContain("State");
  expect(outputElements).toContain("Date Submitted");
  expect(outputElements).toContain("Submitted By");
});

it("provides correct header row for user table", () => {
  const output = tableToCSV("user-table", []);
  const outputElements = output.split("\n")[0].trim().split(",");
  expect(outputElements).toContain("Name");
  expect(outputElements).toContain("Email");
  expect(outputElements).toContain("State");
  expect(outputElements).toContain("Status");
  expect(outputElements).toContain("Role");
  expect(outputElements).toContain("Last Modified");
  expect(outputElements).toContain("Modified By");
});

it("formats submission data", () => {
  const output = tableToCSV("submission-table", [
    {
      transmittalNumber: "ZZ-12-3456",
      type: "spa",
      territory: "ZZ",

      submittedAt: 1234567898765,
      user: {
        firstName: "Me",
        lastName: "Myself",
      },
    },
  ]);
  expect(output.split("\n")[1].trim()).toBe(
    'ZZ-12-3456,Medicaid SPA,ZZ,"Feb 13, 2009","Me Myself"'
  );
});

it("formats package data", () => {
  const output = tableToCSV("package-dashboard", [
    {
      componentId: "ZZ-12-1234",
      componentType: ChangeRequest.TYPE.MEDICAID_SPA,
      submissionTimestamp: 1234567898765,
      submitterName: "Me Myself",
    },
  ]);
  expect(output.split("\n")[1].trim()).toBe(
    'ZZ-12-1234,Medicaid SPA,ZZ,"Feb 13, 2009","Me Myself"'
  );
});

it("formats user data", () => {
  const output = tableToCSV("user-table", [
    {
      fullName: "You Yourself",
      email: "you@example.com",
      territory: "ZZ",
      date: 987664321,
      status: "pending",
      doneByName: "Someone Else",
      role: "statesubmitter",
    },
  ]);
  expect(output.split("\n")[1].trim()).toBe(
    '"You Yourself",you@example.com,ZZ,Pending,State Submitter,"Apr 19, 2001","Someone Else"'
  );
});
