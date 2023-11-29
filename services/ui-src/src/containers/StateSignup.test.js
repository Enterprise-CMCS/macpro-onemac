import React from "react";
import { Router, Route, MemoryRouter } from "react-router-dom";
import { createMemoryHistory } from "history";
import { act, render, screen } from "@testing-library/react";
import selectEvent from "react-select-event";
import { RESPONSE_CODE } from "cmscommonlib";

import { AppContext } from "../libs/contextLib";
import { stateUserNoAuthState } from "../libs/testDataAppContext";
import { StateSignup } from "./StateSignup";
import UserDataApi from "../utils/UserDataApi";

jest.mock("../utils/UserDataApi");

UserDataApi.requestAccess.mockResolvedValue(RESPONSE_CODE.USER_SUBMITTED);

import userEvent from "@testing-library/user-event";

describe("StateSignup", () => {
  let history;

  beforeEach(() => {
    history = createMemoryHistory();
  });

  beforeEach(() => {
    const route = "/signup/state";
    history.push(route, { role: "State Submitter" });
    render(
      <AppContext.Provider
        value={{
          ...stateUserNoAuthState,
        }}
      >
        <Router history={history}>
          <Route path="/signup/state">
            <StateSignup />
          </Route>
        </Router>
      </AppContext.Provider>,
      { wrapper: MemoryRouter }
    );
  });

  it("renders user role and makes sure a list is visible", () => {
    const stateSignup = screen.getByText("User Role:");
    expect(stateSignup).toBeVisible();
    const userRole = screen.getByText("State Submitter");
    expect(userRole).toBeVisible();
    const stateDropdown = screen.getByRole("combobox");
    expect(stateDropdown).toBeVisible();
    selectEvent.openMenu(stateDropdown);
    const stateList = screen.getByRole("list");
    expect(stateList).toBeVisible();
    // const stateOption = screen.getByRole("option", { name: "Alabama" });
    // expect(stateOption).toBeVisible();
    // selectEvent.select(stateDropdown, "Alabama");
  });

  it("locates cancel button and invokes cancel confirmation box", async () => {
    expect(history.location.pathname).toBe("/signup/state");
    const cancelConfirmButton = screen.getByRole("button", { name: "Cancel" });
    act(() => {
      userEvent.click(cancelConfirmButton);
    });
    const cancelConfirmBox = screen.getByRole("dialog");
    expect(cancelConfirmBox).toBeVisible();
    const confirmDialogButton = screen.getByRole("button", {
      name: /confirm/i,
    });
    act(() => {
      userEvent.click(confirmDialogButton);
    });
    expect(cancelConfirmBox).not.toBeVisible();
  });

  it("creates the correct signup callback", async () => {
    expect(history.location.pathname).toBe("/signup/state");
    const submitButton = screen.getByRole("button", { name: "Submit" });
    act(() => {
      userEvent.click(submitButton);
    });
    expect(history.location.pathname).toBe("/signup/state");
  });
});
