import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { stateSubmitterInitialAuthState } from "../../libs/testDataAppContext";

import { ONEMAC_ROUTES } from "cmscommonlib";
import { AppContext } from "../../libs/contextLib";
import MedicaidSPASubsequentSubmissionForm from "./MedicaidSPASubsequentSubmissionForm";

jest.mock("../../utils/PackageApi");

window.HTMLElement.prototype.scrollIntoView = jest.fn();
window.scrollTo = jest.fn();

describe("Medicaid SPA Subsequent Submission Form", () => {
  let history;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("has the submit button disabled on initial load", async () => {
    history = createMemoryHistory();
    history.push(ONEMAC_ROUTES.MEDICAID_SPA_SUBSEQUENT_SUBMSISSION, {
      parentId: "MD",
      parentType: "medicaidspa",
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
          <MedicaidSPASubsequentSubmissionForm />
        </Router>
      </AppContext.Provider>
    );

    const submitButtonEl = screen.getByText("Submit");

    userEvent.click(submitButtonEl);
    expect(handleSubmit).not.toBeCalled();
  });
});
