import React from "react";
import { render } from "@testing-library/react";
import LoadingScreen from "./LoadingScreen";

describe("LoadingScreen", () => {
  it("renders without crashing", () => {
    render(<LoadingScreen isLoading={true} />);
  });
});
