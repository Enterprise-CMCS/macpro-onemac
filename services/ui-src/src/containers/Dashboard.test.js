import React from "react";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";

import { ROUTES } from "cmscommonlib";
import { AppContext } from "../libs/contextLib";
import { stateSubmitterInitialAuthState } from "../libs/testDataAppContext";
import ChangeRequestDataApi from "../utils/ChangeRequestDataApi";
import Dashboard from "./Dashboard";

jest.mock("../utils/ChangeRequestDataApi");

it("renders with a New Submission button", async () => {
  const promise = Promise.resolve([]);
  ChangeRequestDataApi.getAllByAuthorizedTerritories.mockImplementationOnce(
    () => promise
  );

  render(
    <AppContext.Provider
      value={{
        ...stateSubmitterInitialAuthState,
      }}
    >
      <Dashboard />
    </AppContext.Provider>,
    { wrapper: MemoryRouter }
  );

  const newSubmissionButton = screen.getByText("New Submission");
  expect(newSubmissionButton.getAttribute("href")).toBe(
    ROUTES.NEW_SUBMISSION_SELECTION
  );
  await act(() => promise);
});
