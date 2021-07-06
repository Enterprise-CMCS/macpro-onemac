import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";

import { PhoneNumber } from "./PhoneNumber";

it("lets you change the phone number", async () => {
  const initial = "303-909-8080",
    replacement = "202-867-5309";

  render(<PhoneNumber initialValue={initial} />);

  // click Edit button to start editing
  fireEvent.click(screen.getByText("Edit", { selector: "button" }));

  // find the input, which should be visible and enabled
  const phoneInputEl = screen.getByLabelText("Phone Number");
  expect(phoneInputEl).toBeInTheDocument();
  expect(phoneInputEl).not.toBeDisabled();

  // change the value
  fireEvent.change(phoneInputEl, { target: { value: replacement } });

  // the component should allow that change and update the input element
  expect(phoneInputEl).toHaveValue(replacement);
});

it("lets you cancel your changes to the phone number", () => {
  const initial = "303-909-8080",
    replacement = "202-867-5309";

  render(<PhoneNumber initialValue={initial} />);

  // click Edit button to start editing
  fireEvent.click(screen.getByText("Edit", { selector: "button" }));
  // change the value in the input
  fireEvent.change(screen.getByLabelText("Phone Number"), {
    target: { value: replacement },
  });
  // click Cancel button to revert changes
  fireEvent.click(screen.getByText("Cancel", { selector: "button" }));

  // input is no longer there
  expect(screen.queryByLabelText("Phone Number")).toBeNull();
  // the initial value remains on the screen
  expect(screen.getByText(initial));
  // the replacement value is not displayed on the screen
  expect(screen.queryByText(replacement)).toBeNull();
});

it("lets you submit your changes", () => {
  const initial = "303-909-8080",
    replacement = "202-867-5309",
    onSubmitFn = jest.fn();

  render(<PhoneNumber initialValue={initial} onSubmit={onSubmitFn} />);

  // click Edit button to start editing
  fireEvent.click(screen.getByText("Edit", { selector: "button" }));
  // change the value in the input
  fireEvent.change(screen.getByLabelText("Phone Number"), {
    target: { value: replacement },
  });
  // click Apply button to persist changes
  fireEvent.click(screen.getByText("Apply", { selector: "button" }));

  // check that submit handler was called
  expect(onSubmitFn).toBeCalledWith(replacement);
});

it("displays the Add button when a user has no initial phone number", () => {
  // no initialValue is passed in as component props
  render(<PhoneNumber />);
  expect(screen.getByText("Add", { selector: "button" }));
});

it("displays the Add button when a user removes their existing phone number", () => {
  const initial = "303-909-8080",
    replacement = "",
    onSubmitFn = jest.fn();

  render(<PhoneNumber initialValue={initial} onSubmit={onSubmitFn} />);

  // remove the phone number
  fireEvent.click(screen.getByText("Edit", { selector: "button" }));
  fireEvent.change(screen.getByLabelText("Phone Number"), {
    target: { value: replacement },
  });
  fireEvent.click(screen.getByText("Apply", { selector: "button" }));

  // check for the Add button
  expect(screen.getByText("Add", { selector: "button" }));
});

it("displays opens the edit mode with Apply and Cancel buttons after clicking the Add button", () => {
  render(<PhoneNumber />);

  fireEvent.click(screen.getByText("Add", { selector: "button" }));

  // checks for Apply and Cancel buttons
  expect(screen.getByText("Apply", { selector: "button" }));
  expect(screen.getByText("Cancel", { selector: "button" }));
});
