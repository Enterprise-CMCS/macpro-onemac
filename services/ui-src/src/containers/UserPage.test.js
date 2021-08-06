import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

import { AppContext } from "../libs/contextLib";
import UserPage from "./UserPage";

import UserDataApi from "../utils/UserDataApi";
import { alertCodeAlerts, ALERTS_MSG } from "../libs/alertLib";
import { RESPONSE_CODE } from "cmscommonlib";

jest.mock("../utils/UserDataApi");

const initialAuthState = {
  isAuthenticating: false,
  isAuthenticated: true,
  isLoggedInAsDeveloper: false,
  isValidRoute: true,
  userProfile: {
    cmsRoles: "onemac-state-user",
    email: "statesubmitteractive@cms.hhs.local",
    firstName: "Unit",
    lastName: "Tester",
    userData: {
      firstName: "Unita",
      lastName: "Goodcode",
      attributes: [],
      id: "statesubmitteractive@cms.hhs.local",
      type: "statesubmitter",
      validRoutes: ["/", "/profile"],
    },
  },
};

describe("Phone Number section", () => {
  let history;
  beforeEach(() => {
    history = createMemoryHistory();
    history.push("/profile");
  });

  it("lets you change the phone number", async () => {
    const initial = "303-909-8080";
    const replacement = "202-867-5309";

    const authState = { ...initialAuthState, updatePhoneNumber: jest.fn() };
    authState.userProfile.userData.phoneNumber = initial;

    render(
      <AppContext.Provider
        value={{
          ...authState,
        }}
      >
        <Router history={history}>
          <UserPage />
        </Router>
      </AppContext.Provider>
    );

    // click Edit button to start editing
    fireEvent.click(screen.getByText("Edit", { selector: "button" }));

    // find the input, which should be visible and enabled
    const phoneInputEl = screen.getByLabelText("Phone Number");
    expect(phoneInputEl).toBeVisible();
    expect(phoneInputEl).not.toBeDisabled();

    // change the value
    fireEvent.change(phoneInputEl, { target: { value: replacement } });

    // the component should allow that change and update the input element
    await waitFor(() => {
      expect(phoneInputEl).toHaveValue(replacement);
    });
  });

  it("lets you cancel your changes to the phone number", async () => {
    const initial = "303-909-8080",
      replacement = "202-867-5309";

    const authState = { ...initialAuthState, updatePhoneNumber: jest.fn() };
    authState.userProfile.userData.phoneNumber = initial;

    render(
      <AppContext.Provider
        value={{
          ...authState,
        }}
      >
        <Router history={history}>
          <UserPage />
        </Router>
      </AppContext.Provider>
    );

    // click Edit button to start editing
    fireEvent.click(screen.getByText("Edit", { selector: "button" }));
    // change the value in the input
    fireEvent.change(screen.getByLabelText("Phone Number"), {
      target: { value: replacement },
    });
    // click Cancel button to revert changes
    fireEvent.click(screen.getByText("Cancel", { selector: "button" }));

    // input is no longer there
    expect(screen.queryByLabelText("Phone Number")).toBeNull();
    // the initial value remains on the screen
    expect(screen.getByText(initial)).toBeVisible();
    // the replacement value is not displayed on the screen
    await waitFor(() => {
      expect(screen.queryByText(replacement)).toBeNull();
    });
  });

  it("lets you submit your changes", async () => {
    const initial = "303-909-8080",
      replacement = "202-867-5309";

    const authState = { ...initialAuthState, updatePhoneNumber: jest.fn() };
    authState.userProfile.userData.phoneNumber = initial;

    UserDataApi.updatePhoneNumber = jest.fn();

    render(
      <AppContext.Provider
        value={{
          ...authState,
        }}
      >
        <Router history={history}>
          <UserPage />
        </Router>
      </AppContext.Provider>
    );

    // click Edit button to start editing
    fireEvent.click(screen.getByText("Edit", { selector: "button" }));
    // change the value in the input
    fireEvent.change(screen.getByLabelText("Phone Number"), {
      target: { value: replacement },
    });
    // click Apply button to persist changes
    fireEvent.click(screen.getByText("Apply", { selector: "button" }));

    // check that updatePhoneNumber was called with email (id) and replacement phone number
    await waitFor(() => {
      expect(UserDataApi.updatePhoneNumber).toBeCalledWith(
        authState.userProfile.email,
        replacement
      );
    });

    // this action should NOT show a success alert
    expect(
      screen.queryByText(ALERTS_MSG.SUBMISSION_SUCCESS.text, { exact: false })
    ).toBe(null);
  });

  it("displays the Add button when a user has no initial phone number", async () => {
    const authState = { ...initialAuthState, updatePhoneNumber: jest.fn() };

    // ensure no phoneNumber will exist in the data
    delete authState.userProfile.userData.phoneNumber;

    render(
      <AppContext.Provider
        value={{
          ...authState,
        }}
      >
        <Router history={history}>
          <UserPage />
        </Router>
      </AppContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("Add", { selector: "button" })).toBeVisible();
    });
  });

  it("displays the Add button when a user removes their existing phone number", async () => {
    const initial = "303-909-8080",
      replacement = "";

    const authState = { ...initialAuthState, updatePhoneNumber: jest.fn() };
    authState.userProfile.userData.phoneNumber = initial;

    render(
      <AppContext.Provider
        value={{
          ...authState,
        }}
      >
        <Router history={history}>
          <UserPage />
        </Router>
      </AppContext.Provider>
    );

    // remove the phone number
    fireEvent.click(screen.getByText("Edit", { selector: "button" }));
    fireEvent.change(screen.getByLabelText("Phone Number"), {
      target: { value: replacement },
    });
    fireEvent.click(screen.getByText("Apply", { selector: "button" }));

    // check for the Add button
    await waitFor(() => {
      expect(screen.getByText("Add", { selector: "button" })).toBeVisible();
    });
  });

  it("opens the edit mode with Apply and Cancel buttons after clicking the Add button", async () => {
    const authState = { ...initialAuthState, updatePhoneNumber: jest.fn() };
    delete authState.userProfile.userData.phoneNumber;

    render(
      <AppContext.Provider
        value={{
          ...authState,
        }}
      >
        <Router history={history}>
          <UserPage />
        </Router>
      </AppContext.Provider>
    );

    fireEvent.click(screen.getByText("Add", { selector: "button" }));

    // checks for Apply and Cancel buttons
    await waitFor(() => {
      expect(screen.getByText("Apply", { selector: "button" })).toBeVisible();
      expect(screen.getByText("Cancel", { selector: "button" })).toBeVisible();
    });
  });
});
