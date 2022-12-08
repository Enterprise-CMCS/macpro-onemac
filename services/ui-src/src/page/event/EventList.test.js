import React from "react";
//import { act } from "react-dom/test-utils";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";

import { AppContext } from "../../libs/contextLib";
import { systemAdminInitialAuthState } from "../../libs/testDataAppContext";
import { testEventList } from "../../libs/testDataEvent";

import PackageApi from "../../utils/PackageApi";

import { LOADER_TEST_ID } from "../../components/LoadingScreen";
import EventList from "./EventList";

jest.mock("../../utils/PackageApi");
window.HTMLElement.prototype.scrollIntoView = jest.fn();

const ContextWrapper = ({ children }) => {
  return (
    <MemoryRouter>
      <AppContext.Provider
        value={{
          ...systemAdminInitialAuthState,
        }}
      >
        {children}
      </AppContext.Provider>
    </MemoryRouter>
  );
};

it("renders table with event columns", async () => {
  PackageApi.getTopic.mockResolvedValue(testEventList);

  render(<EventList />, { wrapper: ContextWrapper });

  // wait for loading screen to disappear so package table displays
  await waitForElementToBeRemoved(() => screen.getByTestId(LOADER_TEST_ID));

  screen.getByText("ID");
  screen.getByText("Status");
  screen.getByText("Changed Date");
});
