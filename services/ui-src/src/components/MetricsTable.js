import React from "react";
import {useExpanded, useGroupBy, useTable} from "react-table";

/**
 * Read only component to Display Submission Data in table format
 * @Param: columns - react-table column format.
 * @Param: data - react-table data format.
 * @returns the component
 */
export default function MetricsTable({columns, data}) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable(
        {
            columns,
            data,
        },
        useGroupBy,
        useExpanded // useGroupBy would be pretty useless without useExpanded ;)
    )

    // We don't want to render all of the rows for this example, so cap
    // it at 100 for this use case
    const firstPageRows = rows.slice(0, 100)
    const collapseIcon = String.fromCharCode(8709) + "- ";
    const groupByIcon = String.fromCharCode(8721) + "- ";

    return (
        <div>
            <span>Group By Column Icon: {groupByIcon}</span>
            <span>Remove Group By Column Icon: {collapseIcon}</span>
            <table class="ds-c-table ds-c-table" {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>
                                    {column.canGroupBy ? (
                                        <span {...column.getGroupByToggleProps()}>
                                            {column.isGrouped ? collapseIcon  : groupByIcon }
                                        </span>
                                    ) : null}
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {firstPageRows.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return (
                                        <td>
                                            {cell.isGrouped ? (
                                                // If it's a grouped cell, add an expander and row count
                                                <>
                                                    <span {...row.getToggleRowExpandedProps()}>
                                                        {row.isExpanded ? '👇' : '👉'}
                                                    </span>
                                                    {' '}
                                                    {cell.render('Cell')} ({row.subRows.length})
                                                </>
                                            ) : cell.isAggregated ? (
                                                cell.render('Aggregated')
                                            ) : cell.isPlaceholder ? null : ( // For cells with repeated values, render null
                                                cell.render('Cell')
                                            )}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
