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
