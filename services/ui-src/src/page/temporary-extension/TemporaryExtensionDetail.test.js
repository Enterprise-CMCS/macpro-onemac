import React from "react";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { Router, Route } from "react-router-dom";
import { createMemoryHistory } from "history";
import { stateSubmitterInitialAuthState } from "../../libs/testDataAppContext";

import { AppContext } from "../../libs/contextLib";
import TemporaryExtensionDetail from "./TemporaryExtensionDetail";
import PackageApi from "../../utils/PackageApi";
import { LOADER_TEST_ID } from "../../components/LoadingScreen";

jest.mock("../../utils/PackageApi");

const temporaryExtensionDetail = require("./testTemporaryExtension");

window.HTMLElement.prototype.scrollIntoView = jest.fn();

describe("Temporary Extension Detail Tests", () => {
  it("shows Temporary Extension details", async () => {
    PackageApi.getDetail.mockResolvedValue(temporaryExtensionDetail);

    let history;
    history = createMemoryHistory();
    history.push("/detail/temporary-extension/MI.83420.R00.TE01");

    render(
      <AppContext.Provider
        value={{
          ...stateSubmitterInitialAuthState,
        }}
      >
        <Router history={history}>
          <Route path="/detail/temporary-extension/:componentId">
            <TemporaryExtensionDetail />
          </Route>
        </Router>
      </AppContext.Provider>
    );

    // wait for loading screen to disappear
    await waitForElementToBeRemoved(() => screen.getByTestId(LOADER_TEST_ID));

    // verify temporary extension type is displayed
    await screen.findByText("Temporary Extension Type");
    await screen.findByText("1915(b) Temporary Extension");
  });
});
