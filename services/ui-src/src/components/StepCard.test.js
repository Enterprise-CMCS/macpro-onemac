import React from "react";
import { render } from "@testing-library/react";
import StepCard from "./StepCard";

describe("StepCard", () => {
  it("renders without crashing", () => {
    render(<StepCard stepNumber="1" content="1" />);
  });
});
