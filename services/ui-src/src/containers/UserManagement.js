import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useHistory, Link } from "react-router-dom";
import {
  RESPONSE_CODE,
  ROUTES,
  USER_STATUS,
  USER_TYPE,
  getUserRoleObj,
  roleLabels,
  territoryMap,
} from "cmscommonlib";
import { format } from "date-fns";
import PageTitleBar from "../components/PageTitleBar";
import PortalTable from "../components/PortalTable";
import { EmptyList } from "../components/EmptyList";
import LoadingScreen from "../components/LoadingScreen";
import UserDataApi from "../utils/UserDataApi";
import AlertBar from "../components/AlertBar";
import { useAppContext } from "../libs/contextLib";
import PopupMenu from "../components/PopupMenu";
import pendingCircle from "../images/PendingCircle.svg";
import { pendingMessage, deniedOrRevokedMessage } from "../libs/userLib";
import { Button } from "@cmsgov/design-system";
import { tableListExportToCSV } from "../utils/tableListExportToCSV";

const PENDING_CIRCLE_IMAGE = (
  <img alt="" className="pending-circle" src={pendingCircle} />
);

const getAccessDescription = ({ stateCode }) =>
  stateCode && territoryMap[stateCode]
    ? `${territoryMap[stateCode]} in OneMAC`
    : "OneMAC";

const grant = {
    label: "Grant Access",
    value: "active",
    formatConfirmationMessage: (rowData) =>
      `This will grant ${rowData.fullName} access to ${getAccessDescription(
        rowData
      )}.`,
  },
  deny = {
    label: "Deny Access",
    value: "denied",
    formatConfirmationMessage: (rowData) =>
      `This will deny ${
        rowData.fullName
      }'s request for access to ${getAccessDescription(rowData)}.`,
  },
  revoke = {
    label: "Revoke Access",
    value: "revoked",
    formatConfirmationMessage: (rowData) =>
      `This will revoke ${rowData.fullName}'s access to ${getAccessDescription(
        rowData
      )}.`,
  },
  menuItemMap = {
    pending: [grant, deny],
    active: [revoke],
    denied: [grant],
    revoked: [grant],
  };

const alertCodes = {
  active: RESPONSE_CODE.SUCCESS_USER_GRANTED,
  denied: RESPONSE_CODE.SUCCESS_USER_DENIED,
  revoked: RESPONSE_CODE.SUCCESS_USER_REVOKED,
};

/**
 * User Management "Dashboard"
 */
const UserManagement = () => {
  const [userList, setUserList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { userProfile, userStatus } = useAppContext();
  const history = useHistory();
  const location = useLocation();
  const [alertCode, setAlertCode] = useState(location?.state?.passCode);
  const [doneToName, setDoneToName] = useState("");

  const showUserRole =
    userProfile.userData.type !== USER_TYPE.STATE_SYSTEM_ADMIN;
  const includeStateCode = useMemo(
    () =>
      [
        USER_TYPE.CMS_ROLE_APPROVER,
        USER_TYPE.HELPDESK,
        USER_TYPE.SYSTEM_ADMIN,
      ].includes(userProfile?.userData?.type),
    [userProfile?.userData?.type]
  );
  const updateList = useCallback(() => {
    UserDataApi.getMyUserList(userProfile.email)
      .then((ul) => {
        if (typeof ul === "string") {
          if (userStatus !== USER_STATUS.PENDING) setAlertCode(ul);
          ul = [];
        }
        console.log("user list: ", ul);
        setUserList(ul);
      })
      .catch((error) => {
        console.log("Error while fetching user's list.", error);
        setAlertCode(RESPONSE_CODE[error.message]);
      });
  }, [userProfile.email, userStatus]);

  // Load the data from the backend.
  useEffect(() => {
    let mounted = true;
    if (location?.state?.passCode !== undefined) location.state.passCode = null;
    if (
      !userProfile ||
      !userProfile.userData ||
      !getUserRoleObj(userProfile.userData.roleList).canAccessUserManagement
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

  const getRoleLabel = useCallback(({ role }) => roleLabels[role], []);

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

  const renderName = useCallback(
    ({ value, row }) => (
      <Link
        className="user-name"
        to={`${ROUTES.PROFILE}/${row.original.email}`}
      >
        {value}
      </Link>
    ),
    []
  );

  const renderDate = useCallback(
    ({ value }) => format(new Date(value * 1000), "MMM d, yyyy hh:mm a"),
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

  const onPopupAction = useCallback(
    async (rowNum, value) => {
      const { role, stateCode, ...restOfUser } = userList[rowNum];
      setDoneToName(restOfUser.fullName);

      try {
        const returnCode = await UserDataApi.setUserStatus({
          userEmail: userList[rowNum].email,
          doneBy: userProfile.userData.id,
          type: role,
          attributes: [
            {
              stateCode:
                role === USER_TYPE.STATE_SUBMITTER ||
                role === USER_TYPE.STATE_SYSTEM_ADMIN
                  ? stateCode
                  : undefined, // required for state submitter and state system admin
              status: value,
            },
          ],
        });

        updateList();
        setAlertCode(returnCode === "UR000" ? alertCodes[value] : returnCode);
      } catch (e) {
        console.log("Error while fetching user's list.", e);
        setAlertCode(RESPONSE_CODE[e.message]);
      }
    },
    [updateList, userList, userProfile.userData.id]
  );

  const renderActions = useCallback(
    ({ row }) => {
      const menuItems = menuItemMap[row.values.status] ?? [];
      for (const menuItem of menuItems) {
        menuItem.handleSelected = onPopupAction;
      }

      return (
        <PopupMenu
          buttonLabel={`User management actions for ${row.values.name}`}
          selectedRow={row}
          menuItems={menuItems}
          variation="UserManagement"
        />
      );
    },
    [onPopupAction]
  );

  const columns = useMemo(() => {
    let columnList = [
      {
        Header: "Name",
        accessor: "fullName",
        defaultCanSort: true,
        id: "name",
        Cell: renderName,
      },
      includeStateCode
        ? {
            Header: "State",
            accessor: "territory",
            defaultCanSort: true,
            id: "state",
          }
        : null,
      {
        Header: "Status",
        accessor: "status",
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
        accessor: "date",
        Cell: renderDate,
        id: "lastModified",
        disableSortBy: true,
      },
      {
        Header: "Modified By",
        accessor: "doneByName",
        disableSortBy: true,
        id: "doneByName",
      },
      getUserRoleObj(userProfile.userData.roleList).canManageUsers
        ? {
            Header: "Actions",
            disableSortBy: true,
            Cell: renderActions,
            id: "personnelActions",
          }
        : null,
    ];

    return columnList.filter(Boolean);
  }, [
    includeStateCode,
    renderName,
    renderStatus,
    showUserRole,
    sortStatus,
    renderActions,
    getRoleLabel,
    renderDate,
    userProfile.userData.roleList,
  ]);

  const initialTableState = useMemo(
    () => ({
      hiddenColumns: ["date"],
      sortBy: [{ id: "status" }, { id: "date" }],
    }),
    []
  );

  function closedAlert() {
    setAlertCode(RESPONSE_CODE.NONE);
  }

  const csvExportSubmissions = (
    <Button
      id="new-submission-button"
      className="new-submission-button"
      onClick={(e) => {
        e.preventDefault();
        tableListExportToCSV("user-table", userList, "UserList");
      }}
      inversed
    >
      Export to Excel(CSV){" "}
      <svg
        width="15"
        height="16"
        viewBox="0 0 15 16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M7.29387 0.941406C3.26446 0.941406 -0.000244141 4.20611 -0.000244141 8.23552C-0.000244141 12.2649 3.26446 15.5296 7.29387 15.5296C11.3233 15.5296 14.588 12.2649 14.588 8.23552C14.588 4.20611 11.3233 0.941406 7.29387 0.941406ZM11.5292 9.05905C11.5292 9.25317 11.3703 9.412 11.1762 9.412H8.47034V12.1179C8.47034 12.312 8.31152 12.4708 8.1174 12.4708H6.47034C6.27623 12.4708 6.1174 12.312 6.1174 12.1179V9.412H3.41152C3.2174 9.412 3.05858 9.25317 3.05858 9.05905V7.412C3.05858 7.21788 3.2174 7.05905 3.41152 7.05905H6.1174V4.35317C6.1174 4.15905 6.27623 4.00023 6.47034 4.00023H8.1174C8.31152 4.00023 8.47034 4.15905 8.47034 4.35317V7.05905H11.1762C11.3703 7.05905 11.5292 7.21788 11.5292 7.412V9.05905Z" />
      </svg>
    </Button>
  );

  function renderUserList() {
    if (userStatus === USER_STATUS.PENDING) {
      return <EmptyList message={pendingMessage[userProfile.userData.type]} />;
    }

    const userStatusNotActive =
      !userStatus || userStatus !== USER_STATUS.ACTIVE;
    if (userStatusNotActive) {
      return (
        <EmptyList
          message={deniedOrRevokedMessage[userProfile.userData.type]}
        />
      );
    }

    const userListExists = userList && userList.length !== 0;
    const hasUsersToManage =
      userListExists && userList !== RESPONSE_CODE.USER_NOT_AUTHORIZED;
    return (
      <LoadingScreen isLoading={isLoading}>
        {hasUsersToManage ? (
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
    );
  }

  // Render the dashboard
  return (
    <div className="dashboard-white">
      <PageTitleBar
        heading="User Management"
        rightSideContent={
          (userProfile.userData.type === USER_TYPE.HELPDESK ||
            userProfile.userData.type === USER_TYPE.SYSTEM_ADMIN) &&
          userStatus === USER_STATUS.ACTIVE &&
          csvExportSubmissions
        }
      />
      <AlertBar
        alertCode={alertCode}
        personalizedString={doneToName}
        closeCallback={closedAlert}
      />
      <div className="dashboard-container">{renderUserList()}</div>
    </div>
  );
};

export default UserManagement;
