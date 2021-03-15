import React, {useState} from "react";
import CardButton from "../components/cardButton";
import {territoryList} from "../libs/territoryLib";
import PortalTable from "../components/PortalTable";
import TablePopover from "../components/PopOver";
import PopOver from "../components/PopOver";

export default function ComponentPage() {
    const options = territoryList;
    const [value, setValue] = useState([])

    const handleCancel = () => {
        console.log("handledCancel Called ... Value: " + value)
    }
    const columns = [
        {
            field: 'stateUser',
            headerName: 'State User',
            width: 150,
            renderCell: (params) => (
                <>
                    <div className="portalTable">
                        {params.value}
                    </div>
                </>
            ),
        },
        {
            field: 'stateUser',
            headerName: 'State User',
            width: 150,
            renderCell: (params) => (
                <>
                    <div className="portalTable">
                        {params.value}
                    </div>
                </>
            ),
        },
        {
            field: 'email',
            headerName: 'Email Address',
            width: 150,
            renderCell: (params) => (
                <>
                    <div className="portalTable">
                        {params.value}
                    </div>
                </>
            ),
        },
        {
            field: 'stateCode',
            headerName: 'State',
            width: 100,
            renderCell: (params) => (
                <>
                    <div className="portalTable">
                        {params.value}
                    </div>
                </>
            ),
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 100,
            renderCell: (params) => (
                <>
                    <div className="portalTable">
                        {params.value}
                    </div>
                </>
            ),
        },
        {
            field: 'id',
            headerName: 'Personnel Actions',
            width: 150,
            disableColumnSelector: false,
            renderCell: (params) => (
                <>
                    <PopOver selectedRow={params.value}/>
                </>
            ),
        },
    ];

    const rows = [
        {
            stateUser: "Elliot Alderson",
            email: "elliot.alderson@state.state.gov",
            stateCode: "MD",
            status: "pending",
            id: 1,
        },
        {
            stateUser: "Angela Moss",
            email: "angela.moss@state.state.gov",
            stateCode: "NY",
            status: "active",
            id: 2,
        },
        {
            stateUser: "Tyrell Wellick",
            email: "tyrell.wellick@state.state.gov",
            stateCode: "MD",
            status: "revoked",
            id: 3,
        },
        {
            stateUser: "Philip Price",
            email: "philip.price@state.state.gov",
            stateCode: "NM",
            status: "active",
            id: 4,
        },
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
                    <div className="ds-l-col--12">
                        <PortalTable className="portalTable" rows={rows} columns={columns}/>
                    </div>
                </div>
            </section>
        </>
    );
}
