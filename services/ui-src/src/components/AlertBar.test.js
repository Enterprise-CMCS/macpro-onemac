import React from "react";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import AlertBar from "./AlertBar";
import * as ALERT_CONSTANTS from "../libs/alertLib";

Object.defineProperty(ALERT_CONSTANTS, "alertCodeAlerts", {
  value: {
    SIMPLE_ALERT: {
      type: "success",
      heading: "Success",
      text: "This is the success alert text.",
    },
    PERSONALIZED_ALERT: {
      type: "success",
      heading: "Success",
      text: "This is the $personalize$ success alert text.",
    },
    LINK_ALERT: {
      type: "success",
      heading: "Success with Link",
      text: "You achieved success! Now follow our $Link$.",
      linkURL: "https://www.google.com",
      linkText: "Test Link Text",
    },
  },
});

window.HTMLElement.prototype.scrollIntoView = function () {};

it("shows a basic alert", () => {
  let initialCode = "SIMPLE_ALERT";
  render(<AlertBar alertCode={initialCode} />);

  expect(
    screen.getByText("success alert text.", { exact: false })
  ).toBeInTheDocument();
});

it("shows a peronalized alert", () => {
  let initialCode = "PERSONALIZED_ALERT";
  let testString = "Crazy DATA";
  render(<AlertBar alertCode={initialCode} personalizedString={testString} />);
  expect(screen.getByText(testString, { exact: false })).toBeInTheDocument();
});

it("shows an alert with a link", () => {
  let initialCode = "LINK_ALERT";

  render(<AlertBar alertCode={initialCode} />);
  expect(screen.getByRole("link")).toBeInTheDocument();
});

it("goes away when closed", async () => {
  let initialCode = "SIMPLE_ALERT";
  let findText = "success alert text.";

  render(<AlertBar alertCode={initialCode} />);

  let alertEl = screen.getByText(findText, { exact: false });
  expect(alertEl).toBeInTheDocument();
  expect(screen.getByRole("button")).toBeInTheDocument();

  userEvent.click(screen.getByRole("button"));
  expect(screen.queryByText(findText, { exact: false })).toBe(null);
});

it("calls the closing callback", () => {
  let initialCode = "SIMPLE_ALERT";
  let onCloseFn = jest.fn();

  render(<AlertBar alertCode={initialCode} closeCallback={onCloseFn} />);

  userEvent.click(screen.getByRole("button"));

  expect(onCloseFn).toBeCalled();
});
