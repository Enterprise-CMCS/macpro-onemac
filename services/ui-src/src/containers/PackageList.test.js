import React from "react";
import {
  render,
  screen,
  within,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { ROUTES } from "cmscommonlib";
import { AppContext } from "../libs/contextLib";
import { stateSubmitterInitialAuthState } from "../libs/testDataAppContext";
import { packageList } from "../libs/testDataPackages";

import PackageApi from "../utils/PackageApi";
import PackageList, { withdrawMenuItem } from "./PackageList";

import { LOADER_TEST_ID } from "../components/LoadingScreen";

jest.mock("../utils/PackageApi");
window.HTMLElement.prototype.scrollIntoView = jest.fn();

const ContextWrapper = ({ children }) => {
  return (
    <MemoryRouter>
      <AppContext.Provider
        value={{
          ...stateSubmitterInitialAuthState,
        }}
      >
        {children}
      </AppContext.Provider>
    </MemoryRouter>
  );
};

it("renders with a New Submission button", async () => {
  PackageApi.getMyPackages.mockResolvedValue([]);

  render(<PackageList />, { wrapper: ContextWrapper });
  await waitForElementToBeRemoved(() => screen.getByTestId(LOADER_TEST_ID));

  const newSubmissionButton = screen.getByText("New Submission");
  expect(newSubmissionButton.getAttribute("href")).toBe(
    ROUTES.NEW_SUBMISSION_SELECTION
  );
});

it("passes a retrieval error up", async () => {
  PackageApi.getMyPackages.mockResolvedValueOnce("UR040");

  render(<PackageList />, { wrapper: ContextWrapper });
  await waitForElementToBeRemoved(() => screen.getByTestId(LOADER_TEST_ID));

  expect(screen.getByText("Submission Error")).toBeInTheDocument();
});

it("renders table with columns", async () => {
  PackageApi.getMyPackages.mockResolvedValue(packageList);

  render(<PackageList />, { wrapper: ContextWrapper });

  // wait for loading screen to disappear so package table displays
  await waitForElementToBeRemoved(() => screen.getByTestId(LOADER_TEST_ID));

  screen.getByText("ID/Number");
  screen.getByText("Type");
  screen.getByText("State");
  screen.getByText("90th Day");
  screen.getByText("Expiration Date");
  screen.getByText("Date Submitted");
  screen.getByText("Submitted By");
  screen.getByText("Actions");
});

it.each`
  filterFieldType    | filterFieldValue  | inName                 | inValue          | textShown
  ${"currentStatus"} | ${"Withdrawn"}    | ${"clockEndTimestamp"} | ${1570378876000} | ${"N/A"}
  ${"currentStatus"} | ${"Terminated"}   | ${"clockEndTimestamp"} | ${1570378876000} | ${"N/A"}
  ${"currentStatus"} | ${"Unsubmitted"}  | ${"clockEndTimestamp"} | ${1570378876000} | ${"N/A"}
  ${"currentStatus"} | ${"AnythingElse"} | ${"clockEndTimestamp"} | ${1570378876000} | ${"Oct 6, 2019"}
  ${"currentStatus"} | ${"AnythingElse"} | ${"clockEndTimestamp"} | ${""}            | ${"Pending"}
`(
  "shows $textShown in $inName when $filterFieldType is $filterFieldValue and value is $inValue",
  async ({ filterFieldType, filterFieldValue, inName, inValue, textShown }) => {
    const testPackage = packageList[0];
    testPackage[filterFieldType] = filterFieldValue;
    testPackage[inName] = inValue;
    PackageApi.getMyPackages.mockResolvedValue([testPackage]);

    render(<PackageList />, { wrapper: ContextWrapper });

    // wait for loading screen to disappear so package table displays
    await waitForElementToBeRemoved(() => screen.getByTestId(LOADER_TEST_ID));

    // get the row for the status
    const packageRow = within(
      screen.getAllByText(filterFieldValue)[0].closest("tr")
    );
    expect(packageRow.getAllByText(textShown)[0]).toBeInTheDocument();
  }
);

it("has the correct package ID in the confirmation message with a withdrawal", () => {
  const testPackageID = "XX-33-2221";

  expect(
    withdrawMenuItem.formatConfirmationMessage({ componentId: testPackageID })
  ).toMatch(
    `You are about to withdraw ${testPackageID}. Once complete, you will not be able to resubmit this package. CMS will be notified.`
  );
});
