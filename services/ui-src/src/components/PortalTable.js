import * as React from "react";
import { useSortBy, useTable } from "react-table";

import Expand from "../images/Expand.svg";

export default function PortalTable({ ...props }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        // don't revert to original sort state when `data` prop changes
        autoResetSortBy: false,
        // once a column has been sorted, only toggle between sort orders - do
        // not go to original state
        disableSortRemove: true,
        ...props,
      },
      useSortBy
    );

  return (
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
    </table>
  );
}
