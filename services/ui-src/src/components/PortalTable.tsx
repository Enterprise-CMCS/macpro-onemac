import React, { ReactNode } from "react";
import {
  TableOptions,
  useExpanded,
  useFilters,
  useGlobalFilter,
  useSortBy,
  useTable,
} from "react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { constant, noop } from "lodash";
import cx from "classnames";

import Expand from "../images/Expand.svg";
import {
  SearchAndFilter,
  SearchFilterProps,
  customFilterTypes,
} from "./SearchAndFilter";
export { CustomFilterTypes, CustomFilterUi } from "./SearchAndFilter";

export type TableProps<V extends {}> = {
  className?: string;
  expandable?: boolean;
  searchBarTitle: ReactNode;
  withSearchBar?: boolean;
  TEMP_onReset?: () => void;
} & Pick<SearchFilterProps<V>, "pageContentRef"> &
  TableOptions<V>;

const defaultColumn = {
  Filter: constant(null),
  disableFilters: true,
  disableGlobalFilter: true,
};

export default function PortalTable<V extends {} = {}>({
  expandable,
  pageContentRef,
  searchBarTitle,
  withSearchBar,
  TEMP_onReset = noop,
  ...props
}: TableProps<V>) {
  const {
    columns,
    getTableProps,
    getTableBodyProps,
    headerGroups,
    // @ts-ignore FIXME remove when react-table types are improved
    preFilteredRows,
    // @ts-ignore FIXME remove when react-table types are improved
    preGlobalFilteredRows,
    rows,
    // @ts-ignore FIXME remove when react-table types are improved
    setAllFilters,
    // @ts-ignore FIXME remove when react-table types are improved
    setGlobalFilter,
    prepareRow,
  } = useTable<V>(
    {
      // don't revert to original sort state when `data` prop changes
      // @ts-ignore FIXME remove when react-table types are improved
      autoResetSortBy: false,
      // once a column has been sorted, only toggle between sort orders - do
      // not go to original state
      disableSortRemove: true,
      // @ts-ignore not passing enough default props per column for it to recognize
      defaultColumn,
      filterTypes: customFilterTypes,
      ...props,
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    useExpanded
  );

  return (
    <>
      {withSearchBar && (
        <SearchAndFilter
          allRows={preGlobalFilteredRows}
          // @ts-ignore FIXME remove when react-table types are improved
          columnsInternal={columns}
          onSearch={setGlobalFilter}
          pageContentRef={pageContentRef}
          searchBarTitle={searchBarTitle}
          setAllFilters={setAllFilters}
          TEMP_onReset={TEMP_onReset}
        />
      )}
      <div className="table-wrapper">
        <table className={props.className} {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    // @ts-ignore FIXME remove when react-table types are improved
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    id={`${column.id}ColHeader`}
                  >
                    {column.render("Header")}
                    <span>
                      {/* @ts-ignore FIXME remove when react-table types are improved */}
                      {column.isSorted ? (
                        // @ts-ignore FIXME remove when react-table types are improved
                        column.isSortedDesc ? (
                          <>
                            {" "}
                            <img
                              src={Expand}
                              alt="🔼"
                              style={{ transform: "rotate(180deg)" }}
                            />
                          </>
                        ) : (
                          <>
                            {" "}
                            <img src={Expand} alt="🔽" />
                          </>
                        )
                      ) : (
                        ""
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          {rows.length > 0 && (
            <tbody {...getTableBodyProps()}>
              {rows.map((row, rowIndex) => {
                // @ts-ignore FIXME remove when react-table types are improved
                prepareRow(row, rowIndex);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell, index) => {
                      return (
                        <td
                          id={
                            headerGroups[0].headers[index].id + "-" + rowIndex
                          }
                          {...cell.getCellProps()}
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
      </div>
      {rows.length === 0 &&
        (preFilteredRows.length > 0 || preGlobalFilteredRows.length > 0) && (
          <div className="no-results" role="status">
            <FontAwesomeIcon
              className="no-results-background"
              icon={faSearch}
            />
            <div className="no-results-message">
              <h4>No Results Found</h4>
              <p>
                Adjust your search and filter to find what you are looking for.
              </p>
            </div>
          </div>
        )}
    </>
  );
}
