import React from "react";
import { render } from "@testing-library/react";
import { ConfirmationDialog } from "./ConfirmationDialog";

describe("ConfirmationDialog", () => {
  it("renders without crashing", () => {
    render(
      <ConfirmationDialog
        acceptText="Confirm"
        cancelText="Keep Editing"
        heading="Cancel submission?"
        onAccept={() => {}}
        onCancel={() => {}}
        size="wide"
      >
        Leave Page
      </ConfirmationDialog>
    );
  });
});
