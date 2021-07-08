import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";

import { PhoneNumber } from "./PhoneNumber";

it("displays a text box with Apply and Cancel buttons in edit mode", () => {
  const phone = "303-909-8080",
    newPhone = "202-867-5309",
    onCancelFn = jest.fn(),
    onSubmitFn = jest.fn();

  render(
    <PhoneNumber
      isEditing={true}
      phoneNumber={phone}
      onCancel={onCancelFn}
      onSubmit={onSubmitFn}
    />
  );

  // shows text box exists and can be typed in to display new text
  fireEvent.change(screen.getByLabelText("Phone Number"), {
    target: { value: newPhone },
  });
  expect(screen.getByDisplayValue(newPhone)).toBeVisible();

  // checks for Apply and Cancel buttons
  expect(screen.getByText("Apply", { selector: "button" })).toBeVisible();
  expect(screen.getByText("Cancel", { selector: "button" })).toBeVisible();
});

it("displays the phone number with an edit button when a user has an existing number", () => {
  const phone = "303-909-8080";

  render(<PhoneNumber isEditing={false} phoneNumber={phone} />);

  // checks for phone number displaying on screen
  screen.getByText(phone);

  // checks for Edit button
  expect(screen.getByText("Edit", { selector: "button" })).toBeVisible();
});

it("displays an add button when there is NO existing number", () => {
  const emptyPhone = "";

  render(<PhoneNumber isEditing={false} phoneNumber={emptyPhone} />);

  // checks for Add button
  expect(screen.getByText("Add", { selector: "button" })).toBeVisible();
});

it("calls the onCancelFn function when the cancel button is clicked in edit mode", () => {
  const phone = "303-909-8080",
    onCancelFn = jest.fn(),
    onSubmitFn = jest.fn();

  render(
    <PhoneNumber
      isEditing={true}
      phoneNumber={phone}
      onCancel={onCancelFn}
      onSubmit={onSubmitFn}
    />
  );

  fireEvent.click(screen.getByText("Cancel", { selector: "button" }));
  expect(onCancelFn).toBeCalled();
  expect(onSubmitFn).not.toBeCalled();
});

it("calls the onSubmitFn function when the Apply button is clicked in edit mode", () => {
  const phone = "303-909-8080",
    onCancelFn = jest.fn(),
    onSubmitFn = jest.fn();

  render(
    <PhoneNumber
      isEditing={true}
      phoneNumber={phone}
      onCancel={onCancelFn}
      onSubmit={onSubmitFn}
    />
  );

  fireEvent.click(screen.getByText("Apply", { selector: "button" }));
  expect(onSubmitFn).toBeCalled();
  expect(onCancelFn).not.toBeCalled();
});

it("calls the onEditFn function when the Edit button is clicked (when the user has an existing phone number)", () => {
  const phone = "303-909-8080",
    onEditFn = jest.fn();

  render(
    <PhoneNumber isEditing={false} phoneNumber={phone} onEdit={onEditFn} />
  );

  fireEvent.click(screen.getByText("Edit", { selector: "button" }));
  expect(onEditFn).toBeCalled();
});

it("calls the onEditFn function when the Add button is clicked (when the user has NO existing phone number)", () => {
  const phone = "",
    onEditFn = jest.fn();

  render(
    <PhoneNumber isEditing={false} phoneNumber={phone} onEdit={onEditFn} />
  );

  fireEvent.click(screen.getByText("Add", { selector: "button" }));
  expect(onEditFn).toBeCalled();
});
