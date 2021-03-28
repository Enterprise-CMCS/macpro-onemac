import React, { useState, useEffect } from "react";
import PageTitleBar, { TITLE_BAR_ID } from "../components/PageTitleBar";
import { EmptyList } from "../components/EmptyList";
import LoadingScreen from "../components/LoadingScreen";
import { ALERTS_MSG } from "../libs/alert-messages";
import { ROUTES } from "../Routes";
import { useLocation, useHistory } from "react-router-dom";
import UserDataApi from "../utils/UserDataApi";
import { Alert } from "@cmsgov/design-system";
import { useAppContext } from "../libs/contextLib";
import PopupMenu from "../components/PopupMenu";
import pendingCircle from "../images/PendingCircle.svg";
import {
  pendingMessage,
  grantConfirmMessage,
  denyConfirmMessage,
  revokeConfirmMessage,
} from "../libs/userLib";

const PENDING_CIRCLE_IMAGE = (
  <img alt="" className="pending-circle" src={pendingCircle} />
);

/**
 * User Management "Dashboard"
 */
const UserManagement = () => {
  const [userList, setUserList] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [alert, setAlert] = useState();
  const { userProfile } = useAppContext();
  const [includeStateCode, setIncludeStateCode] = useState(true);
  const history = useHistory();
  const location = useLocation();

  // Load the data from the backend.
  useEffect(() => {
    let mounted = true;
    if (
      !userProfile ||
      !userProfile.userData ||
      (userProfile.userData.type !== "systemadmin" &&
        (!userProfile.userData.attributes ||
          userProfile.userData.type === "stateuser"))
    ) {
      history.push(ROUTES.DASHBOARD);
    }

    let newAlert = ALERTS_MSG.NONE;
    if (location.state) newAlert = location.state.showAlert;
    if (mounted) setAlert(newAlert);

    let shouldState = true;
    if (userProfile.userData.type === "stateadmin") {
      shouldState = false;
    }
    if (mounted) setIncludeStateCode(shouldState);

    UserDataApi.getMyUserList(userProfile.email)
      .then((ul) => {
        console.log("user List: ", ul);
        if (mounted) setUserList(ul);
      })
      .catch((error) => {
        console.log("Error while fetching user's list.", error);
        if (mounted) setAlert(ALERTS_MSG.DASHBOARD_LIST_FETCH_ERROR);
      });

    return function cleanup() {
      mounted = false;
    };
  }, [location, userProfile, history]);

  const jumpToPageTitle = () => {
    var elmnt = document.getElementById(TITLE_BAR_ID);
    if (elmnt) elmnt.scrollIntoView();
  };

  useEffect(() => {
    let newIsLoading = true;
    let mounted = true;
    if (userList) newIsLoading = false;

    if (mounted) setIsLoading(newIsLoading);

    return function cleanup() {
      mounted = false;
    };
  }, [userList]);

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
      let statusLabel;

      switch (user.status) {
        case "pending":
          statusLabel = <>{PENDING_CIRCLE_IMAGE} Pending</>;
          menuItems = [
            {
              label: "Approve Access",
              value: "approved",
              confirmMessage: grantConfirmMessage[userProfile.userData.type],
            },
            {
              label: "Deny Access",
              value: "deny",
              confirmMessage: denyConfirmMessage[userProfile.userData.type],
            },
          ];
          break;
        case "granted":
        case "active":
          statusLabel = "Granted";
          menuItems = [
            {
              label: "Revoke Access",
              value: "revoke",
              confirmMessage: revokeConfirmMessage[userProfile.userData.type],
            },
          ];
          break;
        case "denied":
          statusLabel = "Denied";
          menuItems = [
            {
              label: "Grant Access",
              value: "grant",
              confirmMessage: grantConfirmMessage[userProfile.userData.type],
            },
          ];
          break;
        case "revoked":
          statusLabel = "Revoked";
          menuItems = [
            {
              label: "Grant Access",
              value: "grant",
              confirmMessage: grantConfirmMessage[userProfile.userData.type],
            },
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
          {includeStateCode && <td className="user-state">{user.stateCode}</td>}
          <td className="user-status">{statusLabel}</td>
          <td className="actions">
            <PopupMenu
              selectedRow={i}
              userEmail={user.email}
              menuItems={menuItems}
              handleSelected={(row, value) => {
                UserDataApi.setUserStatus(userProfile.email, user.email, value);
                history.push({
                  pathname: ROUTES.USER_MANAGEMENT,
                  query: "?query=abc",
                  state: {
                    showAlert: ALERTS_MSG.SUBMISSION_SUCCESS,
                  },
                });

                console.log(
                  "Selected:(" +
                    row +
                    " : " +
                    value +
                    ") userEmail : " +
                    user.email +
                    " doneBy " +
                    userProfile.email
                );
              }}
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
        <LoadingScreen isLoading={isLoading}>
          {userList && userList.length !== 0 && userList !== "UR040" ? (
            <table className="user-table">
              <thead>
                <tr>
                  <th scope="col" width="20%" id="nameColHeader">
                    Name
                  </th>
                  <th scope="col" width="30%" id="emailColHeader">
                    Email
                  </th>
                  {includeStateCode && (
                    <th scope="col" width="20%" id="stateColHeader">
                      State
                    </th>
                  )}
                  <th scope="col" width="15%" id="statusColHeader">
                    Status
                  </th>
                  <th scope="col" width="15%" id="personnelActionsColHeader">
                    Personnel Actions
                  </th>
                </tr>
              </thead>
              <tbody>{renderUserList(userList)}</tbody>
            </table>
          ) : (
            <EmptyList message={pendingMessage[userProfile.userData.type]} />
          )}
        </LoadingScreen>
      </div>
    </div>
  );
};

export default UserManagement;
