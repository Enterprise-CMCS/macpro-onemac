import React, { useState, useEffect, useCallback } from "react";
import PageTitleBar, { TITLE_BAR_ID } from "../components/PageTitleBar";
import { EmptyList } from "../components/EmptyList";
import LoadingScreen from "../components/LoadingScreen";
import { ALERTS_MSG } from "../libs/alert-messages";
import { useLocation } from "react-router-dom";
import UserDataApi from "../utils/UserDataApi";
import { Alert } from "@cmsgov/design-system";
import { useAppContext } from "../libs/contextLib";
import PopupMenu from "../components/PopupMenu";
import pendingCircle from "../images/PendingCircle.svg";

const PENDING_CIRCLE_IMAGE = <img alt="" src={pendingCircle} />;

/**
 * User Management "Dashboard"
 */
const UserManagement = () => {
  const [userList, setUserList] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [alert, setAlert] = useState();
  const { userProfile } = useAppContext();

  const location = useLocation();

  /*
  const columns = [
    {
      field: "fullname",
      headerName: "State User"
    },
    {
      field: "email",
      headerName: "Email Address"
    },
    {
      field: "state",
      headerName: "State"
    },
    {
      field: "status",
      headerName: "Status"
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
*/
  const rows = [
    {
      firstName: "Elliot",
      lastName: "Alderson",
      email: "elliot.alderson@state.state.gov",
      stateCode: "MD",
      status: "pending",
      id: 1,
    },
    {
      firstName: "Angela",
      lastName: "Moss",
      email: "angela.moss@state.state.gov",
      stateCode: "NY",
      status: "granted",
      id: 2,
    },
    {
      firstName: "Tyrell",
      lastName: "Wellick",
      email: "tyrell.wellick@state.state.gov",
      stateCode: "MD",
      status: "denied",
      id: 3,
    },
    {
      firstName: "Philip",
      lastName: "Price",
      email: "philip.price@state.state.gov",
      stateCode: "NM",
      status: "revoked",
      id: 4,
    },
  ];

  const portalTableStyle = { width: "100%" };

  const loadUsers = useCallback( () => {

    UserDataApi.getMyUserList(userProfile.email)
      .then((ul) => {
        console.log("user List: ", ul);
        setUserList(ul);
      })
      .catch((error) => {
        console.log("Error while fetching user's list.", error);
        setAlert(ALERTS_MSG.DASHBOARD_LIST_FETCH_ERROR);
      });

  }, [userProfile] );

  // Load the data from the backend.
  useEffect(() => {
    let newAlert = ALERTS_MSG.NONE;
    if (location.state) newAlert = location.state.showAlert;
    setAlert(newAlert);

    loadUsers();

  }, [location, loadUsers]);

  const jumpToPageTitle = () => {
    var elmnt = document.getElementById(TITLE_BAR_ID);
    if (elmnt) elmnt.scrollIntoView();
  };

  useEffect(() => {
    let newIsLoading=true;
    let mounted=true;
    if (userList) newIsLoading=false;

    if (mounted) setIsLoading(newIsLoading);

    return function cleanup() {
      mounted = false;
    };
  }, [userList] );

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

  /**
   * Render the list of users
   * @param {Array} userList
   * @returns the table JSX
   */
  function renderUserList(users) {
    //Now generate the list
    return users.map((user, i) => {

      let menuItems = [];

      switch (user.status) {
        case "pending":
          menuItems = [
            { label: "Approve Access", value: "approved" },
            { label: "Deny Access", value: "deny" },
          ];
          break;
        case "granted":
          menuItems = [
            { label: "Revoke Access", value: "revoke" },
          ];
          break;
        case "denied":
          menuItems = [
            { label: "Grant Access", value: "grant" },
          ];
          break;
        case "revoked":
          menuItems = [
            { label: "Grant Access", value: "grant" },
          ];
          break;
        default:
          break;
      }

      return (
        <tr key={i}>
          <td>
            {user.firstName} {user.lastName}
          </td>
          <td>{user.email}</td>
          <td className="user-state">{user.stateCode}</td>
          <td className="user-status">{user.status==="pending" && PENDING_CIRCLE_IMAGE} {user.status}</td>
          <td>
            <PopupMenu
              selectedRow={i}
              userEmail={user.email}
              menuItems={menuItems}
              handleSelected={(row, value) => {
                UserDataApi.setUserStatus(userProfile.email, user.email, value);
                loadUsers();
                console.log("Seleccted:(" + row + " : " + value + ") userEmail : " + user.email + " doneBy " + userProfile.email);
              } }
            />
          </td>
        </tr>
      );
    });
  }

  // Render the dashboard
  return (
    <div className="dashboard-white">
      <PageTitleBar heading="User Management" text="" />
      {renderAlert(alert)}
      <div className="dashboard-container">
        <div style={portalTableStyle}>
          <LoadingScreen isLoading={isLoading}>
              {rows ? ( // {userList && userList !== "UR040" ? (
                <table className="user-table">
                  <thead>
                    <tr>
                      <th scope="col" width="20%" id="nameColHeader">Name</th>
                      <th scope="col" width="30%" id="emailColHeader">Email</th>
                      <th scope="col" width="20%" id="stateColHeader">State</th>
                      <th scope="col" width="15%" id="statusColHeader">Status</th>
                      <th scope="col" width="15%" id="personnelActionsColHeader">Personnel Actions</th>
                    </tr>
                  </thead>
                  <tbody>{renderUserList(rows)}</tbody>
                </table>
              ) : (
                <EmptyList message="You have no users yet." />
              )}
          </LoadingScreen>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
