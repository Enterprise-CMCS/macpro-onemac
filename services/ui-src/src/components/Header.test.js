import React from "react";
import { MemoryRouter } from "react-router-dom";

import { render } from "@testing-library/react";
import { AppContext } from "../libs/contextLib";
import { stateSubmitterInitialAuthState } from "../libs/testDataAppContext";
import Header from "./Header";

describe("Header", () => {
  it("renders without crashing", () => {
    render(
      <AppContext.Provider
        value={{
          ...stateSubmitterInitialAuthState,
        }}
      >
        <Header />
      </AppContext.Provider>,
      { wrapper: MemoryRouter }
    );
  });
});
