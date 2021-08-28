import React from "react";
import { render } from "@testing-library/react";
import ScrollToTop from "./ScrollToTop";

describe("ScrollToTop", () => {
  it("renders without crashing", () => {
    render(<ScrollToTop />);
  });
});
