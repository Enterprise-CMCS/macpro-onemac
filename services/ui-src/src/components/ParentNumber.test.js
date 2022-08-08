import React from "react";
import { render } from "@testing-library/react";
import ParentNumber from "./ParentNumber";

describe("TransmittalNumber", () => {
  it("renders without crashing", () => {
    render(
      <ParentNumber
        statusMessage="test\ndifferent\ndivs"
        idFieldHint={["one", "two"]}
      />
    );
  });
});
