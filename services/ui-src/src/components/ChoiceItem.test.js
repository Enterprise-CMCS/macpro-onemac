import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

import { render } from "@testing-library/react";
import ChoiceItem from "./ChoiceItem";

const history = createMemoryHistory();

const choice = {
  title: "Medicaid SPA",
  description: "Submit new Medicaid State Plan Amendment",
  linkTo: "/spa",
};

describe("ChoiceItem", () => {
  it("renders without crashing", () => {
    render(
      <Router history={history}>
        <ChoiceItem {...choice} />
      </Router>
    );
  });
});
