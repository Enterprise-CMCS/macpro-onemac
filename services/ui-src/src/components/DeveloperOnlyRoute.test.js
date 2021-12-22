import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AppContext } from "../libs/contextLib";

import DeveloperOnlyRoute from "./DeveloperOnlyRoute";

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
        <DeveloperOnlyRoute>
          <div data-testid="testMockDiv">Mock</div>
        </DeveloperOnlyRoute>
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
        <DeveloperOnlyRoute />
      </AppContext.Provider>,
      { wrapper: MemoryRouter }
    );
    const emptyDiv = screen.getByTestId("emptyDiv");
    expect(emptyDiv).toBeVisible();
  });
});
