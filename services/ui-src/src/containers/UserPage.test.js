import React from "react";
import { act } from "react-dom/test-utils";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

import { territoryMap, RESPONSE_CODE } from "cmscommonlib";

import { ALERTS_MSG } from "../libs/alertLib";
import { AppContext } from "../libs/contextLib";
import UserDataApi from "../utils/UserDataApi";
import UserPage, {
  ACCESS_LABELS,
  AccessDisplay,
  GroupDivisionDisplay,
  getUserGroup,
  ContactList,
} from "./UserPage";

jest.mock("../utils/UserDataApi");

const activeStateSubmitter = {
  firstName: "Unita",
  lastName: "Goodcode",
  attributes: [],
  id: "statesubmitteractive@cms.hhs.local",
  type: "statesubmitter",
  validRoutes: ["/", "/profile"],
};

const activeHelpDesk = {
  firstName: "Arthur",
  lastName: "Active",
  attributes: [
    {
      date: 1617149287,
      doneBy: "systemadmintest@cms.hhs.local",
      status: "active",
    },
  ],
  id: "helpdeskactive@cms.hhs.local",
  type: "helpdesk",
  validRoutes: ["/", "/profile"],
};

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
    userData: activeStateSubmitter,
  },
};

describe("Phone Number section", () => {
  let history;
  beforeEach(() => {
    history = createMemoryHistory();
    history.push("/profile");
  });

  it("lets you change the phone number", async () => {
    const initial = "303-909-8080";
    const replacement = "202-867-5309";

    const authState = { ...initialAuthState, updatePhoneNumber: jest.fn() };
    authState.userProfile.userData.phoneNumber = initial;

    render(
      <AppContext.Provider
        value={{
          ...authState,
        }}
      >
        <Router history={history}>
          <UserPage />
        </Router>
      </AppContext.Provider>
    );

    // click Edit button to start editing
    fireEvent.click(screen.getByText("Edit", { selector: "button" }));

    // find the input, which should be visible and enabled
    const phoneInputEl = screen.getByLabelText("Phone Number");
    expect(phoneInputEl).toBeVisible();
    expect(phoneInputEl).not.toBeDisabled();

    // change the value
    fireEvent.change(phoneInputEl, { target: { value: replacement } });

    // the component should allow that change and update the input element
    await waitFor(() => {
      expect(phoneInputEl).toHaveValue(replacement);
    });
  });

  it("lets you cancel your changes to the phone number", async () => {
    const initial = "303-909-8080",
      replacement = "202-867-5309";

    const authState = { ...initialAuthState, updatePhoneNumber: jest.fn() };
    authState.userProfile.userData.phoneNumber = initial;

    render(
      <AppContext.Provider
        value={{
          ...authState,
        }}
      >
        <Router history={history}>
          <UserPage />
        </Router>
      </AppContext.Provider>
    );

    // click Edit button to start editing
    fireEvent.click(screen.getByText("Edit", { selector: "button" }));
    // change the value in the input
    fireEvent.change(screen.getByLabelText("Phone Number"), {
      target: { value: replacement },
    });
    // click Cancel button to revert changes
    fireEvent.click(screen.getByText("Cancel", { selector: "button" }));

    // input is no longer there
    expect(screen.queryByLabelText("Phone Number")).toBeNull();
    // the initial value remains on the screen
    expect(screen.getByText(initial)).toBeVisible();
    // the replacement value is not displayed on the screen
    await waitFor(() => {
      expect(screen.queryByText(replacement)).toBeNull();
    });
  });

  it("lets you submit your changes", async () => {
    const initial = "303-909-8080",
      replacement = "202-867-5309";

    const authState = { ...initialAuthState, updatePhoneNumber: jest.fn() };
    authState.userProfile.userData.phoneNumber = initial;

    UserDataApi.updatePhoneNumber = jest.fn();

    render(
      <AppContext.Provider
        value={{
          ...authState,
        }}
      >
        <Router history={history}>
          <UserPage />
        </Router>
      </AppContext.Provider>
    );

    // click Edit button to start editing
    fireEvent.click(screen.getByText("Edit", { selector: "button" }));
    // change the value in the input
    fireEvent.change(screen.getByLabelText("Phone Number"), {
      target: { value: replacement },
    });
    // click Apply button to persist changes
    fireEvent.click(screen.getByText("Apply", { selector: "button" }));

    // check that updatePhoneNumber was called with email (id) and replacement phone number
    await waitFor(() => {
      expect(UserDataApi.updatePhoneNumber).toBeCalledWith(
        authState.userProfile.email,
        replacement
      );
    });

    // this action should NOT show a success alert
    expect(
      screen.queryByText(ALERTS_MSG.SUBMISSION_SUCCESS.text, { exact: false })
    ).toBe(null);
  });

  it("displays the Add button when a user has no initial phone number", async () => {
    const authState = { ...initialAuthState, updatePhoneNumber: jest.fn() };

    // ensure no phoneNumber will exist in the data
    delete authState.userProfile.userData.phoneNumber;

    render(
      <AppContext.Provider
        value={{
          ...authState,
        }}
      >
        <Router history={history}>
          <UserPage />
        </Router>
      </AppContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("Add", { selector: "button" })).toBeVisible();
    });
  });

  it("displays the Add button when a user removes their existing phone number", async () => {
    const initial = "303-909-8080",
      replacement = "";

    const authState = { ...initialAuthState, updatePhoneNumber: jest.fn() };
    authState.userProfile.userData.phoneNumber = initial;

    render(
      <AppContext.Provider
        value={{
          ...authState,
        }}
      >
        <Router history={history}>
          <UserPage />
        </Router>
      </AppContext.Provider>
    );

    // remove the phone number
    fireEvent.click(screen.getByText("Edit", { selector: "button" }));
    fireEvent.change(screen.getByLabelText("Phone Number"), {
      target: { value: replacement },
    });
    fireEvent.click(screen.getByText("Apply", { selector: "button" }));

    // check for the Add button
    await waitFor(() => {
      expect(screen.getByText("Add", { selector: "button" })).toBeVisible();
    });
  });

  it("opens the edit mode with Apply and Cancel buttons after clicking the Add button", async () => {
    const authState = { ...initialAuthState, updatePhoneNumber: jest.fn() };
    delete authState.userProfile.userData.phoneNumber;

    render(
      <AppContext.Provider
        value={{
          ...authState,
        }}
      >
        <Router history={history}>
          <UserPage />
        </Router>
      </AppContext.Provider>
    );

    fireEvent.click(screen.getByText("Add", { selector: "button" }));

    // checks for Apply and Cancel buttons
    await waitFor(() => {
      expect(screen.getByText("Apply", { selector: "button" })).toBeVisible();
      expect(screen.getByText("Cancel", { selector: "button" })).toBeVisible();
    });
  });
});

describe("group and division section", () => {
  it("renders nothing for a state submitter", () => {
    render(
      <GroupDivisionDisplay userData={initialAuthState.userProfile.userData} />
    );

    expect(screen.queryByText("Group & Division")).toBeNull();
  });

  it("renders group and division for a CMS reviewer", () => {
    const userData = {
      ...initialAuthState.userProfile.userData,
      type: "cmsreviewer",
      group: 3,
      division: 26,
    };
    const groupInfo = getUserGroup(userData);

    render(<GroupDivisionDisplay userData={userData} />);

    expect(screen.getByText("Group & Division")).toBeVisible();
    const groupHeader = screen.getByText("Group", { selector: "dt" });
    const divisionHeader = screen.getByText("Division", { selector: "dt" });
    expect(groupHeader).toBeVisible();
    expect(divisionHeader).toBeVisible();
    expect(groupHeader.parentNode).toContainElement(
      screen.getByText(groupInfo.group.name),
      { selector: "dd" }
    );
    expect(divisionHeader.parentNode).toContainElement(
      screen.getByText(groupInfo.division.name),
      { selector: "dd" }
    );
  });
});

describe("access section", () => {
  it("is titled Status for a Help Desk user", () => {
    const accesses = [];

    render(<AccessDisplay accesses={accesses} userType="helpdesk" />);

    const stateLabelEl = screen.getByText("Status", {
      selector: "h2",
    });
    expect(stateLabelEl).toBeVisible();
  });

  it("renders access entry per state for a state user", () => {
    const accesses = [
      { state: "UT", status: "pending" },
      { state: "NH", status: "active" },
    ];
    const selfRevoke = jest.fn();
    render(
      <AccessDisplay
        accesses={accesses}
        selfRevoke={selfRevoke}
        userType="statesubmitter"
      />
    );

    for (const { state, status } of accesses) {
      const stateLabelEl = screen.getByText(territoryMap[state], {
        selector: "dt",
      });
      expect(stateLabelEl).toBeVisible();
      expect(stateLabelEl.nextElementSibling.tagName).toBe("DD");
      expect(stateLabelEl.nextElementSibling).toHaveTextContent(
        ACCESS_LABELS[status]
      );
    }
    expect(selfRevoke).not.toBeCalled();
  });

  it("allows state submitter to self-revoke access", () => {
    const accesses = [
      { state: "UT", status: "pending" },
      { state: "NH", status: "active" },
    ];
    const selfRevoke = jest.fn();
    render(
      <AccessDisplay
        accesses={accesses}
        selfRevoke={selfRevoke}
        userType="statesubmitter"
      />
    );

    fireEvent.click(screen.getByLabelText(/revoke.*access.*Utah/i));
    expect(selfRevoke).toBeCalledTimes(1);
    expect(selfRevoke).toBeCalledWith("UT");
  });
});

describe("requesting new states", () => {
  let history;
  beforeEach(() => {
    history = createMemoryHistory();
    history.push("/profile");

    window.HTMLElement.prototype.scrollIntoView = jest.fn();
  });

  it("allows users to request a single new state", async () => {
    UserDataApi.updateUser = jest.fn(() => "UR000");

    render(
      <AppContext.Provider
        value={{
          ...initialAuthState,
          setUserInfo: jest.fn(),
        }}
      >
        <Router history={history}>
          <UserPage />
        </Router>
      </AppContext.Provider>
    );

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /add state/i }));
      await screen.findByRole("list");
      fireEvent.click(screen.getByRole("option", { name: /alaska/i }));
      fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    });

    expect(UserDataApi.updateUser).toBeCalledTimes(1);
    expect(UserDataApi.updateUser).toBeCalledWith(
      expect.objectContaining({
        userEmail: initialAuthState.userProfile.email,
        doneBy: initialAuthState.userProfile.email,
        attributes: [{ stateCode: "AK", status: "pending" }],
      })
    );
  });
});

it("renders the contact list properly", () => {
  const contacts = [
    { firstName: "firstOne", lastName: "lastOne", email: "emailOne" },
    { firstName: "firstTwo", lastName: "lastTwo", email: "emailTwo" },
  ];
  const userType = "statesubmitter";

  render(<ContactList contacts={contacts} userType={userType} />);

  const contactsLabelEl = screen.getByText("State System Admins:", {
    selector: "p",
    exact: false,
  });

  expect(contactsLabelEl).toBeVisible();
});

describe("Alert Bar use on page", () => {
  let history;
  const alertState = { passCode: RESPONSE_CODE.USER_SUBMITTED };
  const noAlertState = {};
  beforeEach(() => {
    history = createMemoryHistory();
  });

  it("shows the alert bar when called with an alert State", async () => {
    history.push("/profile", alertState);
    render(
      <AppContext.Provider
        value={{
          ...initialAuthState,
        }}
      >
        <Router history={history}>
          <UserPage />
        </Router>
      </AppContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("Submission Completed")).toBeInTheDocument();
    });
  });

  it("closes the alert bar when the callback is called", async () => {
    history.push("/profile", alertState);
    render(
      <AppContext.Provider
        value={{
          ...initialAuthState,
        }}
      >
        <Router history={history}>
          <UserPage />
        </Router>
      </AppContext.Provider>
    );

    fireEvent.click(screen.getByLabelText("Dismiss alert"));
    await waitFor(() => {
      expect(
        screen.queryByText("Submission Completed")
      ).not.toBeInTheDocument();
    });
  });
});
