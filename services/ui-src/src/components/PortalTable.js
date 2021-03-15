import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';

function handleCellClick(row)
{
    if (row.row) {
        console.log("Clicked:" + JSON.stringify(row.row) + " -- " + row.column);
    } else {
        console.log("ignore")
    }
}

export default function PortalTable({rows,columns}) {
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} pageSize={5} disableColumnMenu="false" disableSelectionOnClick="false" />
        </div>
    );
}
