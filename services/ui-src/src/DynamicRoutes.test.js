import React from "react";
import { act } from "react-dom/test-utils";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { Auth } from "aws-amplify";

import { AppContext } from "./libs/contextLib";
import ChangeRequestDataApi from "./utils/ChangeRequestDataApi";
import UserDataApi from "./utils/UserDataApi";
import DynamicRoutes from "./DynamicRoutes";

jest.mock("aws-amplify");
jest.mock("./utils/ChangeRequestDataApi");
jest.mock("./utils/UserDataApi");

beforeEach(() => {
  Auth.currentAuthenticatedUser.mockResolvedValueOnce({
    signInUserSession: {
      idToken: { payload: { email: "testemail@test.example" } },
    },
  });
});

it("renders successfully", () => {
  UserDataApi.userProfile.mockResolvedValueOnce({
    type: "statesubmitter",
    validRoutes: ["/"],
  });

  render(
    <MemoryRouter>
      <DynamicRoutes />
    </MemoryRouter>
  );
});

it("renders signup page for unregistered IDM users", () => {
  UserDataApi.userProfile.mockResolvedValueOnce({
    type: "",
    validRoutes: [],
  });

  const history = createMemoryHistory();
  history.push("/signup");

  render(
    <AppContext.Provider
      value={{
        isAuthenticated: true,
        userProfile: { cmsRoles: "onemac-state-user" },
      }}
    >
      <Router history={history}>
        <DynamicRoutes />
      </Router>
    </AppContext.Provider>
  );

  expect(screen.getByText(/registration\b.*\brole/i)).toBeVisible();
});

it("renders dashboard for EUA users", async () => {
  const profilePromise = Promise.resolve({
    type: "",
    validRoutes: [],
  });
  const changeReqPromise = Promise.resolve([]);
  UserDataApi.userProfile.mockReturnValueOnce(profilePromise);
  ChangeRequestDataApi.getAllByAuthorizedTerritories.mockReturnValueOnce(
    changeReqPromise
  );

  const history = createMemoryHistory();
  history.push("/dashboard");

  render(
    <AppContext.Provider value={{ isAuthenticated: true }}>
      <Router history={history}>
        <DynamicRoutes />
      </Router>
    </AppContext.Provider>
  );

  await act(async () => {
    await Promise.all([profilePromise, changeReqPromise]);
  });

  expect(screen.getByText(/submission list/i)).toBeVisible();
});

it("renders dashboard for registered state users", async () => {
  const profilePromise = Promise.resolve({
    type: "statesubmitter",
    validRoutes: ["/dashboard"],
  });
  const changeReqPromise = Promise.resolve([
    {
      transmittalNumber: "ME-12-3456",
      user: { email: "test@example.com", firstName: "Test", lastName: "User" },
    },
  ]);

  UserDataApi.userProfile.mockReturnValueOnce(profilePromise);
  ChangeRequestDataApi.getAllByAuthorizedTerritories.mockReturnValueOnce(
    changeReqPromise
  );

  const history = createMemoryHistory();
  history.push("/dashboard");

  const ctxValue = {
    isAuthenticated: true,
    userStatus: "active",
    userProfile: {
      userData: {
        type: "statesubmitter",
        attributes: [{ stateCode: "ME", history: [{ status: "active" }] }],
      },
    },
  };

  render(
    <AppContext.Provider value={ctxValue}>
      <Router history={history}>
        <DynamicRoutes />
      </Router>
    </AppContext.Provider>
  );

  await act(async () => {
    await Promise.all([profilePromise, changeReqPromise]);
  });

  expect(screen.getByText(/submission list/i)).toBeVisible();
  expect(screen.getByText("ME-12-3456", { selector: "td a" })).toBeVisible();
});
