import React from "react";
//import { act } from "react-dom/test-utils";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import { ONEMAC_ROUTES } from "cmscommonlib";
import { AppContext } from "../libs/contextLib";
import {
  stateSubmitterInitialAuthState,
  helpDeskActiveInitialAuthState,
} from "../libs/testDataAppContext";
import { packageList } from "../libs/testDataPackages";
import { tableListExportToCSV } from "../utils/tableListExportToCSV";

import PackageApi from "../utils/PackageApi";
import PackageList, { getState } from "./PackageList";

import { LOADER_TEST_ID } from "../components/LoadingScreen";

jest.mock("../utils/PackageApi");
window.HTMLElement.prototype.scrollIntoView = jest.fn();

jest.mock("../utils/tableListExportToCSV");
tableListExportToCSV.mockImplementation(() => null);

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

const helpDeskContextWrapper = ({ children }) => {
  return (
    <MemoryRouter>
      <AppContext.Provider
        value={{
          ...helpDeskActiveInitialAuthState,
        }}
      >
        {children}
      </AppContext.Provider>
    </MemoryRouter>
  );
};

it("getState returns '--' if not given a componentId", () => {
  expect(getState({ componentId: null })).toBe("--");
});

it("renders with a New Submission button", async () => {
  PackageApi.getMyPackages.mockResolvedValue([]);

  render(<PackageList />, { wrapper: ContextWrapper });
  await waitForElementToBeRemoved(() => screen.getByTestId(LOADER_TEST_ID));

  const newSubmissionButton = screen.getByText("New Submission");
  expect(newSubmissionButton.getAttribute("href")).toBe(
    ONEMAC_ROUTES.TRIAGE_GROUP
  );
});

it("helpdesk user renders with an Export button", async () => {
  PackageApi.getMyPackages.mockResolvedValue([]);

  render(<PackageList />, { wrapper: helpDeskContextWrapper });
  await waitForElementToBeRemoved(() => screen.getByTestId(LOADER_TEST_ID));

  const exportButton = await screen.findByText("Export to Excel(CSV)");
  userEvent.click(exportButton);
  expect(tableListExportToCSV).toBeCalled();
});

it("passes a retrieval error up", async () => {
  PackageApi.getMyPackages.mockResolvedValueOnce("UR040");

  render(<PackageList />, { wrapper: ContextWrapper });
  await waitForElementToBeRemoved(() => screen.getByTestId(LOADER_TEST_ID));

  expect(screen.getByText("Submission Error")).toBeInTheDocument();
});

it("renders table with spa columns", async () => {
  PackageApi.getMyPackages.mockResolvedValue(packageList);

  render(<PackageList />, { wrapper: ContextWrapper });

  // wait for loading screen to disappear so package table displays
  await waitForElementToBeRemoved(() => screen.getByTestId(LOADER_TEST_ID));

  screen.getByText("SPA ID");
  screen.getByText("Type");
  screen.getByText("State");
  screen.getByText("Date Submitted");
  screen.getByText("Submitted By");
  screen.getByText("Actions");
});

it("switches to waiver columns if wavier tab selected", async () => {
  PackageApi.getMyPackages.mockResolvedValue(packageList);

  render(<PackageList />, { wrapper: ContextWrapper });

  // wait for loading screen to disappear so package table displays
  await waitForElementToBeRemoved(() => screen.getByTestId(LOADER_TEST_ID));

  const waiversButtonEl = screen.getByRole("button", {
    name: "switch to showing waiver packages",
  });

  userEvent.click(waiversButtonEl);
  await waitForElementToBeRemoved(() => screen.getByTestId(LOADER_TEST_ID));

  screen.getByText("Waiver Number");
});

it("does not display waiver rais", async () => {
  PackageApi.getMyPackages.mockResolvedValue(packageList);

  render(<PackageList />, { wrapper: ContextWrapper });

  // wait for loading screen to disappear so package table displays
  await waitForElementToBeRemoved(() => screen.getByTestId(LOADER_TEST_ID));

  const waiversButtonEl = screen.getByRole("button", {
    name: "switch to showing waiver packages",
  });

  userEvent.click(waiversButtonEl);
  await waitForElementToBeRemoved(() => screen.getByTestId(LOADER_TEST_ID));

  screen.getByText("Waiver Number");

  expect(
    screen
      .getByText("MD.83420.R00.00")
      .parentElement.parentElement.querySelector("button")
  ).toBeDisabled();
});

// it.each`
//   filterFieldType    | filterFieldValue                      | inName                 | inValue          | textShown
//   ${"currentStatus"} | ${Workflow.ONEMAC_STATUS.WITHDRAWN}   | ${"clockEndTimestamp"} | ${null}          | ${"N/A"}
//   ${"currentStatus"} | ${Workflow.ONEMAC_STATUS.TERMINATED}  | ${"clockEndTimestamp"} | ${null}          | ${"N/A"}
//   ${"currentStatus"} | ${Workflow.ONEMAC_STATUS.UNSUBMITTED} | ${"clockEndTimestamp"} | ${null}          | ${"Pending"}
//   ${"currentStatus"} | ${Workflow.ONEMAC_STATUS.IN_REVIEW}   | ${"clockEndTimestamp"} | ${null}          | ${"Pending"}
//   ${"currentStatus"} | ${Workflow.ONEMAC_STATUS.SUBMITTED}   | ${"clockEndTimestamp"} | ${1570378876000} | ${"Pending"}
//   ${"currentStatus"} | ${Workflow.ONEMAC_STATUS.RAI_ISSUED}  | ${"clockEndTimestamp"} | ${null}          | ${"Clock Stopped"}
// `(
//   "shows $textShown in $inName when $filterFieldType is $filterFieldValue and value is $inValue",
//   async ({ filterFieldType, filterFieldValue, inName, inValue, textShown }) => {
//     const testPackage = packageList[0];
//     testPackage[filterFieldType] = filterFieldValue;
//     testPackage[inName] = inValue;
//     PackageApi.getMyPackages.mockResolvedValue([testPackage]);

//     render(<PackageList />, { wrapper: ContextWrapper });

//     // wait for loading screen to disappear so package table displays
//     await waitForElementToBeRemoved(() => screen.getByTestId(LOADER_TEST_ID));

//     // get the row for the status
//     const packageRow = within(
//       screen.getAllByText(filterFieldValue)[0].closest("tr")
//     );
//     expect(packageRow.getAllByText(textShown)[0]).toBeInTheDocument();
//   }
// );
/*
it("provides option to withdraw packages", async () => {
  PackageApi.getMyPackages.mockResolvedValue(packageList);
  PackageApi.withdraw.mockResolvedValueOnce("WP000");

  render(<PackageList />, { wrapper: ContextWrapper });

  // wait for loading screen to disappear so package table displays
  await waitForElementToBeRemoved(() => screen.getByTestId(LOADER_TEST_ID));

  await act(async () => {
    await userEvent.click(
      screen.getByRole("button", {
        name: "Actions for MI-98-2223",
      })
    );
    await userEvent.click(screen.getByRole("menuitem", { name: "Withdraw" }));
    await userEvent.click(
      screen.getByRole("button", { name: "Yes, withdraw" })
    );
  });

  expect(document.getElementById("alert-bar")).toHaveTextContent(
    "Your submission package has successfully been withdrawn."
  );
});

it("handles exceptions in withdraw action", async () => {
  PackageApi.getMyPackages.mockResolvedValue(packageList);
  PackageApi.withdraw.mockResolvedValueOnce("UR040");

  render(<PackageList />, { wrapper: ContextWrapper });

  // wait for loading screen to disappear so package table displays
  await waitForElementToBeRemoved(() => screen.getByTestId(LOADER_TEST_ID));

  await act(async () => {
    await userEvent.click(
      screen.getByRole("button", {
        name: "Actions for MI-98-2223",
      })
    );
    await userEvent.click(screen.getByRole("menuitem", { name: "Withdraw" }));
    await userEvent.click(
      screen.getByRole("button", { name: "Yes, withdraw" })
    );
  });

  expect(document.getElementById("alert-bar")).toHaveTextContent(
    "There was an issue submitting your request. Please try again."
  );
});
*/
