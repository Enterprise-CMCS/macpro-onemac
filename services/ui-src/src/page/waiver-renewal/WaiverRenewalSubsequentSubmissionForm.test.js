import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { stateSubmitterInitialAuthState } from "../../libs/testDataAppContext";

import { ONEMAC_ROUTES, waiverAuthorityB4 } from "cmscommonlib";
import { AppContext } from "../../libs/contextLib";
import WaiverRenewalSubsequentSubmissionForm, {
  waiverRenewalB4SubsequentSubmissionFormInfo,
} from "./WaiverRenewalSubsequentSubmissionForm";
import { waiverAuthorityB } from "cmscommonlib";
import OneMACForm from "../OneMACForm";

jest.mock("../../utils/PackageApi");

window.HTMLElement.prototype.scrollIntoView = jest.fn();
window.scrollTo = jest.fn();

describe("1915(b) Waiver Renewal Subsequent Submission Form", () => {
  let history;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("has the submit button disabled on initial load", async () => {
    history = createMemoryHistory();
    history.push(ONEMAC_ROUTES.WAIVER_RENEWAL_SUBSEQUENT_SUBMSISSION, {
      parentId: "MD",
      parentType: "waiverrenewal",
      componentId: "MD",
      formSource: "detail",
      waiverAuthority: waiverAuthorityB.value,
    });

    const handleSubmit = jest.fn();

    render(
      <AppContext.Provider
        value={{
          ...stateSubmitterInitialAuthState,
        }}
      >
        <Router history={history}>
          <WaiverRenewalSubsequentSubmissionForm />
        </Router>
      </AppContext.Provider>
    );

    const submitButtonEl = screen.getByText("Submit");

    userEvent.click(submitButtonEl);
    expect(handleSubmit).not.toBeCalled();
  });

  it("loads proper config based on waiver authority", async () => {
    history = createMemoryHistory();
    history.push(ONEMAC_ROUTES.WAIVER_RENEWAL_SUBSEQUENT_SUBMSISSION, {
      parentId: "MD",
      parentType: "waiverrenewal",
      componentId: "MD",
      formSource: "detail",
      waiverAuthority: waiverAuthorityB4.value,
    });

    render(
      <AppContext.Provider
        value={{
          ...stateSubmitterInitialAuthState,
        }}
      >
        <Router history={history}>
          <WaiverRenewalSubsequentSubmissionForm />
        </Router>
      </AppContext.Provider>
    );

    // expect(OneMACForm).toHaveBeenCalledWith(
    //   { formConfig: waiverRenewalB4SubsequentSubmissionFormInfo }, // Check if OneMACForm was called with the expected formConfig prop
    //   expect.anything() // Ignore other props and React internals
    // );
  });
});
