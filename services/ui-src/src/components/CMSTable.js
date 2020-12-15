import React, {useEffect, useState} from 'react'
import {useTable, useGroupBy, useExpanded} from 'react-table'
import ChangeRequestDataApi from "../utils/ChangeRequestDataApi";
import {formatDateOnly} from "../utils/date-utils";
import LoadingScreen from "./LoadingScreen";
import {s3JsonToCsv} from "../utils/csvUtils";
import "./CMSTable.css"

export function formatS3Data(data) {
    const tableData = []
    data.forEach(newData => {
        tableData.push({
            transmittalNumber: newData.transmittalNumber,
            territory: newData.territory,
            createdAt: formatDateOnly(newData.createdAt),
            email: newData.user.email,
            state: newData.state,
            type: newData.type
        })
    });
    return tableData;
}

function tableData(rawJsonData) {
    const tableData = formatS3Data(rawJsonData)
    return tableData;
}

export default function CMSTable() {

    const [changeRequestCSV, setChangeRequestCSV] = useState([]);
    const [changeRequestList, setChangeRequestList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        async function onLoad() {
            try {

                const metrics = await ChangeRequestDataApi.listAll();
                console.log(JSON.stringify(metrics))
                setChangeRequestList(tableData(metrics))
                const csvData = s3JsonToCsv(metrics)
                setChangeRequestCSV(csvData)
            } catch {
                return [];
            }
            setIsLoading(false)
        }

        onLoad();
    }, []);

    function Table({columns, data}) {
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
                <table {...getTableProps()}>
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

    const columns = React.useMemo(
        () => [
            {
                Header: 'Transmittal Number',
                accessor: 'transmittalNumber',
                aggregate: 'count',
                Aggregated: ({ value }) => `${value} (transmittalNumber)`,
            },
            {
                Header: 'Territory',
                accessor: 'territory',
                aggregate: 'count',
                Aggregated: ({ value }) => `${value} (territory)`,
            },
            {
                Header: 'Date Created',
                accessor: 'createdAt',
                aggregate: 'count',
                Aggregated: ({ value }) => `${value} (createdAt)`,
            },
            {
                Header: 'User Email',
                accessor: 'email',
                aggregate: 'count',
                Aggregated: ({ value }) => `${value} (email)`,
            }, {
                Header: 'Form Type',
                accessor: 'state',
                aggregate: 'count',
                Aggregated: ({ value }) => `${value} (state)`,
            },
            {
                Header: 'Attachment Type',
                accessor: 'type',
                aggregate: 'count',
                Aggregated: ({ value }) => `${value} (type)`,
            },
        ],
        []
    )

    function downloadCsv() {

        var hiddenElement = document.createElement('a');
        hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(changeRequestCSV);
        hiddenElement.target = '_blank';
        hiddenElement.download = 'SPAFormMetrics.csv';
        hiddenElement.click();

    }

    return (
        <div>
            <LoadingScreen isLoading={isLoading}>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Table columns={columns} data={changeRequestList}/>
                </div>
                <br/>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <button class="ds-c-button" onClick={downloadCsv}>&nbsp;Download Metrics (CSV format)</button>
                </div>
            </LoadingScreen>
        </div>
    );
}
