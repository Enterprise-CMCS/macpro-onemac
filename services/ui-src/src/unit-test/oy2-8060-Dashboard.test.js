import React, {useState} from "react";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";

import { AppContext } from "../libs/contextLib";
import { stateUserDeniedInitialAuthState, stateUserRevokedInitialAuthState } from "../libs/testDataAppContext";
import Dashboard from "../containers/Dashboard";

jest.mock("../utils/ChangeRequestDataApi");

it("renders state user Denied Message", async () => {
  const promise = Promise.resolve([{isLoading: false}]);

  render(
      <AppContext.Provider
          value={{
            ...stateUserDeniedInitialAuthState,
          }}
      >
        <Dashboard />
      </AppContext.Provider>,
      { wrapper: MemoryRouter }
  );

  screen.getByText("Sorry, you don't have access. Please contact the State System Admin with any questions or visit your user profile for more information.");
  await act(() => promise);

});

it("renders state user Revoked Message", async () => {
    const promise = Promise.resolve([{isLoading: false}]);

    render(
        <AppContext.Provider
            value={{
                ...stateUserRevokedInitialAuthState,
            }}
        >
            <Dashboard />
        </AppContext.Provider>,
        { wrapper: MemoryRouter }
    );

    screen.getByText("Sorry, you don't have access. Please contact the State System Admin with any questions or visit your user profile for more information.");
    await act(() => promise);

});
