import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { AppContext } from "./libs/contextLib";
import UserDataApi from "./utils/UserDataApi";
import { Routes } from "./Routes";

jest.mock("./utils/UserDataApi");

it("renders successfully", () => {
  UserDataApi.userProfile.mockResolvedValueOnce({
    type: "statesubmitter",
    validRoutes: ["/"],
  });

  render(
    <MemoryRouter>
      <Routes />
    </MemoryRouter>
  );
});

it("renders when given authenticated flag", () => {
  UserDataApi.userProfile.mockResolvedValueOnce({
    type: "statesubmitter",
    validRoutes: ["/"],
  });

  render(
    <MemoryRouter>
      <AppContext.Provider value={{ isAuthenticated: true }}>
        <Routes />
      </AppContext.Provider>
    </MemoryRouter>
  );
});
