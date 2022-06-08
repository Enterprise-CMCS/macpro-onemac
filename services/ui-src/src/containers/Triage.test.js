import React from "react";
import { render } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

import { ONEMAC_ROUTES } from "cmscommonlib";
import Triage from "./Triage";

describe("triage component functionality", () => {
  it("renders without a crash", () => {
    const history = createMemoryHistory();
    history.push(ONEMAC_ROUTES.TRIAGE_GROUP);

    render(
      <Router history={history}>
        <Triage />
      </Router>
    );
  });
});
