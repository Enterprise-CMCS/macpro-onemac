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

  const button = screen.getByRole('button', { name: /what are the attachments for a 1915\(b\) waiver - request for temporary extension\?/i });
  await waitFor(() => {
    expect(button).toHaveAttribute("aria-expanded", "true");
  });
});

it("expand button opens all", async () => {
  render(<FAQ />);

  const btnEl = await screen.findByRole("button", {
    name: "Expand all to search with CTRL+F",
  });
  const button2 = screen.getByRole('button', { name: /what are the attachments for a 1915\(b\) waiver - request for temporary extension\?/i });

  userEvent.click(btnEl);
  await waitFor(() => {
    expect(button2).toHaveAttribute("aria-expanded", "true");
  });
});
