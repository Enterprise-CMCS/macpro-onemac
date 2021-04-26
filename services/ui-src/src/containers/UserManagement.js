import React, { useState, useEffect, useCallback } from "react";
import PageTitleBar, { TITLE_BAR_ID } from "../components/PageTitleBar";
import { EmptyList } from "../components/EmptyList";
import LoadingScreen from "../components/LoadingScreen";
import { ALERTS_MSG } from "../libs/alert-messages";
import { ROUTES } from "cmscommonlib";
import { useLocation, useHistory } from "react-router-dom";
import UserDataApi, {getAdminTypeByRole} from "../utils/UserDataApi";
import { getAlert } from "../libs/error-mappings";
import { Alert } from "@cmsgov/design-system";
import { useAppContext } from "../libs/contextLib";
import PopupMenu from "../components/PopupMenu";
import pendingCircle from "../images/PendingCircle.svg";
import {
  pendingMessage,
  deniedOrRevokedMessage,
  grantConfirmMessage,
  denyConfirmMessage,
  revokeConfirmMessage,
  isPending,
  isActive,
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

  const updateList = useCallback((mounted) => {
    let shouldState = (userProfile.userData.type !== "cmsapprover");

    setIncludeStateCode(shouldState)
    UserDataApi.getMyUserList(userProfile.email)
        .then((ul) => {
          console.log("user List: ", ul);
          if (typeof ul === 'string') {
            if (!isPending(userProfile.userData)) setAlert(getAlert(ul));
            ul = [];
          }
          setUserList(ul);
        })
        .catch((error) => {
          console.log("Error while fetching user's list.", error);
          setAlert(ALERTS_MSG.DASHBOARD_LIST_FETCH_ERROR);
        });
  },[userProfile]);

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

    updateList(mounted)

    return function cleanup() {
      mounted = false;
    };
  }, [location, userProfile, history, updateList]);

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
              label: "Grant Access",
              value: "active",
              confirmMessage: grantConfirmMessage[userProfile.userData.type],
            },
            {
              label: "Deny Access",
              value: "denied",
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
              value: "revoked",
              confirmMessage: revokeConfirmMessage[userProfile.userData.type],
            },
          ];
          break;
        case "denied":
          statusLabel = "Denied";
          menuItems = [
            {
              label: "Grant Access",
              value: "active",
              confirmMessage: grantConfirmMessage[userProfile.userData.type],
            },
          ];
          break;
        case "revoked":
          statusLabel = "Revoked";
          menuItems = [
            {
              label: "Grant Access",
              value: "active",
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
                const updateStatusRequest = {
                  "userEmail": userList[row].email,
                  "doneBy": userProfile.userData.id,
                  "attributes": [{
                    "stateCode": userList[row].stateCode,  // required for state user and state admin
                    "status": value
                  }],
                  "type": getAdminTypeByRole(userProfile.userData.type)
                }
                try {
                  UserDataApi.setUserStatus(updateStatusRequest).then(function (returnCode) {
                    setAlert(getAlert(returnCode))
                    updateList(true);
                  })
                } catch (err) {
                  setAlert(ALERTS_MSG.SUBMISSION_ERROR)
                }
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
        {userProfile &&
        userProfile.userData &&
        userProfile.userData.attributes &&
        userProfile.userData.attributes.length !== 0 &&
        !isActive(userProfile.userData) ? 
          (isPending(userProfile.userData) ?
            <EmptyList message={pendingMessage[userProfile.userData.type]} />
            :
            <EmptyList message={deniedOrRevokedMessage[userProfile.userData.type]} />
          )
         : (
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
              <EmptyList message="You have no Users to manage at this time." />
            )}
          </LoadingScreen>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
