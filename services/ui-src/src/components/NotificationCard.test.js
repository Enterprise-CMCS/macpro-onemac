import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { NotificationCard } from "./NotificationCard";

describe("NotificationCard", () => {
  test("renders header and body", () => {
    render(
      <NotificationCard
        header="Test Header"
        body="Test body content"
        date="2024-01-01T00:00:00Z"
      />
    );

    expect(screen.getByText(/Test Header:/)).toBeInTheDocument();
    expect(screen.getByText(/Test body content/)).toBeInTheDocument();
  });

  test("renders link if provided", () => {
    render(
      <NotificationCard
        header="Test Header"
        body="Test body content"
        date="2024-01-01T00:00:00Z"
        buttonLink="http://example.com"
        buttonText="Example Link"
      />
    );

    const linkElement = screen.getByText(/Example Link/);
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "http://example.com");
  });

  test("does not render link when link prop is not provided", () => {
    render(
      <NotificationCard
        header="Test Header"
        body="Test body content"
        date="2024-01-01T00:00:00Z"
      />
    );

    expect(screen.queryByText(/Example Link/)).toBeNull();
  });

  test("renders MACCard with correct props", () => {
    const { container } = render(
      <NotificationCard
        header="Test Header"
        body="Test body content"
        date="2024-01-01T00:00:00Z"
      />
    );

    // Check that MACCard is rendered
    expect(container.querySelector(".mac-card-wrapper")).toBeInTheDocument();

    // Ensure MACCard has the correct props
    const macCardChildElement = screen.getByTestId("MACCard-children");
    expect(macCardChildElement).toHaveClass("home-content-full-width");
    expect(macCardChildElement).toHaveClass("mac-card-border");
  });
});
