import React from "react";
import { render } from "@testing-library/react";
import HomeHeader from "./HomeHeader";

describe("HomeHeader", () => {
  it("renders without crashing", () => {
    render(<HomeHeader />);
  });
});
