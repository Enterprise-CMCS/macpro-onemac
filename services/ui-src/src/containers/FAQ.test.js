import React from "react";
import { render, screen } from "@testing-library/react";
import FAQ from "./FAQ";

it("has target _blank for the external link", () => {
  render(<FAQ />);

  expect(
    screen
      .getByText("42 C.F.R. §430.12.", { selector: "a" })
      .getAttribute("target")
  ).toBe("_blank");
});
