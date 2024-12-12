import React from "react";
import { act } from "react-dom/test-utils";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { Auth } from "aws-amplify";
import UserDataApi from "./utils/UserDataApi";
import IdleTimerWrapper from "./components/IdleTimerWrapper";
import NotificationsApi from './utils/NotificationApi'; 

import  App  from "./App";
import { RESPONSE_CODE } from "cmscommonlib";

jest.mock("aws-amplify");
jest.mock("./utils/UserDataApi");
jest.mock("./components/IdleTimerWrapper");

jest.mock('uuid', () => ({
  v4: jest.fn(() => '1234-5678-9012-3456'), // Return a fixed UUID for testing
}));

// Mocking launchdarkly-react-client-sdk
jest.mock('launchdarkly-react-client-sdk', () => {
  return {
    withLDProvider: () => (Component) => (props) => <Component {...props} />,
    useFlags: jest.fn(), // This will be a mock function
  };
});

jest.mock('./utils/NotificationApi', () => ({
  createUserNotifications: jest.fn(),
  dismissUserNotifications: jest.fn(),
  getActiveSystemNotifications: jest.fn()
}));

const { useFlags } = require('launchdarkly-react-client-sdk');

beforeEach(() => {
  // fixing the 'window.matchMedia is not defined' error
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

  jest.clearAllMocks();

  // render does not work for idleTimer -- workaround
  IdleTimerWrapper.mockReturnValue(<></>);

  Auth.currentAuthenticatedUser.mockResolvedValue({
    signInUserSession: { idToken: { payload: {} } },
  });
  Auth.configure.mockReturnValue({ oauth: {} });
  UserDataApi.userProfile.mockResolvedValue({
    phoneNumber: "555.12wer",
    email: "anemail",
    firstName: "Unita",
    lastName: "Testing",
    fullName: "Unita Testing",
    roleList: [
      { role: "cmsroleapprover", territory: "N/A", status: "revoked" },
      { role: "defaultcmsuser", territory: "N/A", status: "active" },
    ],
    validRoutes: [
      "/",
      "/profile",
      "/devlogin",
      "/FAQ",
      "/dashboard",
      "/packagelist",
    ],
  });
  UserDataApi.setContactInfo.mockResolvedValue(RESPONSE_CODE.USER_EXISTS);

  NotificationsApi.createUserNotifications.mockResolvedValue([
    {
      sk: 'notification-1',
      header: 'Test Notification',
      body: 'This is a test notification.',
      buttonLink: '/some-link',
      buttonText: 'Click here',
    },
  ]);
});

describe("App Component", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Reset mocks after each test
  });

  it("renders without crashing", async () => {
    useFlags.mockReturnValue({ mmdlNotification: false });
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    await act(async () => {});
  });

  it("handles error on fetch", async () => {
    useFlags.mockReturnValue({ mmdlNotification: false });
    Auth.currentAuthenticatedUser.mockImplementationOnce(() => {
      throw "an Error";
    });

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    await act(async () => {});
  });

  it("renders NotificationBanner when flag set to true", async () => {
    useFlags.mockReturnValue({ mmdlNotification: true });
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    await act(async () => {});

    const notificationBanner = screen.getByTestId('notification-alert'); // Assuming the NotificationBanner uses role="banner"
    expect(notificationBanner).toBeInTheDocument();
  });

  it("does not render NotificationBanner when flag set to false", async () => {
    useFlags.mockReturnValue({ mmdlNotification: false }); // Set to false to test for absence
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    await act(async () => {});

    const notificationBanner = screen.queryByTestId('notification-alert');  // This checks for absence
    expect(notificationBanner).not.toBeInTheDocument(); // Expect it to not be in the document
  });

});