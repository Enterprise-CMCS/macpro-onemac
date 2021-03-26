import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';

export default function PortalTable({rows,columns, style}) {

    return (
        <div style={style}>
            <DataGrid rows={rows} columns={columns} pageSize={5} disableColumnMenu="false" disableSelectionOnClick="false" />
        </div>
    );
}
