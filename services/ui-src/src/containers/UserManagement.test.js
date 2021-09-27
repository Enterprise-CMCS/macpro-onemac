import React from "react";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { AppContext } from "../libs/contextLib";
import { systemAdminInitialAuthState } from "../libs/testDataAppContext";
import { userList } from "../libs/testDataUserManagement";
import UserDataApi from "../utils/UserDataApi";
import UserManagement from "./UserManagement";

import { LOADER_TEST_ID } from "../components/LoadingScreen";
// import { POPUP_TRIGGER_TEST_ID } from "../components/PopupMenu";

jest.mock("../utils/UserDataApi");

it("renders table with columns", async () => {
  UserDataApi.getMyUserList.mockResolvedValue(userList);

  render(
    <AppContext.Provider
      value={{
        ...systemAdminInitialAuthState,
      }}
    >
      <UserManagement />
    </AppContext.Provider>,
    { wrapper: MemoryRouter }
  );

  // wait for loading screen to disappear so submissions table displays
  await waitForElementToBeRemoved(() => screen.getByTestId(LOADER_TEST_ID));

  screen.getByText("Name");
  screen.getByText("Status");
  screen.getByText("Role");
  screen.getByText("Last Modified");
  screen.getByText("Modified By");
  screen.getByText("Actions");
});
/*
describe("Actions column", () => {
  it("shows the corrent actions based on status", async () => {
    let history = createMemoryHistory();
    const promise = Promise.resolve([spaSubmission]);
    UserDataApi.getMyUserList.mockImplementationOnce(
      () => promise
    );

    const expectedType = "Medicaid SPA";
    const expectedRaiLink = "/sparai";
    const expectedUrlParams = `?transmittalNumber=${spaSubmission.transmittalNumber}`;

    render(
      <AppContext.Provider
        value={{
          ...systemAdminInitialAuthState,
        }}
      >
        <Router history={history}>
          <UserManagement />
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
});
*/
