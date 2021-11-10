import React from "react";
import { render, screen } from "@testing-library/react";
import { AppContext } from "../libs/contextLib";
import {
  cmsUserNoAuthState,
  stateUserNoAuthState,
} from "../libs/testDataAppContext";
import { createMemoryHistory } from "history";
import { Signup } from "./Signup";
import { Router } from "react-router-dom";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

let history = createMemoryHistory();

it("renders the new cms user options", async () => {
  render(
    <AppContext.Provider
      value={{
        ...cmsUserNoAuthState,
        isLoggedInAsDeveloper: true,
      }}
    >
      <Router history={history}>
        <Signup />
      </Router>
    </AppContext.Provider>,
    { wrapper: MemoryRouter }
  );
  const cmsReviewerOption = screen.getByText("CMS Reviewer");
  const cmsRoleApproverOption = screen.getByText("CMS Role Approver");
  expect(cmsReviewerOption).toBeInTheDocument();
  expect(cmsRoleApproverOption).toBeInTheDocument();
  userEvent.click(cmsReviewerOption);
  expect(history.location.pathname).toBe("/signup/cmsreviewer");
});

history = createMemoryHistory();

it("only renders the new cms role approver option when logged in normally", async () => {
  render(
    <AppContext.Provider
      value={{
        ...cmsUserNoAuthState,
      }}
    >
      <Router history={history}>
        <Signup />
      </Router>
    </AppContext.Provider>,
    { wrapper: MemoryRouter }
  );
  const cmsReviewerOption = screen.queryByText("CMS Reviewer");
  const cmsRoleApproverOption = screen.getByText("CMS Role Approver");
  expect(cmsReviewerOption).toBeNull();
  expect(cmsRoleApproverOption).toBeInTheDocument();
});

history = createMemoryHistory();

it("renders the state user options", async () => {
  render(
    <AppContext.Provider
      value={{
        ...stateUserNoAuthState,
      }}
    >
      <Router history={history}>
        <Signup />
      </Router>
    </AppContext.Provider>,
    { wrapper: MemoryRouter }
  );
  const stateSubmitterOption = screen.getByText("State Submitter");
  const stateAdminOption = screen.getByText("State System Administrator");
  expect(stateSubmitterOption).toBeInTheDocument();
  expect(stateAdminOption).toBeInTheDocument();
  userEvent.click(stateSubmitterOption);
  expect(history.location.pathname).toBe("/signup/state");
});
