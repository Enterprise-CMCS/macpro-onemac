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
import WaiverAmendmentDetail from "./WaiverAmendmentDetail";
import PackageApi from "../../utils/PackageApi";
import { LOADER_TEST_ID } from "../../components/LoadingScreen";

jest.mock("../../utils/PackageApi");

const testWaiverAmendmentDetail = require("./testWaiverAmendmentDetail");

window.HTMLElement.prototype.scrollIntoView = jest.fn();

describe("Waiver Renewal Detail Tests", () => {
  it("shows Waiver Renewal details", async () => {
    PackageApi.getDetail.mockResolvedValue(testWaiverAmendmentDetail);

    let history;
    history = createMemoryHistory();
    history.push("/detail/waiver-amendment/MI-83420.R00.01");

    render(
      <AppContext.Provider
        value={{
          ...stateSubmitterInitialAuthState,
        }}
      >
        <Router history={history}>
          <Route path="/detail/waiver-amendment/:componentId">
            <WaiverAmendmentDetail />
          </Route>
        </Router>
      </AppContext.Provider>
    );

    // wait for loading screen to disappear
    await waitForElementToBeRemoved(() => screen.getByTestId(LOADER_TEST_ID));
  });
});
