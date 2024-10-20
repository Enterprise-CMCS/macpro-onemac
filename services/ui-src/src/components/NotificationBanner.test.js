import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import NotificationBanner from "./NotificationBanner";

// Mock the Alert component from @cmsgov/design-system
jest.mock("@cmsgov/design-system", () => ({
  Alert: ({ children, className }) => (
    <div className={className}>{children}</div>
  ),
  Button: ({ children, className, href }) => (
    <a className={className} href={href}>
      {children}
    </a>
  ),
}));

describe("NotificationBanner", () => {
  test("renders header and body", () => {
    render(
      <NotificationBanner header="Test Header" body="Test body content" />
    );

    expect(screen.getByText(/Test Header/)).toBeInTheDocument();
    expect(screen.getByText(/Test body content/)).toBeInTheDocument();
  });

  test("renders button if provided", () => {
    render(
      <NotificationBanner
        header="Test Header"
        body="Test body content"
        buttonText="Click Me"
        buttonLink="http://example.com"
      />
    );

    const buttonElement = screen.getByText(/Click Me/);
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveAttribute("href", "http://example.com");
  });

  test("does not render button if not provided", () => {
    render(
      <NotificationBanner header="Test Header" body="Test body content" />
    );

    expect(screen.queryByText(/Click Me/)).toBeNull();
  });

  test("closes the notification when the close button is clicked", () => {
    render(
      <NotificationBanner header="Test Header" body="Test body content" />
    );

    // Ensure the notification is initially visible
    expect(screen.getByText(/Test Header/)).toBeInTheDocument();

    // Click the close button
    const closeButton = screen.getByLabelText(/Dismiss alert/);
    fireEvent.click(closeButton);

    // Ensure the notification is no longer visible
    expect(screen.queryByText(/Test Header/)).toBeNull();
  });
});
