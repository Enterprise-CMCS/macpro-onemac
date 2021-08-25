import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import PopupMenu, { POPUP_TRIGGER_TEST_ID } from "./PopupMenu";

it("renders a button for each action passed in", () => {
  const items = [
    { label: "Do thing", value: "thing" },
    { label: "Something else", value: "other" },
  ];
  render(<PopupMenu menuItems={items} selectedRow={{}} />);
  userEvent.click(screen.getByTestId(POPUP_TRIGGER_TEST_ID));

  const listItems = screen.getAllByRole("menuitem");
  listItems.forEach((el, idx) => {
    expect(el).toBeVisible();
    expect(el).toHaveTextContent(items[idx].label);
  });
});

it("asks for confirmation when item is clicked", () => {
  const items = [
    {
      label: "Do thing",
      value: "thing",
      formatConfirmationMessage: () => "nice try kiddo",
    },
    {
      label: "Something else",
      value: "other",
      formatConfirmationMessage: () => "don't you dare",
    },
  ];
  render(<PopupMenu menuItems={items} selectedRow={{}} shouldConfirm />);
  userEvent.click(screen.getByTestId(POPUP_TRIGGER_TEST_ID));
  userEvent.click(screen.getByText(items[1].label));

  expect(screen.getByText(items[1].formatConfirmationMessage())).toBeVisible();
  expect(screen.getByText("Confirm", { selector: "button" })).toBeVisible;
  expect(screen.getByText("Cancel", { selector: "button" })).toBeVisible();
});
