import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { stateSubmitterInitialAuthState } from "../../libs/testDataAppContext";

import { ONEMAC_ROUTES, waiverAuthorityB4 } from "cmscommonlib";
import { AppContext } from "../../libs/contextLib";
import WaiverAppKSubsequentSubmissionForm from "./WaiverAppKSubsequentSubmissionForm";
import { waiverAuthorityB } from "cmscommonlib";

jest.mock("../../utils/PackageApi");

window.HTMLElement.prototype.scrollIntoView = jest.fn();
window.scrollTo = jest.fn();

describe("1915(c) Waiver Appendix K Subsequent Documents Form", () => {
  let history;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("has the submit button disabled on initial load", async () => {
    history = createMemoryHistory();
    history.push(ONEMAC_ROUTES.WAIVER_APP_K_SUBSEQUENT_SUBMSISSION, {
      parentId: "MD",
      parentType: "waiverappk",
      componentId: "MD",
      formSource: "detail",
    });

    const handleSubmit = jest.fn();

    render(
      <AppContext.Provider
        value={{
          ...stateSubmitterInitialAuthState,
        }}
      >
        <Router history={history}>
          <WaiverAppKSubsequentSubmissionForm />
        </Router>
      </AppContext.Provider>
    );

    const submitButtonEl = screen.getByText("Submit");

    userEvent.click(submitButtonEl);
    expect(handleSubmit).not.toBeCalled();
  });
});
