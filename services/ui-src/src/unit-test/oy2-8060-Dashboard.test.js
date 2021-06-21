import React from "react";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";

import { AppContext } from "../libs/contextLib";
import {
  stateUserDeniedInitialAuthState,
  stateUserRevokedInitialAuthState,
  stateAdminRevokedInitialAuthState,
  stateAdminDeniedInitialAuthState,
  cmsApproverDeniedInitialAuthState,
  cmsApproverRevokedInitialAuthState,
} from "../libs/testDataAppContext";
import Dashboard from "../containers/Dashboard";

jest.mock("../utils/ChangeRequestDataApi");

const stateUserRevokedDeniedMsg =
  "Sorry, you don't have access. Please contact the State System Admin with any questions or visit your user profile for more information.";
const stateAdminRevokedDeniedMsg =
  "Sorry, you don't have access. Please contact the CMS Role Approver with any questions, or visit your user profile for more information.";
const cmsApproverRevokedDeniedMsg =
  "Sorry, you don't have access. Please contact the CMS System Admin with any questions";
const cmsApproverRevokedDeniedMsgProfileLink = "href=";

it("renders CMS Approver Denied Message", async () => {
  const promise = Promise.resolve([{ isLoading: false }]);

  render(
    <AppContext.Provider
      value={{
        ...cmsApproverDeniedInitialAuthState,
      }}
    >
      <Dashboard />
    </AppContext.Provider>,
    { wrapper: MemoryRouter }
  );

  screen.getByText(cmsApproverRevokedDeniedMsg, { exact: false }).click();

  await act(() => promise);
});
