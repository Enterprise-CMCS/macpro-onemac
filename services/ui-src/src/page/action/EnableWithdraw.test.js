import React from "react";
import { Router, Route } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";

import EnableWithdraw from "./EnableWithdraw";

const testComponent = {
  componentId: "ComponentID",
  componentType: "ComponentType",
};

let history;
history = createMemoryHistory();

it("renders", async () => {
  render(
    <Router history={history}>
      <Route>
        <EnableWithdraw theComponent={testComponent} />
      </Route>
    </Router>
  );
  expect(
    screen.getByRole("link", { name: "Enable Formal RAI Response Withdraw" })
  ).toBeInTheDocument();
});
