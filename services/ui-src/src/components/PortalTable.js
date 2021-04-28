import * as React from "react";
import { useSortBy, useTable } from "react-table";

import Expand from "../images/Expand.svg";

export default function PortalTable({ ...props }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      ...props,
    },
    useSortBy
  );

  return (
    <table className="user-table" {...getTableProps()}>
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
                        <img src={Expand} alt="🔽" />
                      </>
                    ) : (
                      <>
                        {" "}
                        <img src={Expand} alt="🔼" style={{ transform: "rotate(180deg)" }} />
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
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
