import React from "react";
import { render } from "@testing-library/react";
import { MultiSelectDropDown } from "./MultiSelectDropDown";

const testList = [
  {
    label: "Label 1",
    value: "one",
  },
  {
    label: "Label 2",
    value: "two",
  },
];

describe("MultiSelectDropDown", () => {
  it("renders without crashing", () => {
    render(<MultiSelectDropDown options={testList} />);
  });
});
