import React from "react";
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";

import userEvent from "@testing-library/user-event";
import { Router, Route } from "react-router-dom";
import { createMemoryHistory } from "history";
import { stateSubmitterInitialAuthState } from "../../libs/testDataAppContext";

import { AppContext } from "../../libs/contextLib";
import InitialWaiverDetail from "./InitialWaiverDetail";
import PackageApi from "../../utils/PackageApi";
import { LOADER_TEST_ID } from "../../components/LoadingScreen";

jest.mock("../../utils/PackageApi");

const waiverDetail = require("./testInitialWaiver");

window.HTMLElement.prototype.scrollIntoView = jest.fn();

describe("Detail View Tests", () => {
  it("shows Temporary Extension link in side nav for waivers", async () => {
    PackageApi.getDetail.mockResolvedValue(waiverDetail);

    let history;
    history = createMemoryHistory();
    history.push("/detail/initial-waiver/MI.83420");

    render(
      <AppContext.Provider
        value={{
          ...stateSubmitterInitialAuthState,
        }}
      >
        <Router history={history}>
          <Route path="/detail/initial-waiver/:componentId">
            <InitialWaiverDetail />
          </Route>
        </Router>
      </AppContext.Provider>
    );

    // wait for loading screen to disappear
    await waitForElementToBeRemoved(() => screen.getByTestId(LOADER_TEST_ID));

    await waitFor(() => {
      expect(
        screen.getByRole("link", { name: "Temporary Extension" })
      ).toBeInTheDocument();
    });
  });

  it("shows Temporary Extension page for waivers", async () => {
    PackageApi.getDetail.mockResolvedValue(waiverDetail);

    let history;
    history = createMemoryHistory();
    history.push("/detail/initial-waiver/MI.83420#temp-extension");

    render(
      <AppContext.Provider
        value={{
          ...stateSubmitterInitialAuthState,
        }}
      >
        <Router history={history}>
          <Route path="/detail/:componentType/:componentId">
            <InitialWaiverDetail />
          </Route>
        </Router>
      </AppContext.Provider>
    );

    // wait for loading screen to disappear
    await waitForElementToBeRemoved(() => screen.getByTestId(LOADER_TEST_ID));

    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: "Temporary Extensions" })
      ).toBeInTheDocument();
    });
  });

  it("allows withdraw of temp extension", async () => {
    PackageApi.getDetail.mockResolvedValue(waiverDetail);
    PackageApi.withdraw.mockResolvedValue("WP000");

    let history;
    history = createMemoryHistory();
    history.push("/detail/initial-waiver/MI.83420#temp-extension");

    render(
      <AppContext.Provider
        value={{
          ...stateSubmitterInitialAuthState,
        }}
      >
        <Router history={history}>
          <Route path="/detail/:componentType/:componentId">
            <InitialWaiverDetail />
          </Route>
        </Router>
      </AppContext.Provider>
    );

    // wait for loading screen to disappear
    await waitForElementToBeRemoved(() => screen.getByTestId(LOADER_TEST_ID));

    userEvent.click(
      screen.getByRole("button", { name: "Actions for MD.83420.R00.TE01" })
    );
    await waitFor(() => screen.getByRole("menuitem", { name: "Withdraw Package" }));
    userEvent.click(screen.getByRole("menuitem", { name: "Withdraw Package" }));
    await waitFor(() => screen.getByRole("button", { name: "Yes, withdraw package" }));
    userEvent.click(screen.getByRole("button", { name: "Yes, withdraw package" }));

    await waitFor(() =>
      expect(document.getElementById("alert-bar")).toHaveTextContent(
        "Your submission package has successfully been withdrawn."
      )
    );
  });
});
