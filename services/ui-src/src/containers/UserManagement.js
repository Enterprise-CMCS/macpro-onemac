import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Alert } from "@cmsgov/design-system";
import { ROUTES } from "cmscommonlib";

import PageTitleBar, { TITLE_BAR_ID } from "../components/PageTitleBar";
import PortalTable from "../components/PortalTable";
import { EmptyList } from "../components/EmptyList";
import LoadingScreen from "../components/LoadingScreen";
import { ALERTS_MSG } from "../libs/alert-messages";
import UserDataApi, { getAdminTypeByRole } from "../utils/UserDataApi";
import { getAlert } from "../libs/error-mappings";
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
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [alert, setAlert] = useState();
  const { userProfile } = useAppContext();
  const [includeStateCode, setIncludeStateCode] = useState(true);
  const history = useHistory();
  const location = useLocation();

  const updateList = useCallback(() => {
    setIncludeStateCode(userProfile.userData.type === "cmsapprover");
    UserDataApi.getMyUserList(userProfile.email)
      .then((ul) => {
        console.log("user List: ", ul);
        if (typeof ul === "string") {
          if (!isPending(userProfile.userData)) setAlert(getAlert(ul));
          ul = [];
        }
        setUserList(ul);
      })
      .catch((error) => {
        console.log("Error while fetching user's list.", error);
        setAlert(ALERTS_MSG.DASHBOARD_LIST_FETCH_ERROR);
      });
  }, [userProfile.email, userProfile.userData]);

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

    if (mounted) updateList();

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

  const getName = useCallback(
    ({ firstName, lastName }) =>
      [firstName, lastName].filter(Boolean).join(" "),
    []
  );

  const renderStatus = useCallback(({ value }) => {
    let content = value;
    switch (value) {
      case "pending":
        content = <>{PENDING_CIRCLE_IMAGE} Pending</>;
        break;
      case "active":
        content = "Granted";
        break;
      case "denied":
        content = "Denied";
        break;
      case "revoked":
        content = "Revoked";
        break;
      // no default
    }

    return <span className="user-status">{content}</span>;
  }, []);

  const renderEmail = useCallback(
    ({ value }) => (
      <a className="user-email" href={`mailto:${value}`}>
        {value}
      </a>
    ),
    []
  );

  const sortStatus = useCallback((rowA, rowB, columnId, desc) => {
    let orig;
    switch (rowA.values.status) {
      case "pending":
        orig = -1;
        break;
      case "active":
        orig = rowB.values.status === "pending" ? 1 : -1;
        break;
      case "denied":
        orig = rowB.values.status === "revoked" ? -1 : 1;
        break;
      case "revoked":
        orig = 1;
        break;
      default:
        orig = 1;
        break;
    }

    return orig;
  }, []);

  const renderActions = useCallback(
    ({ row }) => {
      const grant = {
          label: "Grant Access",
          value: "active",
          confirmMessage: grantConfirmMessage[userProfile.userData.type],
        },
        deny = {
          label: "Deny Access",
          value: "denied",
          confirmMessage: denyConfirmMessage[userProfile.userData.type],
        },
        revoke = {
          label: "Revoke Access",
          value: "revoked",
          confirmMessage: revokeConfirmMessage[userProfile.userData.type],
        };

      const menuItems =
        {
          pending: [grant, deny],
          active: [revoke],
          denied: [grant],
          revoked: [grant],
        }[row.values.status] ?? [];

      return (
        <PopupMenu
          selectedRow={row.values.id}
          userEmail={row.values.email}
          menuItems={menuItems}
          handleSelected={(row, value) => {
            const updateStatusRequest = {
              userEmail: userList[row].email,
              doneBy: userProfile.userData.id,
              attributes: [
                {
                  stateCode: userList[row].stateCode, // required for state user and state admin
                  status: value,
                },
              ],
              type: getAdminTypeByRole(userProfile.userData.type),
            };
            try {
              UserDataApi.setUserStatus(updateStatusRequest).then(function (
                returnCode
              ) {
                setAlert(getAlert(returnCode));
                updateList();
              });
            } catch (err) {
              setAlert(ALERTS_MSG.SUBMISSION_ERROR);
            }
          }}
        />
      );
    },
    [updateList, userList, userProfile]
  );

  const columns = useMemo(
    () =>
      [
        {
          Header: "Name",
          accessor: getName,
          defaultCanSort: true,
          id: "name",
        },
        {
          Header: "Email",
          accessor: "email",
          Cell: renderEmail,
        },
        includeStateCode
          ? {
              Header: "State",
              accessor: "stateCode",
              defaultCanSort: true,
              id: "state",
            }
          : null,
        {
          accessor: "latest.date",
          defaultCanSort: true,
          id: "date",
        },
        {
          Header: "Status",
          accessor: "latest.status",
          id: "status",
          sortType: sortStatus,
          Cell: renderStatus,
        },
        {
          Header: "Personnel Actions",
          disableSortBy: true,
          Cell: renderActions,
          id: "personnelActions",
        },
      ].filter(Boolean),
    [
      getName,
      includeStateCode,
      renderEmail,
      renderStatus,
      sortStatus,
      renderActions,
    ]
  );

  const initialTableState = useMemo(
    () => ({
      hiddenColumns: ["date"],
      sortBy: [{ id: "status" }, { id: "date" }],
    }),
    []
  );

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
        !isActive(userProfile.userData) ? (
          isPending(userProfile.userData) ? (
            <EmptyList message={pendingMessage[userProfile.userData.type]} />
          ) : (
            <EmptyList
              message={deniedOrRevokedMessage[userProfile.userData.type]}
            />
          )
        ) : (
          <LoadingScreen isLoading={isLoading}>
            {userList && userList.length !== 0 && userList !== "UR040" ? (
              <PortalTable
                className="user-table"
                columns={columns}
                data={userList}
                initialState={initialTableState}
              />
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
