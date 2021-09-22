import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, screen } from "@testing-library/react";

import { AppContext } from "../libs/contextLib";
import { Header } from "./Header";

jest.mock("aws-amplify", () => ({
  Auth: {
    configure: () => ({ oauth: { domain: "" } }),
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

  it.each(["Dashboard", "Packages", "User Management"])(
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
    ${"Dashboard"}       | ${"statesubmitter"}
    ${"User Management"} | ${"cmsroleapprover"}
  `(
    "renders a link to $linkName when user is authenticated and has access",
    ({ linkName, userType }) => {
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

      expect(screen.getByText(linkName, { selector: "a" })).toBeVisible();
    }
  );

  it.each`
    linkName             | userType
    ${"Dashboard"}       | ${"cmsroleapprover"}
    ${"User Management"} | ${"statesubmitter"}
  `(
    "does not render a link to $linkName when user is authenticated but does not have access",
    ({ linkName, userType }) => {
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

      expect(screen.queryByText(linkName, { selector: "a" })).toBeNull();
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

  it("renders a Log out button when authenticated but no user type is present", () => {
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

    expect(screen.getByText("Log out", { selector: "a" })).toBeVisible();
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
});
