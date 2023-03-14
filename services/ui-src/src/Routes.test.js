import React from "react";
import { act } from "react-dom/test-utils";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { Auth } from "aws-amplify";

import { AppContext } from "./libs/contextLib";
import ChangeRequestDataApi from "./utils/ChangeRequestDataApi";
import UserDataApi from "./utils/UserDataApi";
import { Routes } from "./Routes";

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
      <Routes />
    </MemoryRouter>
  );
});

it("renders when given authenticated flag", () => {
  UserDataApi.userProfile.mockResolvedValueOnce({
    type: "statesubmitter",
    validRoutes: ["/"],
  });

  render(
    <MemoryRouter>
      <AppContext.Provider value={{ isAuthenticated: true }}>
        <Routes />
      </AppContext.Provider>
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
        <Routes />
      </Router>
    </AppContext.Provider>
  );

  expect(screen.getByText(/registration\b.*\brole/i)).toBeVisible();
});

// it("renders dashboard for EUA users", async () => {
//   const profilePromise = Promise.resolve({
//     type: "",
//     validRoutes: [],
//   });
//   const changeReqPromise = Promise.resolve([
//     {
//       user: { email: "test@example.com", firstName: "Test", lastName: "User" },
//     },
//   ]);
//   UserDataApi.userProfile.mockReturnValueOnce(profilePromise);
//   ChangeRequestDataApi.getAllByAuthorizedTerritories.mockReturnValueOnce(
//     changeReqPromise
//   );

//   const history = createMemoryHistory();
//   history.push("/dashboard");

//   render(
//     <AppContext.Provider value={{ isAuthenticated: true }}>
//       <Router history={history}>
//         <Routes />
//       </Router>
//     </AppContext.Provider>
//   );

//   await act(async () => {
//     await Promise.all([profilePromise, changeReqPromise]);
//   });

//   expect(screen.getByText(/package dashboard/i)).toBeVisible();
// });

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
    userRole: "statesubmitter",
    userStatus: "active",
    userProfile: {
      userData: {
        roleList: [
          { territory: "ME", role: "statesubmitter", status: "active" },
        ],
      },
    },
  };

  render(
    <AppContext.Provider value={ctxValue}>
      <Router history={history}>
        <Routes />
      </Router>
    </AppContext.Provider>
  );

  await act(async () => {
    await Promise.all([profilePromise, changeReqPromise]);
  });

  expect(screen.getByText(/package dashboard/i)).toBeVisible();
});

it("renders submission triage view for state user", async () => {
  const profilePromise = Promise.resolve({
    type: "statesubmitter",
    validRoutes: ["/dashboard"],
  });
  UserDataApi.userProfile.mockReturnValueOnce(profilePromise);
  const history = createMemoryHistory();
  history.push("/choices");

  const ctxValue = {
    isAuthenticated: true,
    userRole: "statesubmitter",
    userStatus: "active",
    userProfile: {
      userData: {
        roleList: [
          { territory: "ME", role: "statesubmitter", status: "active" },
        ],
      },
    },
  };

  render(
    <AppContext.Provider value={ctxValue}>
      <Router history={history}>
        <Routes />
      </Router>
    </AppContext.Provider>
  );

  await act(async () => {
    await profilePromise;
  });

  expect(
    screen.getByText(/submission type/i, { selector: "h1" })
  ).toBeVisible();
  expect(screen.getByText(/select a submission type/i)).toBeVisible();
});
