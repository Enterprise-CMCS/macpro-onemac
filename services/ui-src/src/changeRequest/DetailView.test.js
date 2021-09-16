import React from "react";
import { render, screen } from "@testing-library/react";
import { Route, Router } from "react-router-dom";
import { createMemoryHistory } from "history";

import { AppContext } from "../libs/contextLib";
import DetailView from "./DetailView";

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

describe("Detail View Tests", () => {
  let history;
  beforeEach(() => {
    history = createMemoryHistory();
    history.push("/profile");
  });

  it("renders", () => {
    render(
      <AppContext.Provider
        value={{
          ...initialAuthState,
        }}
      >
        <Router history={history}>
          <Route path="/detail/spahhh/2398423924/MI-11-1111">
            <DetailView />
          </Route>
        </Router>
      </AppContext.Provider>
    );
  });
});
