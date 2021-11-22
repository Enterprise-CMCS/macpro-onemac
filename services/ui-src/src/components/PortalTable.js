import * as React from "react";
import { useGlobalFilter, useSortBy, useTable } from "react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import Expand from "../images/Expand.svg";
import { SearchAndFilter } from "./SearchAndFilter";

export default function PortalTable({ withSearchBar, ...props }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    setGlobalFilter,
    prepareRow,
  } = useTable(
    {
      // don't revert to original sort state when `data` prop changes
      autoResetSortBy: false,
      // once a column has been sorted, only toggle between sort orders - do
      // not go to original state
      disableSortRemove: true,
      ...props,
    },
    useGlobalFilter,
    useSortBy
  );

  return (
    <>
      {withSearchBar && <SearchAndFilter onSearch={setGlobalFilter} />}
      <table className={props.className} {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  id={`${column.id}ColHeader`}
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted ? (
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
              prepareRow(row, rowIndex);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell, index) => {
                    return (
                      <td
                        id={headerGroups[0].headers[index].id + "-" + rowIndex}
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
      {rows.length === 0 && withSearchBar && (
        <div className="no-results">
          <FontAwesomeIcon className="no-results-background" icon={faSearch} />
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
