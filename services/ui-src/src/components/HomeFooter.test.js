import React from "react";
import { render } from "@testing-library/react";
import HomeFooter from "./HomeFooter";

describe("HomeFooter", () => {
  it("renders without crashing", () => {
    render(<HomeFooter />);
  });
});
