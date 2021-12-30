import React from "react";

import { render, screen, act } from "@testing-library/react";
import { AppContext } from "../libs/contextLib";
import { stateUserNoAuthState } from "../libs/testDataAppContext";
import { createMemoryHistory } from "history";
import { StateSignup } from "./StateSignup";
import { Router, Route } from "react-router-dom";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe("StateSignup", () => {
  let history;

  beforeEach(() => {
    history = createMemoryHistory();
  });

  it("locates role and defines it", () => {
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
  });

  it("renders a state list array", () => {
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
    const stateList = screen.getByRole("list");
    expect(stateList).toBeVisible();
    const stateOption = screen.getByRole("option", { name: "Alabama" });
    expect(stateOption).toBeVisible();
  });
});
