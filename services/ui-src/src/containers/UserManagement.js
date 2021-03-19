import React, { useState, useEffect } from "react";
import PageTitleBar, { TITLE_BAR_ID } from "../components/PageTitleBar";
import { EmptyList } from "../components/EmptyList";
import LoadingScreen from "../components/LoadingScreen";
import { ALERTS_MSG } from "../libs/alert-messages";
import { useLocation } from "react-router-dom";
import UserDataApi from "../utils/UserDataApi";
import { Alert } from "@cmsgov/design-system";
import { useAppContext } from "../libs/contextLib";
import PortalTable from "../components/PortalTable";
import PopupMenu from "../components/PopupMenu";

/**
 * User Management "Dashboard"
 */
const UserManagement = () => {
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [alert, setAlert] = useState();
  const { userProfile } = useAppContext();

  const location = useLocation();

  const menuItems = [
    { label: "Approve Access", value: "approved" },
    { label: "Deny Access", value: "deny" },
  ];

  const columns = [
    {
      field: "stateUser",
      headerName: "State User",
      width: 250,
      renderCell: (params) => (
        <>
          <div className="portalTable">{params.value}</div>
        </>
      ),
    },
    {
      field: "email",
      headerName: "Email Address",
      width: 350,
      renderCell: (params) => (
        <>
          <div className="portalTable">{params.value}</div>
        </>
      ),
    },
    {
      field: "stateCode",
      headerName: "State",
      width: 100,
      renderCell: (params) => (
        <>
          <div className="portalTable">{params.value}</div>
        </>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      renderCell: (params) => (
        <>
          <div className="portalTable">{params.value}</div>
        </>
      ),
    },
    {
      field: "id",
      headerName: "Personnel Actions",
      width: 150,
      disableColumnSelector: false,
      renderCell: (params) => (
        <>
          <PopupMenu
            selectedRow={params.value}
            menuItems={menuItems}
            handleSelected={(row, value) =>
              console.log("Seleccted:(" + row + " : " + value + ")")
            }
          />
        </>
      ),
    },
  ];

  /*  const rows = [
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
*/
  const portalTableStyle = { height: "400px", width: "100%" };

  // Load the data from the backend.
  useEffect(() => {
    let mounted = true;
    let newAlert = ALERTS_MSG.NONE;
    let tmpUserList;

    async function onLoad() {
      try {
        tmpUserList = await UserDataApi.getMyUserList(userProfile.email);
        console.log("Response is: ", tmpUserList);
        if (mounted) setIsLoading(false);
      } catch (error) {
        console.log("Error while fetching user's list.", error);
        newAlert = ALERTS_MSG.DASHBOARD_LIST_FETCH_ERROR;
      }
    }

    if (location.state) newAlert = location.state.showAlert;
    if (mounted && userProfile.email) onLoad();
    if (mounted) setUserList(tmpUserList);
    if (mounted) setAlert(newAlert);

    return function cleanup() {
      mounted = false;
    };
  }, [location, userProfile]);

  const jumpToPageTitle = () => {
    var elmnt = document.getElementById(TITLE_BAR_ID);
    if (elmnt) elmnt.scrollIntoView();
  };

  useEffect(() => {
    if (alert && alert.heading && alert.heading !== "") {
      jumpToPageTitle();
    }
  }, [alert]);

  const renderAlert = (alert) => {
    if (!alert) return;
    if (alert.heading && alert.heading !== "") {
      return (
        <div className="alert-bar">
          <Alert variation={alert.type} heading={alert.heading}>
            <p className="ds-c-alert__text">{alert.text}</p>
          </Alert>
        </div>
      );
    }
  };

  // Render the dashboard
  return (
    <div className="dashboard-white">
      <PageTitleBar heading="Account Management" text="" />
      {renderAlert(alert)}
      <div className="dashboard-container">
        <LoadingScreen isLoading={isLoading}>
          {userList ? (
            <PortalTable
              className="portalTable"
              style={portalTableStyle}
              width="100%"
              rows={userList}
              columns={columns}
            />
          ) : (
            <EmptyList message="You have no submissions yet." />
          )}
        </LoadingScreen>
      </div>
    </div>
  );
};

export default UserManagement;
