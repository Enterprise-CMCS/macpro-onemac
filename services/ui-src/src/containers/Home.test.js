import React from "react";
import { useLocation } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import Home from "./Home";

jest.mock("react-router-dom", () => ({
  useLocation: jest.fn(),
}));

it("has target _blank for the external link", () => {
  render(<Home />);

  expect(screen.getByText("How to create a submission")).toBeInTheDocument();
});
