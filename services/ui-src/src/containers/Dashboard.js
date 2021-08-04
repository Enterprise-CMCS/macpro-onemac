import React, { useCallback, useState, useEffect, useMemo } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { format } from "date-fns";
import { Button } from "@cmsgov/design-system";

import { RESPONSE_CODE, ROUTES, getUserRoleObj, USER_TYPE } from "cmscommonlib";

import PageTitleBar from "../components/PageTitleBar";
import PortalTable from "../components/PortalTable";
import AlertBar from "../components/AlertBar";
import { EmptyList } from "../components/EmptyList";
import LoadingScreen from "../components/LoadingScreen";
import ChangeRequestDataApi from "../utils/ChangeRequestDataApi";
import { useAppContext } from "../libs/contextLib";
import {
  pendingMessage,
  deniedOrRevokedMessage,
  isPending,
  isActive,
} from "../libs/userLib";
import { tableListExportToCSV } from "../utils/tableListExportToCSV";

/**
 * Component containing dashboard
 */
const Dashboard = () => {
  const [changeRequestList, setChangeRequestList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { userProfile, userProfile: { userData } = {} } = useAppContext();
  const history = useHistory();
  const location = useLocation();
  const [alertCode, setAlertCode] = useState(location?.state?.passCode);
  const userRoleObj = getUserRoleObj(userData.type);

  // Redirect new users to the signup flow, and load the data from the backend for existing users.
  useEffect(() => {
    if (location?.state?.passCode !== undefined) location.state.passCode = null;
    if (!userData?.type || !userData?.attributes) {
      history.replace("/signup", location.state);
      return;
    }

    let mounted = true;

    (async function onLoad() {
      try {
        const data = await ChangeRequestDataApi.getAllByAuthorizedTerritories(
          userProfile.email
        );

        if (typeof data === "string") throw data;

        if (mounted) setChangeRequestList(data);
        if (mounted) setIsLoading(false);
      } catch (error) {
        console.log("Error while fetching user's list.", error);
        setAlertCode(RESPONSE_CODE[error.message]);
      }
    })();

    return function cleanup() {
      mounted = false;
    };
  }, [history, location, userData, userProfile]);

  const renderId = useCallback(
    ({ row, value }) => (
      <Link
        to={`/${row.original.packageType}/${row?.original?.id}/${row?.original?.userId}`}
      >
        {value}
      </Link>
    ),
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
        to={`${ROUTES.PROFILE}/${row.original.lastModifiedByEmail}`}
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

  const columns = useMemo(
    () => [
      {
        Header: "ID/Number",
        accessor: "packageID",
        disableSortBy: true,
        Cell: renderId,
      },
      {
        Header: "Type",
        accessor: "packageType",
        id: "packageType",
        Cell: renderType,
      },
      {
        Header: "State",
        accessor: "territory",
      },
      {
        Header: "Date Submitted",
        accessor: "timestamp",
        Cell: renderDate,
      },
      {
        Header: "Submitted By",
        accessor: "lastModifiedByName",
        id: "lastModifiedByName",
        Cell: renderName,
      },
    ],
    [renderDate, renderId, renderName, renderType]
  );

  const initialTableState = useMemo(
    () => ({ sortBy: [{ id: "timestamp", desc: true }] }),
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
        width="15"
        height="16"
        viewBox="0 0 15 16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M7.29387 0.941406C3.26446 0.941406 -0.000244141 4.20611 -0.000244141 8.23552C-0.000244141 12.2649 3.26446 15.5296 7.29387 15.5296C11.3233 15.5296 14.588 12.2649 14.588 8.23552C14.588 4.20611 11.3233 0.941406 7.29387 0.941406ZM11.5292 9.05905C11.5292 9.25317 11.3703 9.412 11.1762 9.412H8.47034V12.1179C8.47034 12.312 8.31152 12.4708 8.1174 12.4708H6.47034C6.27623 12.4708 6.1174 12.312 6.1174 12.1179V9.412H3.41152C3.2174 9.412 3.05858 9.25317 3.05858 9.05905V7.412C3.05858 7.21788 3.2174 7.05905 3.41152 7.05905H6.1174V4.35317C6.1174 4.15905 6.27623 4.00023 6.47034 4.00023H8.1174C8.31152 4.00023 8.47034 4.15905 8.47034 4.35317V7.05905H11.1762C11.3703 7.05905 11.5292 7.21788 11.5292 7.412V9.05905Z" />
      </svg>
    </Button>
  );

  function closedAlert() {
    setAlertCode(RESPONSE_CODE.NONE);
  }

  const isUserActive =
    !!userProfile?.userData?.attributes && isActive(userProfile?.userData);

  // Render the dashboard
  return (
    <div className="dashboard-white">
      <PageTitleBar
        heading="Submission List"
        rightSideContent={
          (isUserActive && userRoleObj.canAccessForms && newSubmissionButton) ||
          (userData.type === USER_TYPE.HELPDESK &&
            isUserActive &&
            csvExportSubmissions)
        }
      />
      <AlertBar alertCode={alertCode} closeCallback={closedAlert} />
      <div className="dashboard-container">
        {isUserActive ? (
          <LoadingScreen isLoading={isLoading}>
            {changeRequestList.length > 0 ? (
              <PortalTable
                className="submissions-table"
                columns={columns}
                data={changeRequestList}
                initialState={initialTableState}
              />
            ) : (
              <EmptyList message="You have no submissions yet." />
            )}
          </LoadingScreen>
        ) : isPending(userProfile.userData) ? (
          <EmptyList message={pendingMessage[userProfile.userData.type]} />
        ) : (
          <EmptyList
            showProfileLink="true"
            message={deniedOrRevokedMessage[userProfile.userData.type]}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
