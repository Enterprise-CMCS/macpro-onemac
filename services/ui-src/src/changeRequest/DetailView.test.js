import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";

import { AppContext } from "../libs/contextLib";
import DetailView from "./DetailView";
import PackageApi from "../utils/PackageApi";
jest.mock("../utils/PackageApi");

jest.mock("react-router-dom", () => ({
  useParams: () => {
    return {
      componentType: "spa",
      componentTimestamp: 16746532223,
      packageId: "MI-11-1111",
    };
  },
  useHistory: jest.fn(),
}));

const initialAuthState = {
  isAuthenticating: false,
  isAuthenticated: true,
  isLoggedInAsDeveloper: false,
  isValidRoute: true,
  userProfile: {
    cmsRoles: "onemac-state-user",
    email: "statesubmitteractive@cms.hhs.local",
    firstName: "Unit",
    lastName: "Tester",
    userData: {
      firstName: "Unita",
      lastName: "Goodcode",
      attributes: [],
      id: "statesubmitteractive@cms.hhs.local",
      type: "statesubmitter",
      validRoutes: ["/", "/profile"],
    },
  },
};

describe("Detail View Tests", () => {
  let history;
  beforeEach(() => {
    history = createMemoryHistory();
    history.push("/detail/spahhh/2398423924/MI-11-1111");
  });

  it("renders", async () => {
    PackageApi.getDetail.mockResolvedValue({});

    render(
      <AppContext.Provider
        value={{
          ...initialAuthState,
        }}
      >
        <DetailView />
      </AppContext.Provider>
    );

    await waitFor(() =>
      expect(screen.getByText("Medicaid SPA Details", { selector: "h1" }))
    );
  });
});
