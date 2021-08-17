import React from "react";
import { render } from "@testing-library/react";
import LoadingOverlay from "./LoadingOverlay";

describe("LoadingOverlay", () => {
  it("renders without crashing", () => {
    render(<LoadingOverlay />);
  });
});
