import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { AppContext } from "../libs/contextLib";
import UnauthenticatedRoute from "./UnauthenticatedRoute";

afterEach(() => {
  window.location.href = "";
});

it("renders without errors", () => {
  render(
    <MemoryRouter>
      <AppContext.Provider value={{}}>
        <UnauthenticatedRoute />
      </AppContext.Provider>
    </MemoryRouter>
  );
});

it("renders without errors when url has blank query string", () => {
  window.location.href = "#example?ok=yes&redirect=";
  render(
    <MemoryRouter>
      <AppContext.Provider value={{}}>
        <UnauthenticatedRoute />
      </AppContext.Provider>
    </MemoryRouter>
  );
});

it("renders without errors when url has query string", () => {
  window.location.href = "#example?ok=yes&redirect=somewhere";
  render(
    <MemoryRouter>
      <AppContext.Provider value={{}}>
        <UnauthenticatedRoute />
      </AppContext.Provider>
    </MemoryRouter>
  );
});

it("renders without errors when authenticated", () => {
  render(
    <MemoryRouter>
      <AppContext.Provider value={{ isAuthenticated: true }}>
        <UnauthenticatedRoute />
      </AppContext.Provider>
    </MemoryRouter>
  );
});
