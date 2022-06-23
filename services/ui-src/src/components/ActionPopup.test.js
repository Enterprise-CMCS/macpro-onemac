import React from "react";
import { render, screen } from "@testing-library/react";
//import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import { AppContext } from "../libs/contextLib";
import ActionPopup from "./ActionPopup";

import { stateSubmitterInitialAuthState } from "../libs/testDataAppContext";

const testCallback = jest.fn();

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

  expect(screen.getByTestId("popup-menu-trigger")).toBeDisabled();

  //   const listItems = screen.getAllByRole("menuitem");
  //   listItems.forEach((el, idx) => {
  //     expect(el).toBeVisible();
  //     expect(el).toHaveTextContent(items[idx].label);
  //   });
});
/*
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
  render(
    <PopupMenu menuItems={items} selectedRow={{}} variation="UserManagement" />
  );
  userEvent.click(screen.getByTestId(POPUP_TRIGGER_TEST_ID));
  userEvent.click(screen.getByText(items[1].label));

  expect(screen.getByText(items[1].formatConfirmationMessage())).toBeVisible();
  expect(screen.getByText("Confirm", { selector: "button" })).toBeVisible;
  expect(screen.getByText("Cancel", { selector: "button" })).toBeVisible();
});
*/
