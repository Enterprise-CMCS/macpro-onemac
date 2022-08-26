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
import WaiverAppendixKDetail from "./WaiverAppendixKDetail";
import PackageApi from "../../utils/PackageApi";
import { LOADER_TEST_ID } from "../../components/LoadingScreen";

jest.mock("../../utils/PackageApi");

const testWaiverAppendixKDetail = require("./testWaiverAppendixKDetail");

window.HTMLElement.prototype.scrollIntoView = jest.fn();

describe("Waiver Appendix K Detail Tests", () => {
  it("shows Waiver Appendix K Details", async () => {
    PackageApi.getDetail.mockResolvedValue(testWaiverAppendixKDetail);

    let history;
    history = createMemoryHistory();
    history.push("/detail/waiver-app-k/MD-13150.R00.01");

    render(
      <AppContext.Provider
        value={{
          ...stateSubmitterInitialAuthState,
        }}
      >
        <Router history={history}>
          <Route path="/detail/waiver-app-k/:componentId">
            <WaiverAppendixKDetail />
          </Route>
        </Router>
      </AppContext.Provider>
    );

    // wait for loading screen to disappear
    await waitForElementToBeRemoved(() => screen.getByTestId(LOADER_TEST_ID));
  });
});
