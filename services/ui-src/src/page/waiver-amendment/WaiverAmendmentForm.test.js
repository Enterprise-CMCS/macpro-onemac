import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { stateSubmitterInitialAuthState } from "../../libs/testDataAppContext";

import { ONEMAC_ROUTES } from "cmscommonlib";
import WaiverAmendmentForm from "./WaiverAmendmentForm";
import ChangeRequestDataApi from "../../utils/ChangeRequestDataApi";
import { AppContext } from "../../libs/contextLib";

jest.mock("../../utils/ChangeRequestDataApi");

window.HTMLElement.prototype.scrollIntoView = jest.fn();
window.scrollTo = jest.fn();

describe("1915(b) Waiver Amendment Form", () => {
  let history;

  beforeEach(() => {
    history = createMemoryHistory();
    history.push(ONEMAC_ROUTES.WAIVER_AMENDMENT);
  });

  it("has the submit button disabled on initial load", async () => {
    const handleSubmit = jest.fn();

    render(
      <AppContext.Provider
        value={{
          ...stateSubmitterInitialAuthState,
        }}
      >
        <Router history={history}>
          <WaiverAmendmentForm />
        </Router>
      </AppContext.Provider>
    );

    const submitButtonEl = screen.getByText("Submit");

    userEvent.click(submitButtonEl);
    expect(handleSubmit).not.toBeCalled();
  });

  it("stays disabled even with valid ID", async () => {
    const testID = "MD-1234.R01.01";

    render(
      <AppContext.Provider
        value={{
          ...stateSubmitterInitialAuthState,
        }}
      >
        <Router history={history}>
          <WaiverAmendmentForm />
        </Router>
      </AppContext.Provider>
    );

    const submitButtonEl = screen.getByText("Submit");
    expect(submitButtonEl).toBeDisabled();

    const transmittalNumberEl = screen.getByLabelText(
      "1915(b) Waiver Amendment Number"
    );

    ChangeRequestDataApi.packageExists.mockResolvedValue(false);

    userEvent.type(transmittalNumberEl, testID);
    await waitFor(() => expect(transmittalNumberEl.value).toBe(testID));

    expect(submitButtonEl).toBeDisabled();
  });
});
