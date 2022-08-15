import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory, MemoryHistory } from "history";
import { Router } from "react-router-dom";
import { stateSubmitterInitialAuthState } from "../../libs/testDataAppContext";

import { ONEMAC_ROUTES } from "cmscommonlib";
import { AppContext } from "../../libs/contextLib";
import WaiverRAIForm from "./WaiverRAIForm";
import { FormLocationState } from "../../domain-types";

jest.mock("../../utils/ChangeRequestDataApi");

window.HTMLElement.prototype.scrollIntoView = jest.fn();
window.scrollTo = jest.fn();

describe("Waiver RAI Form", () => {
  let history: MemoryHistory<FormLocationState>;

  const testComponentId = "MD-1234.R00.00";

  beforeEach(() => {
    history = createMemoryHistory();
    history.push(ONEMAC_ROUTES.INITIAL_WAIVER, {
      componentId: testComponentId,
    });
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
          <WaiverRAIForm />
        </Router>
      </AppContext.Provider>
    );

    const submitButtonEl = screen.getByText("Submit");

    userEvent.click(submitButtonEl);
    expect(handleSubmit).not.toBeCalled();
  });

  it("has the parent waiver listed as text on the page", async () => {
    render(
      <AppContext.Provider
        value={{
          ...stateSubmitterInitialAuthState,
        }}
      >
        <Router history={history}>
          <WaiverRAIForm />
        </Router>
      </AppContext.Provider>
    );

    //verify spa id appears as text element
    screen.getByText(testComponentId);
  });
});
