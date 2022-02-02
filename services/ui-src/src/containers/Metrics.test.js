import React from "react";
import { act } from "react-dom/test-utils";
import { render } from "@testing-library/react";
import { Auth } from "aws-amplify";

import { AppContext } from "../libs/contextLib";
import Metrics from "./Metrics";

import ChangeRequestDataApi from "../utils/ChangeRequestDataApi";

jest.mock("aws-amplify");
jest.mock("../utils/config", () => ({ METRICS_USERS: "" }));
jest.mock("../utils/ChangeRequestDataApi");

beforeEach(() => {
  Auth.currentAuthenticatedUser.mockResolvedValueOnce({ attributes: {} });
});

it("renders without crashing", () => {
  render(
    <AppContext.Provider value={{}}>
      <Metrics />
    </AppContext.Provider>
  );
});

it("renders without crashing when authenticated", async () => {
  ChangeRequestDataApi.getAllByAuthorizedTerritories.mockResolvedValueOnce({
    stateTotals: {},
  });

  render(
    <AppContext.Provider value={{ isAuthenticated: true }}>
      <Metrics />
    </AppContext.Provider>
  );

  await act(async () => {});
});

it("does not crash when data is malformed", async () => {
  ChangeRequestDataApi.getAllByAuthorizedTerritories.mockResolvedValueOnce({});

  render(
    <AppContext.Provider value={{ isAuthenticated: true }}>
      <Metrics />
    </AppContext.Provider>
  );

  await act(async () => {});
});
