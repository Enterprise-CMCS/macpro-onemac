import React from "react";
import { render, waitFor, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NotificationApi from "../utils/NotificationApi";

import Home from "./Home";

jest.mock("../utils/NotificationApi");

it("renders without crashing", async () => {
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
