import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { RESPONSE_CODE, ROUTES } from "cmscommonlib";
import { format } from "date-fns";
import PageTitleBar from "../components/PageTitleBar";
import PortalTable from "../components/PortalTable";
import { EmptyList } from "../components/EmptyList";
import LoadingScreen from "../components/LoadingScreen";
import UserDataApi, { getAdminTypeByRole } from "../utils/UserDataApi";
import AlertBar from "../components/AlertBar";
import { useAppContext } from "../libs/contextLib";
import PopupMenu from "../components/PopupMenu";
import pendingCircle from "../images/PendingCircle.svg";
import { roleLabels } from "../libs/roleLib";
import { USER_TYPE } from "cmscommonlib";
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
  const { userProfile } = useAppContext();
  const [includeStateCode, setIncludeStateCode] = useState(true);
  const history = useHistory();
  const location = useLocation();
  const [alertCode, setAlertCode] = useState(location?.state?.passCode);
  const [doneToName, setDoneToName] = useState("");

  const showUserRole = userProfile.userData.type === USER_TYPE.SYSTEM_ADMIN || userProfile.userData.type === USER_TYPE.HELPDESK;
  const updateList = useCallback(() => {
    setIncludeStateCode(
      userProfile.userData.type === USER_TYPE.CMS_APPROVER
      || userProfile.userData.type === USER_TYPE.HELPDESK
    );
    UserDataApi.getMyUserList(userProfile.email)
      .then((ul) => {
        if (typeof ul === "string") {
          if (!isPending(userProfile.userData)) setAlertCode(ul);
          ul = [];
        }
        setUserList(ul);
      })
      .catch((error) => {
        console.log("Error while fetching user's list.", error);
        setAlertCode(RESPONSE_CODE.DASHBOARD_RETRIEVAL_ERROR);
      });
  }, [userProfile.email, userProfile.userData]);

  // Load the data from the backend.
  useEffect(() => {
    let mounted = true;
    if (location?.state?.passCode !== undefined) location.state.passCode = null;
    if (
      !userProfile ||
      !userProfile.userData ||
      (userProfile.userData.type !== USER_TYPE.SYSTEM_ADMIN &&
        (!userProfile.userData.attributes ||
          userProfile.userData.type === USER_TYPE.STATE_USER))
    ) {
      history.push(ROUTES.DASHBOARD);
    }

    if (mounted) updateList();

    return function cleanup() {
      mounted = false;
    };
  }, [location, userProfile, history, updateList]);

  useEffect(() => {
    let newIsLoading = true;
    let mounted = true;
    if (userList) newIsLoading = false;

    if (mounted) setIsLoading(newIsLoading);

    return function cleanup() {
      mounted = false;
    };
  }, [userList]);

  const getName = useCallback(
    ({ firstName, lastName }) =>
      [firstName, lastName].filter(Boolean).join(" "),
    []
  );

  const getRoleLabel = useCallback(
    ({ role }) => roleLabels[role],
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

const renderDate = useCallback(
  ({ value }) => 
    format(new Date(value * 1000), "MMM d, yyyy hh:mm a"),
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

    const alertCodes =
    {
      active: RESPONSE_CODE.SUCCESS_USER_GRANTED,
      denied: RESPONSE_CODE.SUCCESS_USER_DENIED,
      revoked: RESPONSE_CODE.SUCCESS_USER_REVOKED,
    };

    return (
      <PopupMenu
        selectedRow={row.id}
        userEmail={row.values.email}
        menuItems={menuItems}
        handleSelected={(rowNum, value) => {
          let newAlertCode = alertCodes[value];
          let newPersonalized = "Chester Tester";

          const updateStatusRequest = {
            userEmail: userList[rowNum].email,
            doneBy: userProfile.userData.id,
            attributes: [
              {
                stateCode: userList[rowNum].stateCode, // required for state user and state admin
                status: value,
              },
            ],
            type: getAdminTypeByRole(userProfile.userData.type),
          };
          UserDataApi.setUserStatus(updateStatusRequest).then(function (
            returnCode
          ) {
            // alert already set per status change, only check for success here
            if (returnCode === "UR000") {
              newPersonalized = `${userList[rowNum].firstName} ${userList[rowNum].lastName}`;
            } else {
              newAlertCode = returnCode;
            }
            updateList();
          }).then(() => { setAlertCode(newAlertCode); setDoneToName(newPersonalized); })
            .catch((error) => {
              console.log("Error while fetching user's list.", error);
              setAlertCode(RESPONSE_CODE.DASHBOARD_RETRIEVAL_ERROR);
            });

        }}
      />
    );
  },
  [updateList, userList, userProfile]
);

const columns = useMemo(
  () => {
    let columnList = [
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
        Header: "Status",
        accessor: "latest.status",
        id: "status",
        sortType: sortStatus,
        Cell: renderStatus,
      },
      showUserRole
        ? {
          Header: "Role",
          accessor: getRoleLabel,
          defaultCanSort: true,
          id: "role",
        }
        : null,
        {
          Header: "Last Modified",
          accessor: "latest.date",
          Cell: renderDate,
          id: "lastModified",
          disableSortBy: true,
        },
        {
          Header: "Modified By",
          accessor: "latest.doneByName",
          disableSortBy: true,
          id: "doneByName",
        },
        (userProfile.userData.type !== USER_TYPE.HELPDESK)
        ? {
          Header: "Personnel Actions",
          disableSortBy: true,
          Cell: renderActions,
          id: "personnelActions",
        } : null
    ];

    return columnList.filter(Boolean);
  },
  [
    getName,
    includeStateCode,
    renderEmail,
    renderStatus,
    showUserRole,
    sortStatus,
    renderActions,
    getRoleLabel,
    renderDate,
    userProfile.userData.type
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
    <PageTitleBar heading="User Management" />
    <AlertBar alertCode={alertCode} personalizedString={doneToName} />
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