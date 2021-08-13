import React from "react";
import { render } from "@testing-library/react";
import TransmittalNumber from "./TransmittalNumber";

describe("TransmittalNumber", () => {
  it("renders without crashing", () => {
    render(<TransmittalNumber />);
  });
});
