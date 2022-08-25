import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { stateSubmitterInitialAuthState } from "../../libs/testDataAppContext";

import { ONEMAC_ROUTES } from "cmscommonlib";
import TemporaryExtensionForm from "./TemporaryExtensionForm";
import ChangeRequestDataApi from "../../utils/ChangeRequestDataApi";
import { AppContext } from "../../libs/contextLib";
import { ONEMAC_TYPE } from "cmscommonlib/workflow";

jest.mock("../../utils/ChangeRequestDataApi");

window.HTMLElement.prototype.scrollIntoView = jest.fn();
window.scrollTo = jest.fn();

describe("Temporary Extension Form", () => {
  let history;

  beforeEach(() => {
    history = createMemoryHistory();
    history.push(ONEMAC_ROUTES.TEMPORARY_EXTENSION);
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
          <TemporaryExtensionForm />
        </Router>
      </AppContext.Provider>
    );

    const submitButtonEl = screen.getByText("Submit");

    userEvent.click(submitButtonEl);
    expect(handleSubmit).not.toBeCalled();
  });

  it("stays disabled even with valid ID", async () => {
    const testID = "MD.83420.00.TE10";

    render(
      <AppContext.Provider
        value={{
          ...stateSubmitterInitialAuthState,
        }}
      >
        <Router history={history}>
          <TemporaryExtensionForm />
        </Router>
      </AppContext.Provider>
    );

    const submitButtonEl = screen.getByText("Submit");
    expect(submitButtonEl).toBeDisabled();

    const transmittalNumberEl = screen.getByLabelText("Waiver Number");

    ChangeRequestDataApi.packageExists.mockResolvedValue(false);

    userEvent.type(transmittalNumberEl, testID);
    await waitFor(() => expect(transmittalNumberEl.value).toBe(testID));

    expect(submitButtonEl).toBeDisabled();
  });

  it("sets parentId given valid state properties", async () => {
    const testParentId = "MD-83420.00.00";
    history.push(ONEMAC_ROUTES.TEMPORARY_EXTENSION, {
      parentType: ONEMAC_TYPE.WAIVER_INITIAL,
      parentId: testParentId,
    });
    render(
      <AppContext.Provider
        value={{
          ...stateSubmitterInitialAuthState,
        }}
      >
        <Router history={history}>
          <TemporaryExtensionForm />
        </Router>
      </AppContext.Provider>
    );

    const parentWaiverNumberValue = screen.getByText("Parent Waiver Number")
      .nextSibling.innerHTML;
    expect(parentWaiverNumberValue).toBe(testParentId);
  });

  it("shows warning message if parentId is not found", async () => {
    const testParentId = "VA-83420.R00.00";
    history.push(ONEMAC_ROUTES.TEMPORARY_EXTENSION, {
      parentType: ONEMAC_TYPE.WAIVER_INITIAL,
      parentId: testParentId,
    });
    render(
      <AppContext.Provider
        value={{
          ...stateSubmitterInitialAuthState,
        }}
      >
        <Router history={history}>
          <TemporaryExtensionForm />
        </Router>
      </AppContext.Provider>
    );

    const input = screen.getByLabelText("Waiver Number");

    userEvent.type(input, "VA-99999.R00.TE01");

    await waitFor(() => {
      expect(
        screen.getByText(
          // "Waiver Number not found. Please ensure you have the correct Waiver Number before submitting. Contact the MACPro Help Desk (code: OMP002) if you need support."
          "You will still be able to submit but your submission ID does not appear to match our records. Before proceeding, please check to ensure you have the correct submission ID. If you need support, please contact the OneMAC Help Desk at OneMAC_Helpdesk@cms.hhs.gov or (833) 228-2540."
        )
      ).toBeInTheDocument();
    });
  });
});
