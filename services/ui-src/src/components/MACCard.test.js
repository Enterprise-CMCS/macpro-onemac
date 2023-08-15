import React from "react";
import { render, screen } from "@testing-library/react";
import {
  MACCard,
  MACCardTitle,
  MACCardWrapper,
  MACFieldsetCard,
  MACFieldsetOptionsList,
  MACRemovableCard,
} from "./MACCard";
import { BrowserRouter } from "react-router-dom";

describe("MACCard Component System", () => {
  // Building Blocks
  describe("MACCardWrapper", () => {
    beforeEach(() =>
      render(
        <MACCardWrapper>
          <p>test</p>
        </MACCardWrapper>
      )
    );
    test("renders gradient bar", () => {
      expect(screen.getByTestId("gradient-top")).toBeInTheDocument();
    });
    test("renders children", () => {
      expect(screen.getByText("test")).toBeInTheDocument();
    });
  });
  describe("MACCardTitle", () => {
    test("renders title", () => {
      render(<MACCardTitle title="Test Title" />);
      expect(screen.getByText("Test Title")).toBeInTheDocument();
    });
  });
  // Components
  describe("MACCard", () => {
    describe("basic use", () => {
      beforeEach(() => {
        render(
          <MACCard title="Test Title">
            <div>Test content</div>
          </MACCard>
        );
      });
      test("passes title prop to MACCardTitle", () => {
        expect(screen.getByText("Test Title")).toBeInTheDocument();
      });
      test("default shows gradient", () => {
        expect(screen.getByTestId("gradient-top")).toBeInTheDocument();
      });
      test("renders children", () => {
        expect(screen.getByText("Test content")).toBeInTheDocument();
      });
    });
    describe("with props", () => {
      beforeEach(() => {
        render(
          <MACCard>
            <div>Test content</div>
          </MACCard>
        );
      });
      test("does not have title", () => {
        expect(screen.queryByTestId("mac-card-title")).toBe(null);
        expect(screen.getByText("Test content")).toBeInTheDocument();
      });
    });
  });
  describe("MACFieldsetCard", () => {
    beforeEach(() => {
      const choices = [
        {
          linkTo: "/nowhere",
          title: "Test Option",
          description: "Testing description",
          strongText: "Testing strongText",
        },
      ];
      render(
        <BrowserRouter>
          <MACFieldsetCard legend={"Test Legend says what?"}>
            <MACFieldsetOptionsList choices={choices} />
          </MACFieldsetCard>
        </BrowserRouter>
      );
    });
    test("renders in a MACCard with gradient bar", () => {
      expect(screen.getByTestId("gradient-top")).toBeInTheDocument();
    });
    test("renders a list of MACFieldsetCardOptions", () => {
      expect(screen.getByText("Test Option")).toBeInTheDocument();
      expect(screen.getByText("Testing description")).toBeInTheDocument();
      expect(screen.getByText("Testing strongText")).toBeInTheDocument();
      expect(screen.getByTestId("chevron-right")).toBeInTheDocument();
    });
    // Using React-Router `Link`, and the `linkTo` prop, we create navigable
    // lists of options and sub-options.
    test("renders as a router Link", () => {
      expect(screen.getByTestId("link-wrapper")).toBeInTheDocument();
    });
  });

  describe("MACRemovableCard", () => {
    describe("basic use", () => {
      const mockOnClick = jest.fn();
      beforeEach(() => {
        render(
          <MACRemovableCard
            title="Test Title"
            description="Testing description"
            onClick={mockOnClick}
            isReadOnly={false}
            hasRoleAccess={true}
          >
            <p>Testing content</p>
          </MACRemovableCard>
        );
      });
      test("renders a custom MACCard with programmable image button", () => {
        // Basic rendering elements
        expect(screen.getByText("Test Title")).toBeInTheDocument();
        expect(screen.getByText("Testing description")).toBeInTheDocument();
        expect(screen.getByText("Testing content")).toBeInTheDocument();
        // Button rendering
        const closeButton = screen.getByRole("button");
        expect(closeButton).toBeInTheDocument();
        expect(closeButton.firstElementChild.tagName).toBe("IMG");
        // Button programming
        closeButton.click();
        expect(mockOnClick).toHaveBeenCalled();
      });
    });
  });
  describe("use with props", () => {
    describe("button availability", () => {
      test("button hidden, isReadOnly", () => {
        render(
          <MACRemovableCard
            onClick={jest.fn()}
            isReadOnly={true} // marks this read-only
            hasRoleAccess={true}
            renderIf={true}
          >
            <p>Testing content</p>
          </MACRemovableCard>
        );
        const closeButton = screen.queryByRole("button");
        expect(closeButton).not.toBeInTheDocument();
      });
      test("button hidden, !hasRoleAccess", () => {
        render(
          <MACRemovableCard
            onClick={jest.fn()}
            isReadOnly={false}
            hasRoleAccess={false} // marks user unauthorized to act
            renderIf={true}
          >
            <p>Testing content</p>
          </MACRemovableCard>
        );
        const closeButton = screen.queryByRole("button");
        expect(closeButton).not.toBeInTheDocument();
      });
      test("button hidden, !renderIf", () => {
        render(
          <MACRemovableCard
            onClick={jest.fn()}
            isReadOnly={false}
            hasRoleAccess={true}
            renderIf={false} // hides button if false
          >
            <p>Testing content</p>
          </MACRemovableCard>
        );
        const closeButton = screen.queryByRole("button");
        expect(closeButton).not.toBeInTheDocument();
      });
    });
  });
});
