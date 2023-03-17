import React from "react";
import { act } from "react-dom/test-utils";
import {
  fireEvent,
  render,
  screen,
  within,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import selectEvent from "react-select-event";

import PortalTable, { CustomFilterTypes, CustomFilterUi } from "./PortalTable";

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

    it("renders the filter pane when filter button is pressed", async () => {
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
      await waitFor(() => expect(filterPane).toBeVisible());
      const closeButton = within(filterPane).getByRole("button", {
        name: /close/i,
      });
      expect(closeButton).toHaveFocus();
    });

    it("closes the filter pane when close button is pressed", async () => {
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
      await waitFor(() => expect(filterPane).toBeVisible());
      const closeButton = within(filterPane).getByRole("button", {
        name: /close/i,
      });

      fireEvent.click(closeButton);
      await waitFor(() =>
        expect(screen.queryByRole("search", { name: /filter/i })).toBeNull()
      );
    });

    it("displays a section for each filter-able column", async () => {
      const myRef = {};
      render(
        <div id="myContainer">
          <PortalTable
            columns={[
              { Header: "Foo", accessor: "foo" },
              {
                Header: "Bar",
                accessor: "bar",
                disableFilters: false,
                filter: CustomFilterTypes.MultiCheckbox,
                Filter: CustomFilterUi.MultiCheckbox,
              },
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
      await waitFor(() => expect(barButton).toBeVisible());

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

    it("supports date range filters", async () => {
      const myRef = {};
      render(
        <div id="myContainer">
          <PortalTable
            columns={[
              { Header: "Foo", accessor: "foo" },
              {
                Header: "Bar",
                accessor: "bar",
                disableFilters: false,
                filter: CustomFilterTypes.MultiCheckbox,
                Filter: CustomFilterUi.MultiCheckbox,
              },
              {
                Header: "Baz",
                accessor: "baz",
                disableFilters: false,
                filter: CustomFilterTypes.DateRange,
                Filter: CustomFilterUi.DateRange,
              },
            ]}
            data={[
              { foo: 1, bar: "two", baz: "2021-01-02" },
              { foo: 3, bar: "four", baz: "2021-03-04" },
            ]}
            withSearchBar
            pageContentRef={myRef}
          />
        </div>
      );
      myRef.current = document.getElementById("myContainer");

      fireEvent.click(screen.getByRole("button", { name: /filter/i }));

      const filterPane = screen.getByRole("search", { name: /filter/i });
      const bazButton = within(filterPane).getByRole("button", {
        name: /baz/i,
      });
      await waitFor(() => expect(bazButton).toBeVisible());

      const bazOptionSection = document.getElementById(
        bazButton.getAttribute("aria-controls")
      );
      expect(bazOptionSection).not.toBeVisible();

      fireEvent.click(bazButton);
      expect(bazOptionSection).toBeVisible();

      const bazDateContainer = within(bazOptionSection).getByRole("combobox");
      expect(bazDateContainer).toBeVisible();
      const bazDateInput =
        within(bazDateContainer).getByPlaceholderText(/select date range/i);
      fireEvent.click(bazDateInput);
      userEvent.type(bazDateInput, "2021010120210201{enter}");

      expect(screen.queryByText(/two/i, { selector: "td" })).not.toBeNull();
      expect(screen.queryByText(/four/i, { selector: "td" })).toBeNull();

      fireEvent.click(screen.getByRole("button", { name: /reset/i }));

      expect(screen.queryByText(/two/i, { selector: "td" })).not.toBeNull();
      expect(screen.queryByText(/four/i, { selector: "td" })).not.toBeNull();
    });

    it("supports territory filters", async () => {
      const myRef = {};
      render(
        <div id="myContainer">
          <PortalTable
            columns={[
              { Header: "Foo", accessor: "foo" },
              {
                Header: "Bar",
                accessor: "bar",
                disableFilters: false,
                filter: CustomFilterTypes.MultiCheckbox,
                Filter: CustomFilterUi.MultiCheckbox,
              },
              {
                Header: "Baz",
                accessor: "baz",
                disableFilters: false,
                filter: "includesValue",
                Filter: CustomFilterUi.TerritorySelect,
              },
            ]}
            data={[
              { foo: 1, bar: "two", baz: "MD" },
              { foo: 3, bar: "four", baz: "VA" },
            ]}
            withSearchBar
            pageContentRef={myRef}
          />
        </div>
      );
      // myRef.current = document.getElementById("myContainer");
      // fireEvent.click(screen.getByRole("button", { name: /filter/i }));
      // const filterPane = screen.getByRole("search", { name: /filter/i });
      // const bazButton = within(filterPane).getByRole("button", {
      //   name: /baz/i,
      // });
      // await waitFor(() => expect(bazButton).toBeVisible());
      // const bazOptionSection = document.getElementById(
      //   bazButton.getAttribute("aria-controls")
      // );
      // expect(bazOptionSection).not.toBeVisible();
      // fireEvent.click(bazButton);
      // await waitFor(() => expect(bazOptionSection).toBeVisible());
      // await selectEvent.select(document.getElementById("baz-filter-select"), [
      //   "Maryland",
      // ]);
      // expect(screen.queryByText(/two/i, { selector: "td" })).not.toBeNull();
      // expect(screen.queryByText(/four/i, { selector: "td" })).toBeNull();
      // await selectEvent.clearAll(document.getElementById("baz-filter-select"));
      // expect(screen.queryByText(/two/i, { selector: "td" })).not.toBeNull();
      // expect(screen.queryByText(/four/i, { selector: "td" })).not.toBeNull();
      // await selectEvent.select(document.getElementById("baz-filter-select"), [
      //   "Virginia",
      // ]);
      // expect(screen.queryByText(/two/i, { selector: "td" })).toBeNull();
      // expect(screen.queryByText(/four/i, { selector: "td" })).not.toBeNull();
    });

    it("filters the table based on user selection", () => {
      const myRef = {};
      render(
        <div id="myContainer">
          <PortalTable
            columns={[
              { Header: "Foo", accessor: "foo" },
              {
                Header: "Bar",
                accessor: "bar",
                disableFilters: false,
                filter: CustomFilterTypes.MultiCheckbox,
                Filter: CustomFilterUi.MultiCheckbox,
              },
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

      expect(screen.queryByText(/four/i, { selector: "td" })).not.toBeNull();

      fireEvent.click(screen.getByRole("button", { name: /filter/i }));
      const filterPane = screen.getByRole("search", { name: /filter/i });
      const barButton = within(filterPane).getByRole("button", {
        name: /bar/i,
      });
      fireEvent.click(barButton);
      fireEvent.click(
        within(
          document.getElementById(barButton.getAttribute("aria-controls"))
        ).getByRole("checkbox", { name: /four/i })
      );

      expect(screen.queryByText(/four/i, { selector: "td" })).toBeNull();

      fireEvent.click(
        within(
          document.getElementById(barButton.getAttribute("aria-controls"))
        ).getByRole("checkbox", { name: /four/i })
      );

      expect(screen.queryByText(/four/i, { selector: "td" })).not.toBeNull();
    });

    it("displays a reset button for all filters", () => {
      const myRef = {};
      render(
        <div id="myContainer">
          <PortalTable
            columns={[
              { Header: "Foo", accessor: "foo" },
              {
                Header: "Bar",
                accessor: "bar",
                disableFilters: false,
                filter: CustomFilterTypes.MultiCheckbox,
                Filter: CustomFilterUi.MultiCheckbox,
              },
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

      expect(screen.queryByText(/four/i, { selector: "td" })).not.toBeNull();

      fireEvent.click(screen.getByRole("button", { name: /filter/i }));
      const filterPane = screen.getByRole("search", { name: /filter/i });
      const barButton = within(filterPane).getByRole("button", {
        name: /bar/i,
      });
      fireEvent.click(barButton);
      fireEvent.click(
        within(
          document.getElementById(barButton.getAttribute("aria-controls"))
        ).getByRole("checkbox", { name: /four/i })
      );

      expect(screen.queryByText(/four/i, { selector: "td" })).toBeNull();

      const resetButton = within(filterPane).getByRole("button", {
        name: /reset/i,
      });
      fireEvent.click(resetButton);

      expect(screen.queryByText(/four/i, { selector: "td" })).not.toBeNull();
    });
  });
});
