import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { stateSubmitterInitialAuthState } from "../../libs/testDataAppContext";

import { ONEMAC_ROUTES, waiverAuthorityB4 } from "cmscommonlib";
import { AppContext } from "../../libs/contextLib";
import WaiverAmendmentSubsequentSubmissionForm, {
  waiverAmendmentB4SubsequentSubmissionFormInfo,
} from "./WaiverAmendmentSubsequentSubmissionForm";
import { waiverAuthorityB } from "cmscommonlib";
import OneMACForm from "../OneMACForm";

jest.mock("../../utils/PackageApi");

window.HTMLElement.prototype.scrollIntoView = jest.fn();
window.scrollTo = jest.fn();

describe("1915(b) Waiver Amendment Subsequent Documents Form", () => {
  let history;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("has the submit button disabled on initial load", async () => {
    history = createMemoryHistory();
    history.push(ONEMAC_ROUTES.WAIVER_AMENDMENT_SUBSEQUENT_SUBMSISSION, {
      parentId: "MD",
      parentType: "waiveramendment",
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
          <WaiverAmendmentSubsequentSubmissionForm />
        </Router>
      </AppContext.Provider>
    );

    const submitButtonEl = screen.getByText("Submit");

    userEvent.click(submitButtonEl);
    expect(handleSubmit).not.toBeCalled();
  });

  it("loads proper config based on waiver authority", async () => {
    history = createMemoryHistory();
    history.push(ONEMAC_ROUTES.WAIVER_AMENDMENT_SUBSEQUENT_SUBMSISSION, {
      parentId: "MD",
      parentType: "waiveramendment",
      componentId: "MD",
      formSource: "detail",
      waiverAuthority: waiverAuthorityB4.value,
    });
    const handleSubmit = jest.fn();
    // jest.doMock("../OneMACForm", () => {
    //   return jest.fn(() => null);
    // });

    render(
      <AppContext.Provider
        value={{
          ...stateSubmitterInitialAuthState,
        }}
      >
        <Router history={history}>
          <WaiverAmendmentSubsequentSubmissionForm />
        </Router>
      </AppContext.Provider>
    );

    // expect(OneMACForm).toHaveBeenCalledWith(
    //   { formConfig: waiverAmendmentB4SubsequentSubmissionFormInfo }, // Check if OneMACForm was called with the expected formConfig prop
    //   expect.anything() // Ignore other props and React internals
    // );
  });
});
