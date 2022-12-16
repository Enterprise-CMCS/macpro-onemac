import React from "react";
import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { systemAdminInitialAuthState } from "../libs/testDataAppContext";

import { ROUTES } from "cmscommonlib";
import DescribeForms from "./DescribeForms";
import { AppContext } from "../libs/contextLib";

describe("Describe Forms page", () => {
  let history;

  beforeEach(() => {
    history = createMemoryHistory();
    history.push(ROUTES.INITIAL_WAIVER);
  });

  it("The describe forms page renders", async () => {
    render(
      <AppContext.Provider
        value={{
          ...systemAdminInitialAuthState,
        }}
      >
        <Router history={history}>
          <DescribeForms />
        </Router>
      </AppContext.Provider>
    );
    const summaryEl = screen.getByText("Package View", {
      exact: false,
    });
    expect(
      screen.getByText("Package View", {
        exact: false,
      })
    ).toBeInTheDocument();
  });
});
