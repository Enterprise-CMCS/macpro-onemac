import React from "react";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { AppContext } from "../libs/contextLib";
import { systemAdminInitialAuthState } from "../libs/testDataAppContext";
import { userList } from "../libs/testDataUserManagement";
import UserDataApi from "../utils/UserDataApi";
import UserManagement from "./UserManagement";

import { LOADER_TEST_ID } from "../components/LoadingScreen";
import { RESPONSE_CODE } from "cmscommonlib";

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

  // wait for loading spinner to disappear so submissions table displays
  await waitForElementToBeRemoved(() => screen.getByTestId(LOADER_TEST_ID));

  screen.getByText("Name");
  screen.getByText("Status");
  screen.getByText("Role");
  screen.getByText("Last Modified");
  screen.getByText("Modified By");
  screen.getByText("Actions");
});

it("confirms user actions with popup", async () => {
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

  // wait for loading spinner to disappear so submissions table displays
  await waitForElementToBeRemoved(() => screen.getByTestId(LOADER_TEST_ID));

  fireEvent.click(
    screen.getByLabelText(/actions for Perry Pending/, { selector: "button" })
  );
  await waitFor(() => screen.getAllByText(/grant access/i));

  // fireEvent.click(screen.getAllByText(/grant access/i)[0]);

  // const modalHeader = screen.getByText(/Modify/).closest("header");
  // expect(modalHeader.nextElementSibling).toHaveTextContent(
  //   "This will grant Perry Pending access to OneMAC."
  // );
});

it("allows sort by status", async () => {
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

  // wait for loading spinner to disappear so submissions table displays
  await waitForElementToBeRemoved(() => screen.getByTestId(LOADER_TEST_ID));

  await waitFor(() => screen.getByText("Status"));
  fireEvent.click(screen.getByText("Status"));
});

it("handles userlist as string", async () => {
  UserDataApi.getMyUserList.mockResolvedValue("Im a string");

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

  // wait for loading spinner to disappear so submissions table displays
  await waitForElementToBeRemoved(() => screen.getByTestId(LOADER_TEST_ID));
});

it("catches api errors", async () => {
  UserDataApi.getMyUserList.mockRejectedValue(
    new Error(RESPONSE_CODE.USER_NOT_AUTHORIZED)
  );

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
});
