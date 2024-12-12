import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NotificationApi from "../utils/NotificationApi";

import Home from "./Home";

jest.mock("../utils/NotificationApi");


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

jest.mock('../utils/NotificationApi', () => ({
  getActiveSystemNotifications: jest.fn()
}));

const { useFlags } = require('launchdarkly-react-client-sdk');

it("renders without crashing", async () => {
  useFlags.mockReturnValue({ mmdlNotification: true });
  NotificationApi.getActiveSystemNotifications.mockResolvedValue([
    { header: "heading", body: "Test Notification" },
  ]);

  await act(async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
  });

  // Wait for notifications to be processed and verify the output
  await waitFor(() => {
    expect(NotificationApi.getActiveSystemNotifications).toHaveBeenCalled();
  });
});

it("does not render notifications component when mmdlNotification set to false", async () => {
  useFlags.mockReturnValue({ mmdlNotification: false });


  await act(async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
  });
  
  const notificationBanner = screen.queryByTestId('notification-card');  // This checks for absence
  expect(notificationBanner).not.toBeInTheDocument(); 
  // Wait for notifications to be processed and verify the output
  await waitFor(() => {
    expect(NotificationApi.getActiveSystemNotifications).not.toHaveBeenCalled();
  });
});