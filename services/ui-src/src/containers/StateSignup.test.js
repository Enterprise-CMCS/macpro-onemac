import React from "react";

import { render, screen } from "@testing-library/react";
import { AppContext } from "../libs/contextLib";
import { stateUserNoAuthState } from "../libs/testDataAppContext";
import { createMemoryHistory } from "history";
import { StateSignup } from "./StateSignup";
import { Router, Route } from "react-router-dom";
import { MemoryRouter } from "react-router-dom";

describe("StateSignup", () => {
  let history;

  beforeEach(() => {
    history = createMemoryHistory();
  });

  it("renders user role and makes sure a list is visible", () => {
    const route = "mockPath/mocksignup/mockstate";
    history.push(route, { role: "State Submitter" });

    render(
      <AppContext.Provider
        value={{
          ...stateUserNoAuthState,
        }}
      >
        <Router history={history}>
          <Route path="/mockPath/:signup/:State">
            <StateSignup role="state submitter" />
          </Route>
        </Router>
      </AppContext.Provider>,
      { wrapper: MemoryRouter }
    );
    const stateSignup = screen.getByText("User Role:");
    expect(stateSignup).toBeVisible();
    const userRole = screen.getByText("State Submitter");
    expect(userRole).toBeVisible();
    const stateList = screen.getByRole("list");
    expect(stateList).toBeVisible();
    const stateOption = screen.getByRole("option", { name: "Alabama" });
    expect(stateOption).toBeVisible();
  });
});
