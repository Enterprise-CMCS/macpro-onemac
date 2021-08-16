import React from "react";
import { render } from "@testing-library/react";
import { MultiSelectDropDown } from "./MultiSelectDropDown";

describe("MultiSelectDropDown", () => {
  it("renders without crashing", () => {
    render(<MultiSelectDropDown />);
  });
});
