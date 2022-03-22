import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { stateSubmitterInitialAuthState } from "../libs/testDataAppContext";

import { AppContext } from "../libs/contextLib";
import DetailView from "./DetailView";
import PackageApi from "../utils/PackageApi";
import { LOADER_TEST_ID } from "../components/LoadingScreen";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // use actual for all non-hook parts
  useParams: () => {
    return {
      componentType: "waivernew",
      componentTimestamp: 1647640764590,
      packageId: "MI.83420",
    };
  },
}));

jest.mock("../utils/PackageApi");

const waiverDetail = require("./mock-data/MockWaiverDetail.json");

const ContextWrapper = ({ children }) => {
  return (
    <MemoryRouter>
      <AppContext.Provider
        value={{
          ...stateSubmitterInitialAuthState,
        }}
      >
        {children}
      </AppContext.Provider>
    </MemoryRouter>
  );
};

window.HTMLElement.prototype.scrollIntoView = jest.fn();

describe("Detail View Tests", () => {
  it("shows Temporary Extension table for waivers", async () => {
    PackageApi.getDetail.mockResolvedValue(waiverDetail);

    let history;
    history = createMemoryHistory();
    history.push("/detail/waivernew/MI.83420");

    render(
      <AppContext.Provider
        value={{
          ...stateSubmitterInitialAuthState,
        }}
      >
        <Router history={history}>
          <DetailView />
        </Router>
      </AppContext.Provider>
    );

    // render(<DetailView />, { wrapper: ContextWrapper });

    // wait for loading screen to disappear
    await waitForElementToBeRemoved(() => screen.getByTestId(LOADER_TEST_ID));

    userEvent.click(screen.getByRole("link", { name: "Temporary Extension" }));

    // await waitFor(() => {
    //   expect(screen.getByRole('heading', { name: 'Temporary Extensions'})).toBeInTheDocument()
    // });
  });
});
