import React, { useCallback, useState, useEffect, useMemo } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { format } from "date-fns";
import { Button } from "@cmsgov/design-system";
import classNames from "classnames";

import {
  RESPONSE_CODE,
  ROUTES,
  ChangeRequest,
  getUserRoleObj,
  USER_STATUS,
  USER_ROLE,
} from "cmscommonlib";

import PageTitleBar from "../components/PageTitleBar";
import PortalTable from "../components/PortalTable";
import AlertBar from "../components/AlertBar";
import { EmptyList } from "../components/EmptyList";
import LoadingScreen from "../components/LoadingScreen";
import PopupMenu from "../components/PopupMenu";
import ChangeRequestDataApi from "../utils/ChangeRequestDataApi";
import { useAppContext } from "../libs/contextLib";
import { pendingMessage, deniedOrRevokedMessage } from "../libs/userLib";
import { tableListExportToCSV } from "../utils/tableListExportToCSV";

/**
 * Component containing dashboard
 */
const Dashboard = () => {
  const [changeRequestList, setChangeRequestList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {
    userStatus,
    userRole,
    userProfile = {},
    userProfile: { cmsRoles, userData } = {},
  } = useAppContext();
  const history = useHistory();
  const location = useLocation();
  const [alertCode, setAlertCode] = useState(location?.state?.passCode);
  const userRoleObj = getUserRoleObj(userData?.roleList);

  // Redirect new users to the signup flow, and load the data from the backend for existing users.
  useEffect(() => {
    if (location?.state?.passCode !== undefined) {
      setAlertCode(location.state.passCode);
      history.location.state.passCode = null;
    }

    // Redirect new users to the signup flow.
    //    const userAccess = effectiveRoleForUser(userData?.roleList);
    if (cmsRoles && userRole === null) {
      history.replace("/signup", location.state);
      return;
    }

    let mounted = true;

    // Load data from the backend for existing users.
    (async function onLoad() {
      try {
        const data = await ChangeRequestDataApi.getAllByAuthorizedTerritories(
          userProfile.email
        );

        if (typeof data === "string") throw data;

        if (mounted) {
          setChangeRequestList(data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log("Error while fetching user's list.", error);
        if (mounted) {
          setAlertCode(RESPONSE_CODE[error.message]);
          setIsLoading(false);
        }
      }
    })();

    return function cleanup() {
      mounted = false;
    };
  }, [cmsRoles, history, location, userRole, userProfile]);

  const renderId = useCallback(
    ({ row, value }) => (
      <Link
        to={`/${row.original.type}/${row.original.id}/${row.original.userId}`}
      >
        {value}
      </Link>
    ),
    []
  );

  const getType = useCallback(
    ({ type }) =>
      ({
        [ChangeRequest.TYPE.CHIP_SPA]: "CHIP SPA",
        [ChangeRequest.TYPE.CHIP_SPA_RAI]: "CHIP SPA RAI",
        [ChangeRequest.TYPE.MEDICAID_SPA]: "Medicaid SPA",
        [ChangeRequest.TYPE.WAIVER]: "Waiver",
        [ChangeRequest.TYPE.MEDICAID_SPA_RAI]: "Medicaid SPA RAI",
        [ChangeRequest.TYPE.WAIVER_RAI]: "Waiver RAI",
        [ChangeRequest.TYPE.WAIVER_EXTENSION]: "Temporary Extension Request",
        [ChangeRequest.TYPE.WAIVER_APP_K]: "1915(c) Appendix K Amendment",
      }[type] ?? []),
    []
  );

  const renderType = useCallback(
    ({ value }) => <span className="type-badge">{value}</span>,
    []
  );

  const renderName = useCallback(
    ({ value, row }) => (
      <Link
        className="user-name"
        to={`${ROUTES.PROFILE}/${row.original.user.email}`}
      >
        {value}
      </Link>
    ),
    []
  );

  const renderDate = useCallback(({ value }) => {
    if (value) {
      return format(value, "MMM d, yyyy");
    } else {
      return "N/A";
    }
  }, []);

  const onPopupAction = useCallback(
    (value) => {
      history.push(`${value.link}?transmittalNumber=${value.raiId}`);
    },
    [history]
  );

  const renderActions = useCallback(
    ({ row }) => {
      const link = ChangeRequest.correspondingRAILink[row.original.type];
      if (link) {
        const item = {
          label: "Respond to RAI",
          value: { link: link, raiId: row.original.transmittalNumber },
          handleSelected: onPopupAction,
        };
        return (
          <PopupMenu
            buttonLabel={`Actions for ${row.original.transmittalNumber}`}
            selectedRow={row}
            menuItems={[item]}
          />
        );
      } else return <></>;
    },
    [onPopupAction]
  );

  const columns = useMemo(() => {
    let tableColumns = [
      {
        Header: "ID/Number",
        accessor: "transmittalNumber",
        disableSortBy: true,
        Cell: renderId,
      },
      {
        Header: "Type",
        accessor: getType,
        id: "type",
        Cell: renderType,
      },
      {
        Header: "State",
        accessor: "territory",
      },
      {
        Header: "Date Submitted",
        accessor: "submittedAt",
        Cell: renderDate,
      },
      {
        Header: "Submitted By",
        accessor: ({ user: { firstName, lastName } = {} }) =>
          [firstName, lastName].filter(Boolean).join(" "),
        id: "submitter",
        Cell: renderName,
      },
    ];

    if (userRoleObj.canAccessForms) {
      const actionsColumn = {
        Header: "Actions",
        accessor: "actions",
        disableSortBy: true,
        Cell: renderActions,
        id: "packageActions",
      };
      tableColumns.push(actionsColumn);
    }

    return tableColumns;
  }, [
    getType,
    renderActions,
    renderDate,
    renderId,
    renderName,
    renderType,
    userRoleObj.canAccessForms,
  ]);

  const initialTableState = useMemo(
    () => ({ sortBy: [{ id: "submittedAt", desc: true }] }),
    []
  );
  const csvExportSubmissions = (
    <Button
      id="new-submission-button"
      className="new-submission-button"
      onClick={(e) => {
        e.preventDefault();
        tableListExportToCSV(
          "submission-table",
          changeRequestList,
          "SubmissionList"
        );
      }}
      inversed
    >
      Export to Excel(CSV){" "}
    </Button>
  );

  const newSubmissionButton = (
    <Button
      id="new-submission-button"
      className="new-submission-button"
      href={ROUTES.NEW_SUBMISSION_SELECTION}
      inversed
    >
      New Submission
      <svg
        className="new-submission-icon"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M32 18.2857H18.2857V32H13.7143V18.2857H0V13.7143H13.7143V0H18.2857V13.7143H32V18.2857Z"
          fill="currentColor"
        />
      </svg>
    </Button>
  );

  function closedAlert() {
    setAlertCode(RESPONSE_CODE.NONE);
  }

  function getRightSideContent() {
    const userCanSubmit =
      userStatus === USER_STATUS.ACTIVE && userRoleObj.canAccessForms;

    let rightSideContent = "";
    if (userCanSubmit) {
      rightSideContent = newSubmissionButton;
    } else if (userRoleObj.canDownloadCsv) {
      rightSideContent = csvExportSubmissions;
    }

    return rightSideContent;
  }

  function renderSubmissionList() {
    if (userRole !== USER_ROLE.CMS_ROLE_APPROVER) {
      if (userStatus === USER_STATUS.PENDING) {
        return <EmptyList message={pendingMessage[userRole]} />;
      }

      const userStatusNotActive =
        userRole && (!userStatus || userStatus !== USER_STATUS.ACTIVE);
      if (userStatusNotActive) {
        return (
          <EmptyList
            showProfileLink="true"
            message={deniedOrRevokedMessage[userRole]}
          />
        );
      }
    }

    const tableClassName = classNames({
      "submissions-table": true,
      "submissions-table-actions-column": userRoleObj.canAccessForms,
    });
    const changeRequestListExists =
      changeRequestList && changeRequestList.length > 0;
    return (
      <LoadingScreen isLoading={isLoading}>
        {changeRequestListExists ? (
          <PortalTable
            className={tableClassName}
            columns={columns}
            data={changeRequestList}
            initialState={initialTableState}
          />
        ) : (
          <EmptyList message="You have no submissions yet." />
        )}
      </LoadingScreen>
    );
  }

  // Render the dashboard
  return (
    <div className="dashboard-white">
      <PageTitleBar
        heading="Submission List"
        rightSideContent={getRightSideContent()}
      />
      <AlertBar alertCode={alertCode} closeCallback={closedAlert} />
      <div className="dashboard-container">{renderSubmissionList()}</div>
    </div>
  );
};

export default Dashboard;
