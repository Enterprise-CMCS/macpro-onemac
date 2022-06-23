import React from "react";
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import { AppContext } from "../libs/contextLib";
import ActionPopup from "./ActionPopup";
import PackageApi from "../utils/PackageApi";

import { stateSubmitterInitialAuthState } from "../libs/testDataAppContext";

const testCallback = jest.fn();
const POPUP_TEST_ID = "action-popup";
const TRIGGER_TEST_ID = "popup-menu-trigger";

jest.mock("../utils/PackageApi");

const ContextWrapper = ({ children }) => {
  return (
    <MemoryRouter>
      <AppContext.Provider
        value={{
          ...stateSubmitterInitialAuthState,
        }}
      >
        {children}
      </AppContext.Provider>
    </MemoryRouter>
  );
};

it("is disabled if the component has no available actions", () => {
  const rowItem = {
    componentId: "anId",
    componentType: "medicaidspa",
    currentStatus: "Unsubmitted",
  };
  render(<ActionPopup theComponent={rowItem} alertCallback={testCallback} />, {
    wrapper: ContextWrapper,
  });

  expect(screen.getByTestId(TRIGGER_TEST_ID)).toBeDisabled();
});

it("is enabled if the component has available actions", () => {
  const rowItem = {
    componentId: "anId",
    componentType: "medicaidspa",
    currentStatus: "Submitted",
  };
  render(<ActionPopup theComponent={rowItem} alertCallback={testCallback} />, {
    wrapper: ContextWrapper,
  });

  expect(screen.getByTestId(TRIGGER_TEST_ID)).toBeEnabled();
});

it("opens and closes the menu properly", async () => {
  const rowItem = {
    componentId: "anId",
    componentType: "medicaidspa",
    currentStatus: "Submitted",
  };
  render(
    <>
      <div data-testid="close-it-trigger">
        <p>click to close</p>
      </div>
      <ActionPopup theComponent={rowItem} alertCallback={testCallback} />
    </>,
    {
      wrapper: ContextWrapper,
    }
  );
  userEvent.click(screen.getByTestId(TRIGGER_TEST_ID));

  await waitFor(() =>
    expect(screen.getByTestId(POPUP_TEST_ID)).toBeInTheDocument()
  );

  userEvent.click(screen.getByTestId("close-it-trigger"));

  expect(screen.queryByTestId(POPUP_TEST_ID)).not.toBeInTheDocument();
});
