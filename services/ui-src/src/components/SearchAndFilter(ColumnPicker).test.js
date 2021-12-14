import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ColumnPicker } from "./SearchAndFilter";

describe("ColumnPicker", () => {
  it("renders a button component that is not expanded", () => {
    render(<ColumnPicker />);
    const backButton = screen.getByRole("button", {
      name: /show\/hide columns/i,
    });
    expect(backButton).toBeVisible();
  });

  it("opens a dropdown with a list array of columns", () => {
    const internalColumns = [
      {
        Header: "test text",
        id: "test",
        toggleHidden: jest.fn(),
        isVisible: true,
      },
    ];
    render(<ColumnPicker columnsInternal={internalColumns} />);

    const columnPickerButton = screen.getByRole("button", {
      name: /show\/hide columns/i,
    });
    fireEvent.click(columnPickerButton);
    const dropdownBox = screen.getByRole("listbox", {
      name: "Column Picker For Table",
    });
    expect(dropdownBox).toBeVisible();
    const dropdownOptions = screen.getAllByRole("checkbox");
    expect(dropdownOptions).toHaveLength(internalColumns.length);
    dropdownOptions.forEach((option) => {
      expect(dropdownBox).toContainElement(option);
      expect(option).toBeVisible();
    });
  });

  it("toggles columns in the table", () => {
    const internalColumns = [
      {
        Header: "test text",
        id: "test",
        toggleHidden: jest.fn(),
        isVisible: true,
      },
    ];
    render(<ColumnPicker columnsInternal={internalColumns} />);

    const columnPickerButton = screen.getByRole("button", {
      name: /show\/hide columns/i,
    });
    fireEvent.click(columnPickerButton);
    const dropdownOptions = screen.getAllByRole("checkbox");
    expect(dropdownOptions[0]).toBeChecked();
    fireEvent.click(dropdownOptions[0]);
    expect(internalColumns[0].toggleHidden).toBeCalledTimes(1);
  });
});
