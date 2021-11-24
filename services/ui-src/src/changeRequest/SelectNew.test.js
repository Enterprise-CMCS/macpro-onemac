import React from "react";
import { render } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

import NewSubmission from "./NewSubmission";
import NewSPA from "./NewSPA";
import NewWaiver from "./NewWaiver";

describe("main new submission menu", () => {
  it("renders without a crash", () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <NewSubmission />
      </Router>
    );
  });

  it.todo("navigates to SPA menu when SPA button is clicked");
  it.todo("navigates to waiver menu when waiver button is clicked");
});

describe("new SPA menu", () => {
  it("renders without a crash", () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <NewSPA />
      </Router>
    );
  });

  it.todo(
    "navigates to Medicaid SPA form when when Medicaid SPA button is clicked"
  );
  it.todo("navigates to CHIP SPA form when when CHIP SPA button is clicked");
});

describe("waiver submission menu", () => {
  it("renders without a crash", () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <NewWaiver />
      </Router>
    );
  });

  it.todo("navigates to Waiver Action form when selected");
  it.todo("navigates to Temp Extension form when selected");
  it.todo("navigates to Appendix K form when selected");
});
