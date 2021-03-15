import React, { useState } from "react";
import CardButton from "../components/cardButton";
import {territoryList} from "../libs/territoryLib";
import MultiSelectDropDown from "../components/MultiSelectDropDown";
import PortalTable from "../components/PortalTable";
export default function ComponentPage() {
    const options = territoryList;
    const [value, setValue] = useState([])

    const handleCancel = () => {
        console.log("handledCancel Called ... Value: " + value)
    }
    const columns = [
        { field: 'id', headerName: 'State User', width: 70 },
        { field: 'firstName', headerName: 'Email', width: 130 },
        { field: 'lastName', headerName: 'State', width: 130 },
        { field: 'lastName', headerName: 'Status', width: 130 },
        {
            field: 'Personnel Action',
            headerName: 'Age',
            type: 'number',
            width: 90,
        },
        {
            field: 'fullName',
            headerName: 'Full name',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160,
            valueGetter: (params) =>
                `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
        },
    ];

    const rows = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    ];


    return (<>
        <div id="title_bar" className="page-title-bar"><h1>Component Page</h1></div>
        <section class="ds-l-container preview__grid">
            <div class="ds-l-row">
                <div className="ds-l-col--6">
                    <div><h2>SPA Card Button</h2></div>
                    <CardButton type='spa'></CardButton>
                </div>
                <div className="ds-l-col--6">
                    <div><h2>Waiver Card Button</h2></div>
                    <CardButton type='waiver'></CardButton>
                </div>
            </div>
            <div className="ds-l-row">
                <div className="ds-l-lg-col--12">
                <PortalTable rows={rows} columns={columns}/>
                </div>
            </div>
            </section>
    </>
    );
}
