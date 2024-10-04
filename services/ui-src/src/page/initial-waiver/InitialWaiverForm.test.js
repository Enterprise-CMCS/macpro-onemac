import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { stateSubmitterInitialAuthState } from "../../libs/testDataAppContext";

import { ONEMAC_ROUTES } from "cmscommonlib";
import WaiverInitialB4Form from "./InitialWaiverB4Form";
import WaiverInitialBForm from "./InitialWaiverBForm";
import PackageApi from "../../utils/PackageApi";
import { AppContext } from "../../libs/contextLib";
import OneMACForm from "../OneMACForm";
import { defaultOneMACFormConfig} from "../../libs/formLib";
import { initialWaiverB4 } from "cmscommonlib";
import { initialWaiverFormConfig } from "../initial-waiver/initialWaiverFormConfig";
jest.mock("../../utils/PackageApi");

window.HTMLElement.prototype.scrollIntoView = jest.fn();
window.scrollTo = jest.fn();

 const initialWaiverB4FormInfo = {
  ...defaultOneMACFormConfig,
  ...initialWaiverB4,
  ...initialWaiverFormConfig,
};

describe("1915(b) Initial Waiver Form", () => {
  let history;

  beforeEach(() => {
    history = createMemoryHistory();
    history.push(ONEMAC_ROUTES.WAIVER_INITIAL_B4);
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
          <WaiverInitialB4Form />
        </Router>
      </AppContext.Provider>
    );

    const submitButtonEl = screen.getByText("Submit");

    userEvent.click(submitButtonEl);
    expect(handleSubmit).not.toBeCalled();
  });

  it("stays disabled even with valid ID", async () => {
    const testID = "MD-1234.R00.00";

    render(
      <AppContext.Provider
        value={{
          ...stateSubmitterInitialAuthState,
        }}
      >
        <Router history={history}>
          <WaiverInitialBForm />
        </Router>
      </AppContext.Provider>
    );

    const submitButtonEl = screen.getByText("Submit");
    expect(submitButtonEl).toBeDisabled();

    const transmittalNumberEl = screen.getByLabelText("Initial Waiver Number");

    PackageApi.packageExists.mockResolvedValue(false);

    userEvent.type(transmittalNumberEl, testID);
    await waitFor(() => expect(transmittalNumberEl.value).toBe(testID));

    expect(submitButtonEl).toBeDisabled();
  });

  it("has the submit button disabled on initial load xyz", async () => {
    const handleSubmit = jest.fn();

    render(
      <AppContext.Provider
        value={{
          ...stateSubmitterInitialAuthState,
        }}
      >
        <Router history={history}>
          <OneMACForm formConfig={initialWaiverB4FormInfo} />
        </Router>
      </AppContext.Provider>
    );

    // console.log("***************")
    // console.log("******************")
    // console.log
    const submitButtonEl = screen.getByText("Submit");

    userEvent.click(submitButtonEl);
    expect(handleSubmit).not.toBeCalled();
  });
});
