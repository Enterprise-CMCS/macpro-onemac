import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { stateSubmitterInitialAuthState } from "../../libs/testDataAppContext";

import { ONEMAC_ROUTES } from "cmscommonlib";
import WaiverAmendmentForm from "./WaiverAmendmentForm";
import PackageApi from "../../utils/PackageApi";
import { AppContext } from "../../libs/contextLib";
import PackageApi from "../../utils/PackageApi";

jest.mock("../../utils/PackageApi");
jest.mock("../../utils/PackageApi");

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

    PackageApi.packageExists.mockResolvedValue(false);

    userEvent.type(transmittalNumberEl, testID);
    await waitFor(() => expect(transmittalNumberEl.value).toBe(testID));

    expect(submitButtonEl).toBeDisabled();
  });

  it("displays additional id error messages on invalid id", async () => {
    const testID = "MD-1234";

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

    const idNumberEl = screen.getByLabelText("1915(b) Waiver Amendment Number");

    PackageApi.packageExists.mockResolvedValue(false);

    userEvent.type(idNumberEl, testID);
    await waitFor(() => expect(idNumberEl.value).toBe(testID));

    screen.getByText(
      "For amendments, the last two digits start with ‘01’ and ascends."
    );
  });

  it("displays parent not found message on invalid parent id", async () => {
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

    const idNumberEl = screen.getByLabelText("Existing Waiver Number to Amend");

    PackageApi.validateParent.mockResolvedValue(false);

    userEvent.type(idNumberEl, testID);
    await waitFor(() => expect(idNumberEl.value).toBe(testID));

    screen.getByText(
      "The waiver number entered does not appear to match our records. Please enter an approved initial or renewal waiver number, using a dash after the two character state abbreviation."
    );
  });
});
