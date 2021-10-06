import React from "react";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";

import { ROUTES } from "cmscommonlib";
import { AppContext } from "../libs/contextLib";
import { stateSubmitterInitialAuthState } from "../libs/testDataAppContext";
import { packageList } from "../libs/testDataPackages";

import PackageApi from "../utils/PackageApi";
import PackageList from "./PackageList";

import { LOADER_TEST_ID } from "../components/LoadingScreen";
import { POPUP_TRIGGER_TEST_ID } from "../components/PopupMenu";

jest.mock("../utils/PackageApi");

it("renders with a New Submission button", async () => {
  PackageApi.getMyPackages.mockResolvedValue([]);

  render(
    <AppContext.Provider
      value={{
        ...stateSubmitterInitialAuthState,
      }}
    >
      <PackageList />
    </AppContext.Provider>,
    { wrapper: MemoryRouter }
  );
  await waitForElementToBeRemoved(() => screen.getByTestId(LOADER_TEST_ID));

  const newSubmissionButton = screen.getByText("New Submission");
  expect(newSubmissionButton.getAttribute("href")).toBe(
    ROUTES.NEW_SUBMISSION_SELECTION
  );
});

it("renders table with columns", async () => {
  PackageApi.getMyPackages.mockResolvedValue(packageList);

  render(
    <AppContext.Provider
      value={{
        ...stateSubmitterInitialAuthState,
      }}
    >
      <PackageList />
    </AppContext.Provider>,
    { wrapper: MemoryRouter }
  );

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
/*
describe("Actions column", () => {
  it("links to the correct RAI form for spa type", async () => {
    let history = createMemoryHistory();
    PackageApi.getMyPackages.mockResolvedValue(packageList);

    const expectedType = "Medicaid SPA";
    const expectedRaiLink = "/sparai";
    const expectedUrlParams = `?transmittalNumber=${spaSubmission.transmittalNumber}`;

    render(
      <AppContext.Provider
        value={{
          ...stateSubmitterInitialAuthState,
        }}
      >
        <Router history={history}>
          <PackageList />
        </Router>
      </AppContext.Provider>
    );

    // wait for loading screen to disappear so submissions table displays
    await waitForElementToBeRemoved(() => screen.getByTestId(LOADER_TEST_ID));

    // get the row for the spa submission
    const spa = screen.getByText(expectedType).closest("tr");

    // find the action button for the spa, click it to see the popup menu
    const actionButton = within(spa).getByTestId(POPUP_TRIGGER_TEST_ID);
    userEvent.click(actionButton);

    // navigate to the rai form
    const respondToRaiButton = screen.getByText("Respond to RAI");
    userEvent.click(respondToRaiButton);

    // check url
    expect(history.location.pathname).toBe(expectedRaiLink);
    expect(history.location.search).toBe(expectedUrlParams);
  });

  it("links to the correct RAI form for chipspa type", async () => {
    let history = createMemoryHistory();
    PackageApi.getMyPackages.mockResolvedValue(packageList);

    const expectedType = "CHIP SPA";
    const expectedRaiLink = "/chipsparai";
    const expectedUrlParams = `?transmittalNumber=${chipSpaPackage.transmittalNumber}`;

    render(
      <AppContext.Provider
        value={{
          ...stateSubmitterInitialAuthState,
        }}
      >
        <Router history={history}>
          <PackageList />
        </Router>
      </AppContext.Provider>
    );

    // wait for loading screen to disappear so submissions table displays
    await waitForElementToBeRemoved(() => screen.getByTestId(LOADER_TEST_ID));

    // get the row for the chip spa submission
    const chipSpa = screen.getByText(expectedType).closest("tr");

    // find the action button for the chip spa, click it to see the popup menu
    const actionButton = within(chipSpa).getByTestId(POPUP_TRIGGER_TEST_ID);
    userEvent.click(actionButton);

    // navigate to the rai form
    const respondToRaiButton = screen.getByText("Respond to RAI");
    userEvent.click(respondToRaiButton);

    // check url
    expect(history.location.pathname).toBe(expectedRaiLink);
    expect(history.location.search).toBe(expectedUrlParams);
  });

  it("links to the correct RAI form for waiver type", async () => {
    let history = createMemoryHistory();
    PackageApi.getMyPackages.mockResolvedValue(packageList);

    const expectedType = "Waiver";
    const expectedRaiLink = "/waiverrai";
    const expectedUrlParams = `?transmittalNumber=${waiverPackage.transmittalNumber}`;

    render(
      <AppContext.Provider
        value={{
          ...stateSubmitterInitialAuthState,
        }}
      >
        <Router history={history}>
          <PackageList />
        </Router>
      </AppContext.Provider>
    );

    // wait for loading screen to disappear so submissions table displays
    await waitForElementToBeRemoved(() => screen.getByTestId(LOADER_TEST_ID));

    // get the row for the waiver submission
    const waiver = screen.getByText(expectedType).closest("tr");

    // find the action button for the waiver, click it to see the popup menu
    const actionButton = within(waiver).getByTestId(POPUP_TRIGGER_TEST_ID);
    userEvent.click(actionButton);

    // navigate to the rai form
    const respondToRaiButton = screen.getByText("Respond to RAI");
    userEvent.click(respondToRaiButton);

    // check url
    expect(history.location.pathname).toBe(expectedRaiLink);
    expect(history.location.search).toBe(expectedUrlParams);
  });
}); */
