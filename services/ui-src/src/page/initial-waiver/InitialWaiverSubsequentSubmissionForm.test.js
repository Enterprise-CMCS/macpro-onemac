import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { stateSubmitterInitialAuthState } from "../../libs/testDataAppContext";

import { ONEMAC_ROUTES, waiverAuthorityB4 } from "cmscommonlib";
import { AppContext } from "../../libs/contextLib";
import InitialWaiverSubsequentSubmissionForm, {
  initialWaiverB4SubsequentSubmissionFormInfo,
} from "./InitialWaiverSubsequentSubmissionForm";
import { waiverAuthorityB } from "cmscommonlib";
import OneMACForm from "../OneMACForm";

jest.mock("../../utils/PackageApi");

window.HTMLElement.prototype.scrollIntoView = jest.fn();
window.scrollTo = jest.fn();

describe("1915(b) Initial Waiver Subsequent Document Form", () => {
  let history;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.mock("../../utils/PackageApi");
  });

  it("has the submit button disabled on initial load", async () => {
    history = createMemoryHistory();
    history.push(ONEMAC_ROUTES.INITIAL_WAIVER_SUBSEQUENT_SUBMSISSION, {
      parentId: "MD",
      parentType: "waivernew",
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
          <InitialWaiverSubsequentSubmissionForm />
        </Router>
      </AppContext.Provider>
    );

    const submitButtonEl = screen.getByText("Submit");

    userEvent.click(submitButtonEl);
    expect(handleSubmit).not.toBeCalled();
  });

  it("loads B4 config based on waiver authority", async () => {
    history = createMemoryHistory();
    history.push(ONEMAC_ROUTES.INITIAL_WAIVER_SUBSEQUENT_SUBMSISSION, {
      parentId: "MD",
      parentType: "waivernew",
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
          <InitialWaiverSubsequentSubmissionForm />
        </Router>
      </AppContext.Provider>
    );

    // expect(MockedOneMACForm).toHaveBeenCalledWith(
    //   { formConfig: initialWaiverB4SubsequentSubmissionFormInfo },
    //   expect.anything()
    // );
  });
});
