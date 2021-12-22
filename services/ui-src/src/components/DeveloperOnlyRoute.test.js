import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AppContext } from "../libs/contextLib";
import { createMemoryHistory } from "history";
import { Router, Route } from "react-router-dom";
import DeveloperOnlyRoute from "./DeveloperOnlyRoute";

let history = createMemoryHistory();
jest.mock("aws-amplify");

beforeEach(() => {
  history = createMemoryHistory();
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Developer Only Route", () => {
  it("asserts that a user is logged in as a developer", async () => {
    render(
      <AppContext.Provider
        value={{
          isLoggedInAsDeveloper: true,
        }}
      >
        <Router history={history}>
          <Route>
            <DeveloperOnlyRoute>
              <div data-testid="testMockDiv">Mock</div>
            </DeveloperOnlyRoute>
          </Route>
        </Router>
      </AppContext.Provider>,
      { wrapper: MemoryRouter }
    );
    const testDiv = screen.getByTestId("testMockDiv");
    expect(testDiv).toBeVisible();
  });

  it("asserts that a user isn't logged in as a developer and drops them on home page", async () => {
    render(
      <AppContext.Provider
        value={{
          isLoggedInAsDeveloper: false,
        }}
      >
        <Router history={history}>
          <Route>
            <DeveloperOnlyRoute />
          </Route>
        </Router>
      </AppContext.Provider>,
      { wrapper: MemoryRouter }
    );
    const emptyDiv = screen.getByTestId("emptyDiv");
    expect(emptyDiv).toBeVisible();
  });
});
