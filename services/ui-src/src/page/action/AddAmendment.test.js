import React from "react";
import { Router, Route } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";

import AddAmendment from "./AddAmendment";

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
        <AddAmendment theComponent={testComponent} />
      </Route>
    </Router>
  );
  expect(
    screen.getByRole("link", { name: "Add Amendment" })
  ).toBeInTheDocument();
});
