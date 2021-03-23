import React, { useState, useEffect } from "react";
import PageTitleBar, { TITLE_BAR_ID } from "../components/PageTitleBar";
import { EmptyList } from "../components/EmptyList";
import LoadingScreen from "../components/LoadingScreen";
import { ALERTS_MSG } from "../libs/alert-messages";
import { useLocation } from "react-router-dom";
import UserDataApi from "../utils/UserDataApi";
import { Alert } from "@cmsgov/design-system";
import { useAppContext } from "../libs/contextLib";
import PopupMenu from "../components/PopupMenu";
import { format } from "date-fns";

/**
 * User Management "Dashboard"
 */
const UserManagement = () => {
  const [userList, setUserList] = useState([]);
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
      field: "phone",
      headerName: "Phone Number"
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
      field: "requestdate",
      headerName: "Request Date"
    },
    {
      field: "actiondate",
      headerName: "Date Responded"
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

  const rows = [
    {
      fullname: "Elliot Alderson",
      email: "elliot.alderson@state.state.gov",
      phone: "555-1212",
      stateCode: "MD",
      status: "pending",
      requestdate: 1616462069507,
      actiondate: 1616462083507,
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
  const portalTableStyle = { width: "100%" };

  // Load the data from the backend.
  useEffect(() => {
    let newAlert = ALERTS_MSG.NONE;
    if (location.state) newAlert = location.state.showAlert;
    setAlert(newAlert);

    UserDataApi.getMyUserList(userProfile.email)
      .then((ul) => {
        console.log("user List: ", ul);
        setUserList(ul);
      })
      .catch((error) => {
        console.log("Error while fetching user's list.", error);
        setAlert(ALERTS_MSG.DASHBOARD_LIST_FETCH_ERROR);
      });
  }, [location, userProfile]);

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
        case "active":
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
          <td>{user.phone}</td>
          <td>{user.stateCode}</td>
          <td>{user.status}</td>
          <td className="date-submitted-column">
            {user.requestDate ? format(user.requestDate, "MMM d, yyyy") : "" }
          </td>
          <td className="date-submitted-column">
          {user.actionDate ? format(user.actionDate, "MMM d, yyyy") : "" }
          </td>
          <td>
            <PopupMenu
              selectedRow={i}
              menuItems={menuItems}
              handleSelected={(row, value) =>
                console.log("Seleccted:(" + row + " : " + value + ")")
              }
            />
            {popup}
          </td>
        </tr>
      );
    });
  }

  // Render the dashboard
  return (
    <div className="dashboard-white">
      <PageTitleBar heading="Account Management" text="" />
      {renderAlert(alert)}
      <div className="dashboard-container">
        <div style={portalTableStyle}>
          <LoadingScreen isLoading={isLoading}>
              {userList && userList !== "UR040" ? (
                <table className="user-table">
                  <thead>
                    <tr>
                      <th scope="col">State User</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone</th>
                      <th scope="col">State</th>
                      <th scope="col">Status</th>
                      <th className="date-submitted-column" scope="col">
                        Request Date
                      </th>
                      <th className="date-submitted-column" scope="col">
                        Action Date
                      </th>
                      <th scope="col">Personnel Actions</th>
                    </tr>
                  </thead>
                  <tbody>{renderUserList(userList)}</tbody>
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
