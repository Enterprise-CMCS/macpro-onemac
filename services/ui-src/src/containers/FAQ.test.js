import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FAQ from "./FAQ";

// Mocking the uuid package
jest.mock('uuid', () => ({
  v4: jest.fn(() => '1234-5678-9012-3456'), // Return a fixed UUID for testing
}));

// Mocking launchdarkly-react-client-sdk
jest.mock('launchdarkly-react-client-sdk', () => {
  return {
    withLDProvider: () => (Component) => (props) => <Component {...props} />,
    useFlags: jest.fn(), // This will be a mock function
  };
});

const { useFlags } = require('launchdarkly-react-client-sdk');

describe("FAQ Component", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Reset mocks after each test
  });

  it("has target _blank for the external link", () => {
    useFlags.mockReturnValue({ mmdlFaq: false });
    render(<FAQ />);

    expect(
      screen.getAllByText("42 C.F.R. §430.12.", { selector: "a" })[0]
        .getAttribute("target")
    ).toBe("_blank");
  });

  it("expands linked question", async () => {
    useFlags.mockReturnValue({ mmdlFaq: false });
    render(<FAQ />);

    window.HTMLElement.prototype.scrollIntoView = jest.fn();
    window.location.href += "#waiverb-extension-attachments";

    const btnEl = await screen.findByRole("button", {
      name: "What are the attachments for a 1915(b) Waiver - Request for Temporary Extension?",
    });
    await waitFor(() => {
      expect(btnEl).toHaveAttribute("aria-expanded", "true");
    });
  });

  it("expand button opens all", async () => {
    useFlags.mockReturnValue({ mmdlFaq: false });
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

  it("links to a new browser tab that opens a pdf", async () => {
    useFlags.mockReturnValue({ mmdlFaq: true });
    render(<FAQ />);
    const linkEl = await screen.getByText(
      "CS 7: Eligibility - Targeted Low-Income Children"
    );
    expect(linkEl).toHaveAttribute("href", "/assets/forms/CS7.pdf");
    expect(linkEl).toHaveAttribute("target", "_blank");
    expect(linkEl).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("links to a download of a .doc file", async () => {
    useFlags.mockReturnValue({ mmdlFaq: true });
    render(<FAQ />);
    const linkEl = await screen.getByText(
      "G 1: Cost-Sharing Requirements Implementation Guide"
    );
    expect(linkEl).toHaveAttribute(
      "href",
      "/assets/docs/IG_G1_CostSharingRequirements.doc"
    );
    expect(linkEl).toHaveAttribute("download");
  });

  it("renders no mmdl related FAQ questions when mmdlFaq set to false", async () => {
    useFlags.mockReturnValue({ mmdlFaq: false });
    render(<FAQ />);
    const accordionItems = screen.getAllByRole('button'); 
    expect(accordionItems.length).toBe(36); // Adjust based on expected outcome
  });

  it("renders mmdl related FAQ questions when mmdlFaq set to true", async () => {
    useFlags.mockReturnValue({ mmdlFaq: true });
    render(<FAQ />);
    const accordionItems = screen.getAllByRole('button'); 
    expect(accordionItems.length).toBe(43); // Adjust based on expected count
  });
});


