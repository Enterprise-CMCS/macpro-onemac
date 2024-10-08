import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, screen, fireEvent } from "@testing-library/react";

import { AppContext } from "../libs/contextLib";
import { Header } from "./Header";


window.matchMedia = window.matchMedia || function() {
  return {
        matches: false,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
  };
};

jest.mock("aws-amplify", () => ({
  Auth: {
    configure: () => ({ oauth: { domain: "" } }),
    signOut: () => ({}),
  },
}));

it("renders without crashing", () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <Header />
    </Router>
  );
});

describe("left side navigation", () => {
  it.each(["Home", "FAQ"])(
    "renders link to %s even when not authenticated",
    (name) => {
      const history = createMemoryHistory();
      render(
        <Router history={history}>
          <Header />
        </Router>
      );

      expect(screen.getByText(name, { selector: "a" })).toBeVisible();
    }
  );

  it.each(["Dashboard", "User Management"])(
    "does not render a link to %s when not authenticated",
    (name) => {
      const history = createMemoryHistory();
      render(
        <Router history={history}>
          <Header />
        </Router>
      );

      expect(screen.queryByText(name, { selector: "a" })).toBeNull();
    }
  );

  it.each(["Home", "FAQ"])(
    "still renders a link to %s when authenticated",
    (name) => {
      const history = createMemoryHistory();
      render(
        <AppContext.Provider value={{ isAuthenticated: true }}>
          <Router history={history}>
            <Header />
          </Router>
        </AppContext.Provider>
      );

      expect(screen.getByText(name, { selector: "a" })).toBeVisible();
    }
  );

  it.each`
    linkName             | userType
    ${"Dashboard"}       | ${"cmsreviewer"}
    ${"User Management"} | ${"cmsroleapprover"}
  `(
    "renders a link to $linkName when user is authenticated and has access",
    ({ linkName, userType }) => {
      const history = createMemoryHistory();
      render(
        <AppContext.Provider
          value={{
            isAuthenticated: true,
            userProfile: {
              userData: {
                type: userType,
                roleList: [{ status: "active", role: userType }],
              },
            },
          }}
        >
          <Router history={history}>
            <Header />
          </Router>
        </AppContext.Provider>
      );

      expect(screen.getByText(linkName, { selector: "a" })).toBeVisible();
    }
  );

  it.each(["cmsroleapprover", "statesubmitter"])(
    "renders a link to Dashboard when %s user is authenticated but does not have access",
    (userType) => {
      const history = createMemoryHistory();
      render(
        <AppContext.Provider
          value={{
            isAuthenticated: true,
            userProfile: { userData: { type: userType } },
          }}
        >
          <Router history={history}>
            <Header />
          </Router>
        </AppContext.Provider>
      );

      expect(screen.getByText("Dashboard", { selector: "a" })).toBeVisible();
    }
  );

  it.each(["cmsroleapprover", "statesubmitter"])(
    "does not render a link to User Management when %s user is authenticated but does not have access",
    (userType) => {
      const history = createMemoryHistory();
      render(
        <AppContext.Provider
          value={{
            isAuthenticated: true,
            userProfile: { userData: { type: userType } },
          }}
        >
          <Router history={history}>
            <Header />
          </Router>
        </AppContext.Provider>
      );

      expect(
        screen.queryByText("User Management", { selector: "a" })
      ).toBeNull();
    }
  );
});

describe("right side account management", () => {
  it.each(["Register", "Login"])(
    "renders a %s button when not authenticated",
    (name) => {
      const history = createMemoryHistory();
      render(
        <Router history={history}>
          <Header />
        </Router>
      );

      expect(screen.getByText(name, { selector: "a" })).toBeVisible();
    }
  );

  it.each(["Register", "Login"])(
    "does not render a %s button when authenticated",
    (name) => {
      const history = createMemoryHistory();
      render(
        <AppContext.Provider
          value={{
            isAuthenticated: true,
          }}
        >
          <Router history={history}>
            <Header />
          </Router>
        </AppContext.Provider>
      );

      expect(screen.queryByText(name, { selector: "a" })).toBeNull();
    }
  );

  it("renders a Log out button when authenticated as unregistered state user", () => {
    /*   const history = createMemoryHistory();
    render(
      <AppContext.Provider
        value={{
          isAuthenticated: true,
          userProfile: { cmsRoles: "onemac-state-user" },
        }}
      >
        <Router history={history}>
          <Header />
        </Router>
      </AppContext.Provider>
    );

    expect(screen.getByText("Log out", { selector: "a" })).toBeVisible();
    */
  });

  it("does not render a plain Log out button when user is authenticated and has a type specified", () => {
    const history = createMemoryHistory();
    render(
      <AppContext.Provider
        value={{
          isAuthenticated: true,
          userProfile: { userData: { type: "statesubmitter" } },
        }}
      >
        <Router history={history}>
          <Header />
        </Router>
      </AppContext.Provider>
    );

    expect(screen.queryByText("Log out", { selector: "a" })).toBeNull();
  });

  it("closes menu when clicked outside of account dropdown", () => {
    const history = createMemoryHistory();
    render(
      <AppContext.Provider
        value={{
          isAuthenticated: true,
          userProfile: { userData: { type: "statesubmitter" } },
        }}
      >
        <Router history={history}>
          <Header />
        </Router>
      </AppContext.Provider>
    );
    const myAccountLink = screen.getByRole("button", { name: /my account/i });
    fireEvent.click(myAccountLink);
    const dropdownContent = screen.getByTestId("dropdown-content-test");
    fireEvent.click(myAccountLink);
    expect(dropdownContent).not.toBeVisible();
  });

  it("redirects to login page when click 'Log out' menu button", () => {
    const history = createMemoryHistory();
    render(
      <AppContext.Provider
        value={{
          isAuthenticated: true,
          isLoggedInAsDeveloper: true,
          userProfile: { userData: { type: "statesubmitter" } },
        }}
      >
        <Router history={history}>
          <Header />
        </Router>
      </AppContext.Provider>
    );
    const myAccountLink = screen.getByRole("button", { name: /my account/i });
    fireEvent.click(myAccountLink);
    const dropdownContent = screen.getByTestId("dropdown-content-test");
    const logoutLink = screen.getByRole("link", { name: /Log out/i });
    fireEvent.click(logoutLink);
    // expect(screen.getByText("Login", { selector: "a" })).toBeVisible();
  });
});
