import React from "react";
import {
  render,
  screen,
  waitForElementToBeRemoved,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import { createMemoryHistory } from "history";
import { set } from "lodash";

import { ROUTES } from "cmscommonlib";
import { AppContext } from "../libs/contextLib";
import { stateSubmitterInitialAuthState } from "../libs/testDataAppContext";
import {
  waiverSubmission,
  medicaidSpaSubmission,
  chipSpaSubmission,
} from "../libs/testDataSubmissions";
import ChangeRequestDataApi from "../utils/ChangeRequestDataApi";
import { Router } from "react-router-dom";
import Dashboard from "./Dashboard";

import { LOADER_TEST_ID } from "../components/LoadingScreen";
import { POPUP_TRIGGER_TEST_ID } from "../components/PopupMenu";

jest.mock("../utils/ChangeRequestDataApi");

it("renders with a New Submission button", async () => {
  const promise = Promise.resolve([]);
  ChangeRequestDataApi.getAllByAuthorizedTerritories.mockImplementationOnce(
    () => promise
  );

  render(
    <AppContext.Provider
      value={{
        ...stateSubmitterInitialAuthState,
      }}
    >
      <Dashboard />
    </AppContext.Provider>,
    { wrapper: MemoryRouter }
  );

  const newSubmissionButton = screen.getByText("New Submission");
  expect(newSubmissionButton.getAttribute("href")).toBe(
    ROUTES.NEW_SUBMISSION_SELECTION
  );

  // let promise resolve before test ends
  await act(() => promise);
});

describe("puzzle piece message", () => {
  it.each`
    status       | text
    ${"pending"} | ${/access is pending approval/i}
    ${"denied"}  | ${/don't have access/i}
    ${"revoked"} | ${/don't have access/i}
  `(
    "renders the puzzle piece for a user in $status status",
    async ({ status, text }) => {
      const promise = Promise.resolve([]);
      ChangeRequestDataApi.getAllByAuthorizedTerritories.mockImplementationOnce(
        () => promise
      );

      render(
        <AppContext.Provider
          value={{
            ...set(
              stateSubmitterInitialAuthState,
              "userProfile.userData.roleList",
              [{ territory: "ME", status, role: "statesubmitter" }]
            ),
            userStatus: status,
          }}
        >
          <Dashboard />
        </AppContext.Provider>,
        { wrapper: MemoryRouter }
      );

      // let promise resolve before checking for puzzle piece
      await act(() => promise);

      const textEl = screen.getByText(text);
      const puzzlePieceEl = screen.getByAltText(/puzzle piece/i);
      expect(textEl).toBeVisible();
      expect(puzzlePieceEl).toBeVisible();
      expect(textEl.parentNode).toContainElement(puzzlePieceEl);
    }
  );
});

it("renders table with columns", async () => {
  const promise = Promise.resolve([medicaidSpaSubmission]);
  ChangeRequestDataApi.getAllByAuthorizedTerritories.mockImplementationOnce(
    () => promise
  );

  render(
    <AppContext.Provider
      value={{
        ...stateSubmitterInitialAuthState,
      }}
    >
      <Dashboard />
    </AppContext.Provider>,
    { wrapper: MemoryRouter }
  );

  // wait for loading screen to disappear so submissions table displays
  await waitForElementToBeRemoved(() => screen.getByTestId(LOADER_TEST_ID));

  screen.getByText("ID/Number");
  screen.getByText("Type");
  screen.getByText("State");
  screen.getByText("Date Submitted");
  screen.getByText("Submitted By");
  screen.getByText("Actions");

  // let promise resolve before test ends
  await act(() => promise);
});

describe("Actions column", () => {
  it("links to the correct RAI form for spa type", async () => {
    let history = createMemoryHistory();
    const promise = Promise.resolve([medicaidSpaSubmission]);
    ChangeRequestDataApi.getAllByAuthorizedTerritories.mockImplementationOnce(
      () => promise
    );

    const expectedType = "Medicaid SPA";
    const expectedRaiLink = "/medicaidsparai";
    const expectedUrlParams = `?transmittalNumber=${medicaidSpaSubmission.transmittalNumber}`;

    render(
      <AppContext.Provider
        value={{
          ...stateSubmitterInitialAuthState,
        }}
      >
        <Router history={history}>
          <Dashboard />
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

    // let promise resolve before test ends
    await act(() => promise);
  });

  it("links to the correct RAI form for chipspa type", async () => {
    let history = createMemoryHistory();
    const promise = Promise.resolve([chipSpaSubmission]);
    ChangeRequestDataApi.getAllByAuthorizedTerritories.mockImplementationOnce(
      () => promise
    );

    const expectedType = "CHIP SPA";
    const expectedRaiLink = "/chipsparai";
    const expectedUrlParams = `?transmittalNumber=${chipSpaSubmission.transmittalNumber}`;

    render(
      <AppContext.Provider
        value={{
          ...stateSubmitterInitialAuthState,
        }}
      >
        <Router history={history}>
          <Dashboard />
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

    // let promise resolve before test ends
    await act(() => promise);
  });

  it("links to the correct RAI form for waiver type", async () => {
    let history = createMemoryHistory();
    const promise = Promise.resolve([waiverSubmission]);
    ChangeRequestDataApi.getAllByAuthorizedTerritories.mockImplementationOnce(
      () => promise
    );

    const expectedType = "Waiver";
    const expectedRaiLink = "/waiverrai";
    const expectedUrlParams = `?transmittalNumber=${waiverSubmission.transmittalNumber}`;

    render(
      <AppContext.Provider
        value={{
          ...stateSubmitterInitialAuthState,
        }}
      >
        <Router history={history}>
          <Dashboard />
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

    // let promise resolve before test ends
    await act(() => promise);
  });
});
