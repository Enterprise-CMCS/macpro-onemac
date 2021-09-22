import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render } from "@testing-library/react";

import { Header } from "./Header";

jest.mock("aws-amplify", () => ({
  Auth: {
    configure: () => ({ oauth: { domain: "" } }),
  },
}));

const history = createMemoryHistory();

it("renders without crashing", () => {
  render(
    <Router history={history}>
      <Header />
    </Router>
  );
});
