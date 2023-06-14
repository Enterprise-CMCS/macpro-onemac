import React from "react";
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { stateSubmitterInitialAuthState } from "../libs/testDataAppContext";

import { ONEMAC_ROUTES } from "cmscommonlib";
import OneMACForm from "./OneMACForm";
import PackageApi from "../utils/PackageApi";
import { AppContext } from "../libs/contextLib";
import { medicaidSpaFormInfo } from "./medicaid-spa/MedicaidSpaForm";

jest.mock("../utils/PackageApi");

window.HTMLElement.prototype.scrollIntoView = jest.fn();
window.scrollTo = jest.fn();

describe("OneMAC Form", () => {
  let history;

  beforeEach(() => {
    history = createMemoryHistory();
    history.push(ONEMAC_ROUTES.MEDICAID_SPA);
  });

  it("Additional Information Section does not exceed character limit", async () => {
    const testValues = {
      //4001 char string
      additionalInformation:
        "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",
    };
    render(
      <AppContext.Provider
        value={{
          ...stateSubmitterInitialAuthState,
        }}
      >
        <Router history={history}>
          <OneMACForm formConfig={medicaidSpaFormInfo} />
        </Router>
      </AppContext.Provider>
    );
    const summaryEl = screen.getByLabelText("Additional Information", {
      exact: false,
    });
    expect(summaryEl.value).toBe("");
    userEvent.type(summaryEl, testValues.additionalInformation);
    expect(summaryEl.maxLength).toBe(4000);
    expect(summaryEl.value.length).toBeLessThan(
      testValues.additionalInformation.length
    );
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
          <OneMACForm formConfig={medicaidSpaFormInfo} />
        </Router>
      </AppContext.Provider>
    );

    const submitButtonEl = screen.getByText("Submit");

    userEvent.click(submitButtonEl);
    expect(handleSubmit).not.toBeCalled();
  });

  it("stays disabled even with valid ID", async () => {
    const testID = "MI-22-0088";

    render(
      <AppContext.Provider
        value={{
          ...stateSubmitterInitialAuthState,
        }}
      >
        <Router history={history}>
          <OneMACForm formConfig={medicaidSpaFormInfo} />
        </Router>
      </AppContext.Provider>
    );

    const submitButtonEl = screen.getByText("Submit");
    expect(submitButtonEl).toBeDisabled();

    const transmittalNumberEl = screen.getByLabelText("SPA ID");

    PackageApi.packageExists.mockResolvedValue(false);

    userEvent.type(transmittalNumberEl, testID);
    await waitFor(() => expect(transmittalNumberEl.value).toBe(testID));

    expect(submitButtonEl).toBeDisabled();
  });

  it("does not clear already completed form fields if submit fails.", async () => {
    const testValues = {
      transmittalNumber: "MI-17-2340",
    };

    render(
      <AppContext.Provider
        value={{
          ...stateSubmitterInitialAuthState,
        }}
      >
        <Router history={history}>
          <OneMACForm formConfig={medicaidSpaFormInfo} />
        </Router>
      </AppContext.Provider>
    );

    const transmittalNumberEl = screen.getByLabelText("SPA ID");
    const submitButtonEl = screen.getByText("Submit");

    // values start out empty
    expect(transmittalNumberEl.value).toBe("");

    // Find the package
    PackageApi.packageExists.mockResolvedValue(true);
    userEvent.type(transmittalNumberEl, testValues.transmittalNumber);
    await screen.findByText(
      `According to our records, this SPA ID already exists. Please check the SPA ID and try entering it again.`
    );
    expect(transmittalNumberEl.value).toBe(testValues.transmittalNumber);

    // click the submit button
    userEvent.click(submitButtonEl);
    // await screen.findByText("Missing Required Attachments");

    // the transmittal number still contains the value
    expect(transmittalNumberEl.value).toBe(testValues.transmittalNumber);
  });
});

describe("Component Id Section", () => {
  let history;

  beforeEach(() => {
    history = createMemoryHistory();
    history.push(ONEMAC_ROUTES.MEDICAID_SPA);
  });

  it("populates the component id as a display only value when passed in as a state variable", async () => {
    const testComponentId = "MI-11-0099";
    PackageApi.packageExists.mockResolvedValue(false);

    history.push({
      pathname: ONEMAC_ROUTES.MEDICAID_SPA,
      state: { componentId: testComponentId },
    });

    render(
      <AppContext.Provider
        value={{
          ...stateSubmitterInitialAuthState,
        }}
      >
        <Router history={history}>
          <OneMACForm formConfig={medicaidSpaFormInfo} />
        </Router>
      </AppContext.Provider>
    );

    await screen.findByText(testComponentId);
  });

  it("informs user that they cannot submit for an unauthorized territory", async () => {
    const territoryMessage = `You can only submit for a state you have access to. If you need to add another state, visit your user profile to request access.`;
    const invalidFormatId = "SS-32-0010";

    render(
      <AppContext.Provider
        value={{
          ...stateSubmitterInitialAuthState,
        }}
      >
        <Router history={history}>
          <OneMACForm formConfig={medicaidSpaFormInfo} />
        </Router>
      </AppContext.Provider>
    );

    const transmittalNumberEl = screen.getByLabelText("SPA ID");

    userEvent.type(transmittalNumberEl, invalidFormatId);
    await waitFor(() => screen.getByText(territoryMessage));
  });

  it("displays error message when the format id is invalid (but not when it's valid)", async () => {
    const formatMessage = `The SPA ID must be in the format of SS-YY-NNNN or SS-YY-NNNN-xxxx`;
    const invalidFormatId = "MI-12";
    const validFormatId = "MI-11-8900";

    PackageApi.packageExists.mockResolvedValue(false);

    render(
      <AppContext.Provider
        value={{
          ...stateSubmitterInitialAuthState,
        }}
      >
        <Router history={history}>
          <OneMACForm formConfig={medicaidSpaFormInfo} />
        </Router>
      </AppContext.Provider>
    );

    const transmittalNumberEl = screen.getByLabelText("SPA ID");

    // status message shows when INVALID id format is put in
    userEvent.type(transmittalNumberEl, invalidFormatId);
    await waitFor(() => screen.getByText(formatMessage));

    // status message is removed when VALID id format is put in
    userEvent.clear(transmittalNumberEl);
    userEvent.type(transmittalNumberEl, validFormatId);
    await waitForElementToBeRemoved(() => screen.queryByText(formatMessage));
  });

  it("displays error message when id SHOULD NOT exist but DOES", async () => {
    const testId = "MI-11-2200";
    const existErrorMessage = `According to our records, this SPA ID already exists. Please check the SPA ID and try entering it again.`;

    // id will exist
    PackageApi.packageExists.mockResolvedValue(true);

    render(
      <AppContext.Provider
        value={{
          ...stateSubmitterInitialAuthState,
        }}
      >
        <Router history={history}>
          <OneMACForm formConfig={medicaidSpaFormInfo} />
        </Router>
      </AppContext.Provider>
    );

    const transmittalNumberEl = screen.getByLabelText("SPA ID");

    userEvent.type(transmittalNumberEl, testId);
    await waitFor(() => screen.getByText(existErrorMessage));
  });
});

describe("cancelling the form submission", () => {
  let history;

  beforeEach(() => {
    history = createMemoryHistory();
    history.push(ONEMAC_ROUTES.MEDICAID_SPA);
  });

  it("keeps the form information if cancel is cancelled", async () => {
    const testValues = {
      transmittalNumber: "MI-17-23400",
      proposedEffectiveDate: "2022-04-01",
    };

    render(
      <AppContext.Provider
        value={{
          ...stateSubmitterInitialAuthState,
        }}
      >
        <Router history={history}>
          <OneMACForm formConfig={medicaidSpaFormInfo} />
        </Router>
      </AppContext.Provider>
    );

    const transmittalNumberEl = screen.getByLabelText("SPA ID");
    const proposedEffectiveEl = screen.getByLabelText(
      "Proposed Effective Date of Medicaid SPA"
    );
    const cancelButtonEl = screen.getByText("Cancel");

    // values start out empty
    expect(transmittalNumberEl.value).toBe("");
    expect(proposedEffectiveEl.value).toBe("");

    // Don't find the package
    PackageApi.packageExists.mockResolvedValue(false);
    userEvent.type(transmittalNumberEl, testValues.transmittalNumber);
    await expect(transmittalNumberEl.value).toBe(testValues.transmittalNumber);

    userEvent.type(proposedEffectiveEl, testValues.proposedEffectiveDate);
    await expect(proposedEffectiveEl.value).toBe(
      testValues.proposedEffectiveDate
    );

    // click the cancel button
    userEvent.click(cancelButtonEl);

    // the transmittal number still contains the value
    expect(transmittalNumberEl.value).toBe(testValues.transmittalNumber);
    expect(proposedEffectiveEl.value).toBe(testValues.proposedEffectiveDate);
  });

  it("keeps the form information if cancel is cancelled", async () => {
    const testValues = {
      transmittalNumber: "MI-17-2340",
      proposedEffectiveDate: "2022-04-01",
    };

    render(
      <AppContext.Provider
        value={{
          ...stateSubmitterInitialAuthState,
        }}
      >
        <Router history={history}>
          <OneMACForm formConfig={medicaidSpaFormInfo} />
        </Router>
      </AppContext.Provider>
    );

    const transmittalNumberEl = screen.getByLabelText("SPA ID");
    const proposedEffectiveEl = screen.getByLabelText(
      "Proposed Effective Date of Medicaid SPA"
    );
    const cancelButtonEl = screen.getByText("Cancel");

    // values start out empty
    expect(transmittalNumberEl.value).toBe("");
    expect(proposedEffectiveEl.value).toBe("");

    // Don't find the package
    PackageApi.packageExists.mockResolvedValue(false);
    userEvent.type(transmittalNumberEl, testValues.transmittalNumber);
    await expect(transmittalNumberEl.value).toBe(testValues.transmittalNumber);

    userEvent.type(proposedEffectiveEl, testValues.proposedEffectiveDate);
    await expect(proposedEffectiveEl.value).toBe(
      testValues.proposedEffectiveDate
    );

    // click the cancel button
    userEvent.click(cancelButtonEl);

    // the transmittal number still contains the value
    expect(transmittalNumberEl.value).toBe(testValues.transmittalNumber);
    expect(proposedEffectiveEl.value).toBe(testValues.proposedEffectiveDate);
  });
});
