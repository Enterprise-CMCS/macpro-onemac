import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { stateSubmitterInitialAuthState } from "../../libs/testDataAppContext";

import { ONEMAC_ROUTES } from "cmscommonlib";
import MedicaidSPARAIForm from "./MedicaidSPARAIForm";
import { AppContext } from "../../libs/contextLib";

jest.mock("../../utils/ChangeRequestDataApi");

window.HTMLElement.prototype.scrollIntoView = jest.fn();
window.scrollTo = jest.fn();

describe("Medicaid SPA RAI Form", () => {
  let history;

  const testComponentId = "MD-1234";

  beforeEach(() => {
    history = createMemoryHistory();
    history.push(ONEMAC_ROUTES.MEDICAID_SPA_RAI, {
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
          <MedicaidSPARAIForm />
        </Router>
      </AppContext.Provider>
    );

    const submitButtonEl = screen.getByText("Submit");

    userEvent.click(submitButtonEl);
    expect(handleSubmit).not.toBeCalled();
  });
});
