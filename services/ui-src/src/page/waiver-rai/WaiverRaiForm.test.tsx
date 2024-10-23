import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { stateSubmitterInitialAuthState } from "../../libs/testDataAppContext";

import { ONEMAC_ROUTES } from "cmscommonlib";
import { AppContext } from "../../libs/contextLib";
import WaiverRAIForm from "./WaiverRAIForm";

jest.mock("../../utils/PackageApi");

window.HTMLElement.prototype.scrollIntoView = jest.fn();
window.scrollTo = jest.fn();

describe("Waiver RAI Form", () => {
  const testComponentId = "MD-1234.R00.00";
  const initialEntries = [
    {
      pathname: ONEMAC_ROUTES.WAIVER_RAI,
      state: { componentId: testComponentId },
    },
  ];

  it("has the submit button disabled on initial load", async () => {
    const handleSubmit = jest.fn();

    render(
      <AppContext.Provider
        value={{
          ...stateSubmitterInitialAuthState,
        }}
      >
        <MemoryRouter initialEntries={initialEntries}>
          <WaiverRAIForm />
        </MemoryRouter>
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
        <MemoryRouter initialEntries={initialEntries}>
          <WaiverRAIForm />
        </MemoryRouter>
      </AppContext.Provider>
    );

    //verify spa id appears as text element
    screen.getByText(testComponentId);
  });
});
