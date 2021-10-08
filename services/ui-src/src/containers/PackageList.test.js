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
import PackageList from "./PackageList";

import { LOADER_TEST_ID } from "../components/LoadingScreen";

jest.mock("../utils/PackageApi");

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

it("renders table with columns", async () => {
  PackageApi.getMyPackages.mockResolvedValue(packageList);

  render(<PackageList />, { wrapper: ContextWrapper });

  // wait for loading screen to disappear so package table displays
  await waitForElementToBeRemoved(() => screen.getByTestId(LOADER_TEST_ID));

  screen.getByText("ID/Number");
  screen.getByText("Type");
  screen.getByText("State");
  screen.getByText("90th Day");
  screen.getByText("Date Submitted");
  screen.getByText("Submitted By");
  screen.getByText("Actions");
});

it.each`
  currentStatus     | ninetiethDayValue | ninetiethDayShown
  ${"Withdrawn"}    | ${1570378876000}  | ${"N/A"}
  ${"Terminated"}   | ${1570378876000}  | ${"N/A"}
  ${"Unsubmitted"}  | ${1570378876000}  | ${"N/A"}
  ${"AnythingElse"} | ${1570378876000}  | ${"Oct 6, 2019"}
  ${"AnythingElse"} | ${""}             | ${"Pending"}
`(
  "shows $ninetiethDayShown in 90th day when status is $currentStatus and value is $ninetiethDayValue",
  async ({ currentStatus, ninetiethDayValue, ninetiethDayShown }) => {
    const testPackageList = packageList;
    testPackageList[0].currentStatus = currentStatus;
    testPackageList[0].clockEndTimestamp = ninetiethDayValue;
    PackageApi.getMyPackages.mockResolvedValue(testPackageList);

    render(<PackageList />, { wrapper: ContextWrapper });

    // wait for loading screen to disappear so package table displays
    await waitForElementToBeRemoved(() => screen.getByTestId(LOADER_TEST_ID));

    // get the row for the status
    const packageRow = within(
      screen.getAllByText(currentStatus)[0].closest("tr")
    );
    expect(packageRow.getByText(ninetiethDayShown)).toBeInTheDocument();
  }
);
