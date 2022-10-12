import React from "react";
import { Router, Route } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";

import { AppContext } from "../../libs/contextLib";
import Withdraw from "./Withdraw";

import { stateSubmitterInitialAuthState } from "../../libs/testDataAppContext";

const testComponent = {
  componentId: "ComponentID",
  componentType: "ComponentType",
};

let history;
history = createMemoryHistory();
//history.push("/detail/waiver-renewal/MI-83420.R01.00");

it("renders", async () => {
  render(
    <AppContext.Provider
      value={{
        ...stateSubmitterInitialAuthState,
      }}
    >
      <Router history={history}>
        <Route>
          <Withdraw theComponent={testComponent} />
        </Route>
      </Router>
    </AppContext.Provider>
  );
  expect(
    screen.getByRole("link", { name: "Withdraw Package" })
  ).toBeInTheDocument();
});
