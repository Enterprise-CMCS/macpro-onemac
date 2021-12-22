import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ScrollToTop from "./ScrollToTop";

describe("ScrollToTop", () => {
  it("renders without crashing", () => {
    render(<ScrollToTop />);
  });

  it("checks scrollTo onclick fire", () => {
    window.scrollTo = jest.fn();
    render(<ScrollToTop />);
    const scrollToTopDiv = screen.getByText(/back to top/i);
    expect(scrollToTopDiv).toBeVisible();
    fireEvent.click(scrollToTopDiv);
    expect(window.scrollTo).toBeCalledWith({ top: 0, behavior: "smooth" });
  });
});
