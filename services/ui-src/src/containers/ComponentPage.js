import React  from "react";
import CardButton from "../components/cardButton";
import PortalTable from "../components/PortalTable";
import PopupMenu from "../components/PopupMenu";

export default function ComponentPage() {

    const menuItems = [{label: "Approve Access", value: "approved"}, {label: "Deny Access", value: "deny"}]

    const columns = [
        {
            field: 'stateUser',
            headerName: 'State User',
            width: 250,
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
            width: 350,
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
                    <PopupMenu selectedRow={params.value} menuItems={menuItems}
                               handleSelected={(row,value) => console.log("Seleccted:(" + row + " : " + value + ")") } />
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

    const portalTableStyle = { height: "400px", width: "100%"}

    return (<>
        <div id="title_bar" className="page-title-bar"><h1>Component Page</h1></div>
        <section className="ds-l-container preview__grid">
            <div className="ds-l-row">
                <div className="ds-l-col--6">
                    <div><h2>SPA Card Button</h2></div>
                    <CardButton type='spa'></CardButton>
                </div>
                <div className="ds-l-col--6">
                    <div><h2>Waiver Card Button</h2></div>
                    <CardButton type='waiver'></CardButton>
                </div>
            </div>
            <h1> Portal Table Component Demo</h1>
            <div className="ds-l-row">
                <div className="ds-l-col--12">
                    <PortalTable className="portalTable" style={portalTableStyle} width="100%" rows={rows} columns={columns}/>
                </div>
            </div>
            </section>
    </>
    );
}
