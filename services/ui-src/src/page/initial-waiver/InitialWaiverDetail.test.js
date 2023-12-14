import React from "react";
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";

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

it("shows Additional Information section", async () => {
  // PackageApi.getDetail.mockResolvedValue(waiverDetail);
  // let history;
  // history = createMemoryHistory();
  // history.push("/detail/initial-waiver/MD-39253.R00.00");
  // render(
  //   <AppContext.Provider
  //     value={{
  //       ...stateSubmitterInitialAuthState,
  //     }}
  //   >
  //     <Router history={history}>
  //       <Route path="/detail/initial-waiver/:componentId">
  //         <InitialWaiverDetail />
  //       </Route>
  //     </Router>
  //   </AppContext.Provider>
  // );
  // // wait for loading screen to disappear
  // await waitForElementToBeRemoved(() => screen.getByTestId(LOADER_TEST_ID));
  // await waitFor(() => {
  //   expect(
  //     screen.getByText("Additional Information", { selector: "h2" })
  //   ).toBeInTheDocument();
  // });
});
