import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FAQ from "./FAQ";

it("has target _blank for the external link", () => {
  render(<FAQ />);

  expect(
    screen
      .getByText("42 C.F.R. §430.12.", { selector: "a" })
      .getAttribute("target")
  ).toBe("_blank");
});

it("expands linked question", async () => {
  render(<FAQ />);

  window.HTMLElement.prototype.scrollIntoView = jest.fn();
  window.location.href =
    window.location.href + "#waiverb-extension-attachments";

  const btnEl = await screen.findByRole("button", {
    name: "What are the attachments for a 1915(b) Waiver - Request for Temporary Extension?",
  });
  await waitFor(() => {
    expect(btnEl).toHaveAttribute("aria-expanded", "true");
  });
});

it("expand button opens all", async () => {
  render(<FAQ />);

  const btnEl = await screen.findByRole("button", {
    name: "Expand all to search with CTRL+F",
  });
  const btnEl2 = await screen.findByRole("button", {
    name: "What are the attachments for a 1915(b) Waiver - Request for Temporary Extension?",
  });

  userEvent.click(btnEl);
  await waitFor(() => {
    expect(btnEl2).toHaveAttribute("aria-expanded", "true");
  });
});
