import React from "react";
import { render, screen } from "@testing-library/react";
import TransmittalNumber from "./TransmittalNumber";

describe("TransmittalNumber", () => {
  it("renders without crashing", () => {
    render(<TransmittalNumber />);
  });

  it("uses the idFAQLink prop to add a link to the component that opens in a 'new' window", () => {
    const testLink = "test.html";
    render(<TransmittalNumber idFAQLink={testLink} />);

    const FAQLinkEl = screen.getByText("What is my", {
      exact: false,
      selector: "a",
    });

    expect(FAQLinkEl.getAttribute("target")).toBe("new");
    expect(FAQLinkEl.getAttribute("href")).toBe(testLink);
  });
});
