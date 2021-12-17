import React from "react";
import { act } from "react-dom/test-utils";
import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import PortalTable, { textFilterColumnProps } from "./PortalTable";

it("renders without crashing", () => {
  render(<PortalTable columns={[]} data={[]} />);
});

describe("column headers", () => {
  it("renders column headers even with no data", () => {
    render(
      <PortalTable
        columns={[
          { Header: "First Column", id: "my-first-column" },
          { Header: "Second Column", id: "my-second-column" },
        ]}
        data={[]}
      />
    );

    expect(screen.getByRole("columnheader", { name: /first/i })).toBeVisible();
    expect(screen.getByRole("columnheader", { name: /second/i })).toBeVisible();
  });

  it("does not render hidden column headers", () => {
    render(
      <PortalTable
        columns={[
          { Header: "First Column", id: "my-first-column" },
          { Header: "Second Column", id: "my-second-column" },
        ]}
        data={[]}
        initialState={{ hiddenColumns: ["my-first-column"] }}
      />
    );

    expect(screen.queryByRole("columnheader", { name: /first/i })).toBeNull();
    expect(screen.getByRole("columnheader", { name: /second/i })).toBeVisible();
  });
});

it("displays rows when tabular data is provided", () => {
  const columns = [
    { Header: "First Column", accessor: "firstValue" },
    { Header: "Second Column", accessor: "secondValue" },
  ];
  const data = [
    { firstValue: 1, secondValue: "two" },
    { firstValue: 3, secondValue: "four" },
  ];
  render(<PortalTable columns={columns} data={data} />);

  const rows = screen.getAllByRole("row");
  expect(rows).toHaveLength(data.length + 1); // includes table header row
  rows.slice(1).forEach((row, rowIndex) =>
    within(row)
      .getAllByRole("cell")
      .forEach((cell, cellIndex) => {
        expect(cell).toBeVisible();
        expect(cell).toHaveAttribute(
          "id",
          `${columns[cellIndex].accessor}-${rowIndex}`
        );
        expect(cell).toHaveTextContent(
          data[rowIndex][columns[cellIndex].accessor].toString()
        );
      })
  );
});

describe("search and filter features", () => {
  describe("search", () => {
    it("renders a search bar when passed `withSearchBar` prop", () => {
      render(<PortalTable columns={[]} data={[]} withSearchBar />);
      expect(screen.getByRole("textbox", { name: /search/i })).toBeVisible();
    });

    it("responds to user input in search bar", () => {
      render(<PortalTable columns={[]} data={[]} withSearchBar />);

      const searchBar = screen.getByRole("textbox", { name: /search/i });
      fireEvent.change(searchBar, { target: { value: "foo bar baz" } });
      expect(searchBar).toHaveDisplayValue("foo bar baz");
    });

    it("allows user to clear search bar", () => {
      render(<PortalTable columns={[]} data={[]} withSearchBar />);

      const searchBar = screen.getByRole("textbox", { name: /search/i });
      fireEvent.change(searchBar, { target: { value: "foo bar baz" } });
      expect(searchBar).toHaveDisplayValue("foo bar baz");

      fireEvent.click(screen.getByRole("button", { name: /clear/i }));
      expect(searchBar).toHaveDisplayValue("");
    });

    it("displays a 'no results' message when table is empty", async () => {
      render(
        <PortalTable
          columns={[{ Header: "Foo", accessor: "foo" }]}
          data={[{ foo: "bbb" }]}
          withSearchBar
        />
      );

      expect(screen.queryByRole("status")).toBeNull();

      await act(async () => {
        fireEvent.change(screen.getByRole("textbox", { name: /search/i }), {
          target: { value: "aa" },
        });
        await new Promise((r) => setTimeout(r, 500)); // wait for debounce
      });

      expect(screen.getByRole("status")).toHaveTextContent(/no results/i);
    });
  });

  describe("filter", () => {
    it("renders a button to open filter pane when passed `withSearchBar` prop", () => {
      render(<PortalTable columns={[]} data={[]} withSearchBar />);
      expect(screen.getByRole("button", { name: /filter/i })).toBeVisible();
    });

    it("renders the filter pane when filter button is pressed", () => {
      const myRef = {};
      render(
        <div id="myContainer">
          <PortalTable
            columns={[]}
            data={[]}
            withSearchBar
            pageContentRef={myRef}
          />
        </div>
      );
      myRef.current = document.getElementById("myContainer");

      fireEvent.click(screen.getByRole("button", { name: /filter/i }));

      const filterPane = screen.getByRole("search", { name: /filter/i });
      expect(filterPane).toBeVisible();
      const closeButton = within(filterPane).getByRole("button", {
        name: /close/i,
      });
      expect(closeButton).toHaveFocus();
    });

    it("closes the filter pane when close button is pressed", () => {
      const myRef = {};
      render(
        <div id="myContainer">
          <PortalTable
            columns={[]}
            data={[]}
            withSearchBar
            pageContentRef={myRef}
          />
        </div>
      );
      myRef.current = document.getElementById("myContainer");

      fireEvent.click(screen.getByRole("button", { name: /filter/i }));

      const filterPane = screen.getByRole("search", { name: /filter/i });
      expect(filterPane).toBeVisible();
      const closeButton = within(filterPane).getByRole("button", {
        name: /close/i,
      });

      fireEvent.click(closeButton);

      expect(screen.queryByRole("search", { name: /filter/i })).toBeNull();
    });

    it("displays a section for each filter-able column", () => {
      const myRef = {};
      render(
        <div id="myContainer">
          <PortalTable
            columns={[
              { Header: "Foo", accessor: "foo" },
              { Header: "Bar", accessor: "bar", ...textFilterColumnProps },
            ]}
            data={[
              { foo: 1, bar: "two" },
              { foo: 3, bar: "four" },
            ]}
            withSearchBar
            pageContentRef={myRef}
          />
        </div>
      );
      myRef.current = document.getElementById("myContainer");

      fireEvent.click(screen.getByRole("button", { name: /filter/i }));

      const filterPane = screen.getByRole("search", { name: /filter/i });
      expect(
        within(filterPane).queryByRole("button", { name: /foo/i })
      ).toBeNull();
      const barButton = within(filterPane).getByRole("button", {
        name: /bar/i,
      });
      expect(barButton).toBeVisible();

      const barOptionSection = document.getElementById(
        barButton.getAttribute("aria-controls")
      );
      expect(barOptionSection).not.toBeVisible();

      fireEvent.click(barButton);
      expect(barOptionSection).toBeVisible();

      expect(
        within(barOptionSection).getByRole("checkbox", { name: /two/i })
      ).toBeVisible();
      expect(
        within(barOptionSection).getByRole("checkbox", { name: /four/i })
      ).toBeVisible();
    });
  });
});
