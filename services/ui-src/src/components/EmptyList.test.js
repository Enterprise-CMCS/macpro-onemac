import React from "react";
import { render } from "@testing-library/react";
import { EmptyList } from "./EmptyList";

describe("EmptyList", () => {
  it("renders without crashing", () => {
    render(<EmptyList message="You have no submissions yet." />);
  });
});
