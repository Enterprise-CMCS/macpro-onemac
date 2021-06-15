import React from "react";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import AlertBar from "./AlertBar";

/*
TEST_SUCCESS_WITH_LINK: {
    type: ALERT_TYPES.SUCCESS,
    heading: "Success with Link",
    text: "You achieved success! Now follow our $Link$.",
    linkURL: "https://www.google.com",
    linkText: "Test Link Text",
  },

  TEST_SUCCESS_WITH_PERSONALIZATION: {
    type: ALERT_TYPES.SUCCESS,
    heading: "Success with Persomalization",
    text: `Test Text before ...$personalize$... Test Text after.`,
  },

  TEST_WARNING: {
    type: ALERT_TYPES.WARNING,
    heading: "Warning",
    text: "This is the warning alert text.",
  },

  TEST_WARNING_WITH_LINK: {
    type: ALERT_TYPES.WARNING,
    heading: "Warning with Link",
    text: "You need warning! Now follow our $Link$.",
    linkURL: "https://www.google.com",
    linkText: "Test Link Text",
  },

  TEST_WARNING_WITH_PERSONALIZATION: {
    type: ALERT_TYPES.WARNING,
    heading: "Warning with Persomalization",
    text: `Test Text before ...$personalize$... Test Text after.`,
  },

  TEST_ERROR: {
    type: ALERT_TYPES.ERROR,
    heading: "Error",
    text: "This is the error alert text.",
  },

  TEST_ERROR_WITH_LINK: {
    type: ALERT_TYPES.ERROR,
    heading: "Error with Link",
    text: "You found an error! Now follow our $Link$.",
    linkURL: "https://www.google.com",
    linkText: "Test Link Text",
  },

  TEST_ERROR_WITH_PERSONALIZATION: {
    type: ALERT_TYPES.ERROR,
    heading: "Error with Persomalization",
    text: `Test Text before ...$personalize$... Test Text after.`,
  },
};
*/

jest.mock("../libs/error-mappings", () => {
  return {
    getAlert: () => {
      return {
        type: "success",
        heading: "Success",
        text: "This is the $personalize$ success alert text.",
      };
    },
  };
});

window.HTMLElement.prototype.scrollIntoView = function () {};

it("shows a basic alert", () => {
  render(<AlertBar alertCode="ANY" />);

  expect(
    screen.getByText("success alert text.",{exact: false})
  ).toBeInTheDocument();
});

it("shows a peronalized alert", () => {
  jest.mock("../libs/error-mappings", () => {
    return {
      getAlert: () => {
        return {
          type: "success",
          heading: "Success with Persomalization",
          text: `Test Text before ...$personalize$... Test Text after.`,
        };
      },
    };
  });
  let testString = "Crazy DATA";
  render(<AlertBar alertCode="ANY" personalizedString={testString} />);
  expect(screen.getByText(testString, { exact: false })).toBeInTheDocument();
});

it("shows an alert with a link", () => {});

it("goes away when closed", () => {});

it("calls the closing callback", () => {});
