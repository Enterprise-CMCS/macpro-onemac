import React from "react";
import { render, screen } from "@testing-library/react";
import ComponentId from "./ComponentId";

describe("ComponentId", () => {
  it("renders without crashing", () => {
    render(<ComponentId />);
  });

  it("uses the idFAQLink prop to add a link to the component that opens in a 'new' window", () => {
    const testLink = "test.html";
    render(<ComponentId idFAQLink={testLink} />);

    const FAQLinkEl = screen.getByText("What is my", {
      exact: false,
      selector: "a",
    });

    expect(FAQLinkEl.getAttribute("target")).toBe("new");
    expect(FAQLinkEl.getAttribute("href")).toBe(testLink);
  });

  it("displays the id as uneditable text if set to disabled", () => {
    const testComponentId = "1234";
    const disabled = true;
    render(<ComponentId value={testComponentId} disabled={disabled} />);

    screen.getByText(testComponentId);
  });
});
