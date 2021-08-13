import React from "react";
import { render } from "@testing-library/react";
import TriggerCB from "./TriggerCB";

describe("TriggerCB", () => {
  it("renders without crashing", () => {
    render(<TriggerCB />);
  });
});
