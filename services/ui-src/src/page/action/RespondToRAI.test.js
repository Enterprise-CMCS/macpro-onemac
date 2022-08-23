import React from "react";
import { Router, Route } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";

import RespondToRAI from "./RespondToRAI";

const testComponent = {
  componentId: "ComponentID",
  componentType: "ComponentType",
};

let history;
history = createMemoryHistory();
//history.push("/detail/waiver-renewal/MI-83420.R01.00");

it("renders", async () => {
  render(
    <Router history={history}>
      <Route>
        <RespondToRAI theComponent={testComponent} />
      </Route>
    </Router>
  );
  expect(
    screen.getByRole("link", { name: "Respond to RAI" })
  ).toBeInTheDocument();
});
