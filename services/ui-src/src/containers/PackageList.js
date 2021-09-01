import React, { useCallback, useState, useEffect, useMemo } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Button } from "@cmsgov/design-system";
import { format } from "date-fns";
import classNames from "classnames";

import {
  RESPONSE_CODE,
  ROUTES,
  ChangeRequest,
  getUserRoleObj,
  USER_TYPE,
} from "cmscommonlib";

import PageTitleBar from "../components/PageTitleBar";
import PortalTable from "../components/PortalTable";
import AlertBar from "../components/AlertBar";
import { EmptyList } from "../components/EmptyList";
import LoadingScreen from "../components/LoadingScreen";
import PackageAPI from "../utils/PackageApi";
import PopupMenu from "../components/PopupMenu";
import { useAppContext } from "../libs/contextLib";
import {
  pendingMessage,
  deniedOrRevokedMessage,
  isPending,
  isActive,
} from "../libs/userLib";
import { tableListExportToCSV } from "../utils/tableListExportToCSV";

const withdrawMenuItem = {
  label: "Withdraw Package",
  value: "Withdrawn",
  formatConfirmationMessage: ({ packageId }) =>
    `You are about to withdraw ${packageId}. Once complete, you will not be able to resubmit this package. CMS will be notified.`,
};

const menuItemMap = {
  "RAI Response Submitted": withdrawMenuItem,
  Submitted: withdrawMenuItem,
};

const correspondingRAILink = {
  [ChangeRequest.TYPE.CHIP_SPA]: ROUTES.CHIP_SPA_RAI,
  [ChangeRequest.TYPE.SPA]: ROUTES.SPA_RAI,
  [ChangeRequest.TYPE.WAIVER]: ROUTES.WAIVER_RAI,
};

/**
 * Component containing dashboard
 */
const PackageList = () => {
  const [changeRequestList, setChangeRequestList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { userProfile, userProfile: { userData } = {} } = useAppContext();
  const history = useHistory();
  const location = useLocation();
  const [alertCode, setAlertCode] = useState(location?.state?.passCode);
  const userRoleObj = getUserRoleObj(userData.type);

  const loadPackageList = useCallback(
    async (ctrlr) => {
      setIsLoading(true);
      try {
        const data = await PackageAPI.getMyPackages(userProfile.email);

        if (typeof data === "string") throw data;
        console.log("the data returned is: ", data);
        if (!ctrlr?.signal.aborted) setChangeRequestList(data);
        if (!ctrlr?.signal.aborted) setIsLoading(false);
      } catch (error) {
        console.log("Error while fetching user's list.", error);
        setAlertCode(RESPONSE_CODE[error.message]);
      }
    },
    [userProfile.email]
  );

  // Redirect new users to the signup flow, and load the data from the backend for existing users.
  useEffect(() => {
    if (location?.state?.passCode !== undefined) location.state.passCode = null;
    if (!userData?.type || !userData?.attributes) {
      history.replace("/signup", location.state);
      return;
    }

    const ctrlr = new AbortController();
    loadPackageList(ctrlr);

    return function cleanup() {
      ctrlr.abort();
    };
  }, [history, loadPackageList, location, userData, userProfile]);

  const renderId = useCallback(
    ({ row, value }) => (
      <Link
        to={`/${row.original.packageType}/${row.original.submissionId}/${row.original.submitterId}`}
      >
        {value}
      </Link>
    ),
    []
  );

  const getType = useCallback(
    ({ packageType }) =>
      ({
        [ChangeRequest.TYPE.CHIP_SPA]: "CHIP SPA",
        [ChangeRequest.TYPE.CHIP_SPA_RAI]: "CHIP SPA RAI",
        [ChangeRequest.TYPE.SPA]: "Medicaid SPA",
        [ChangeRequest.TYPE.WAIVER]: "Waiver",
        [ChangeRequest.TYPE.SPA_RAI]: "SPA RAI",
        [ChangeRequest.TYPE.WAIVER_RAI]: "Waiver RAI",
        [ChangeRequest.TYPE.WAIVER_EXTENSION]: "Temporary Extension Request",
        [ChangeRequest.TYPE.WAIVER_APP_K]: "1915(c) Appendix K Amendment",
      }[packageType] ?? []),
    []
  );

  const renderType = useCallback(
    ({ value }) => <span className="type-badge">{value}</span>,
    []
  );

  const getState = useCallback(({ packageId }) => {
    if (!packageId) {
      return "--";
    } else {
      return packageId.toString().substring(0, 2);
    }
  }, []);

  const renderName = useCallback(
    ({ value, row }) => (
      <Link
        className="user-name"
        to={`${ROUTES.PROFILE}/${row.original.submitterEmail}`}
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

  const onPopupActionWithdraw = useCallback(
    async (rowNum) => {
      // For now, the second argument is constant.
      // When we add another action to the menu, we will need to look at the action taken here.

      const packageToModify = changeRequestList[rowNum];
      try {
        const resp = await PackageAPI.withdraw(
          [userProfile.userData.firstName, userProfile.userData.lastName].join(
            " "
          ),
          userProfile.email,
          packageToModify.packageId
        );
        setAlertCode(resp);
        loadPackageList();
      } catch (e) {
        console.log("Error while updating package.", e);
        setAlertCode(RESPONSE_CODE[e.message]);
      }
    },
    [
      changeRequestList,
      loadPackageList,
      userProfile.email,
      userProfile.userData,
    ]
  );

  const onPopupActionRAI = useCallback(
    (value) => {
      history.push(`${value.link}?transmittalNumber=${value.raiId}`);
    },
    [history]
  );

  const renderActions = useCallback(
    ({ row }) => {
      const raiLink = correspondingRAILink[row.original.packageType];
      const menuItemBasedOnStatus = menuItemMap[row.original.currentStatus];
      const notWithdrawn = row.original.currentStatus !== "Withdrawn";
      let menuItems = [];

      if (raiLink && notWithdrawn) {
        const menuItemRai = {
          label: "Respond to RAI",
          value: { link: raiLink, raiId: row.original.packageId },
          handleSelected: onPopupActionRAI,
        };
        menuItems.push(menuItemRai);
      }

      if (menuItemBasedOnStatus) {
        menuItemBasedOnStatus.handleSelected = onPopupActionWithdraw;
        menuItems.push(menuItemBasedOnStatus);
      }

      return (
        <PopupMenu
          selectedRow={row}
          menuItems={menuItems}
          variation="PackageList"
        />
      );
    },
    [onPopupActionWithdraw, onPopupActionRAI]
  );

  const columns = useMemo(() => {
    let tableColumns = [
      {
        Header: "ID/Number",
        accessor: "packageId",
        disableSortBy: true,
        Cell: renderId,
      },
      {
        Header: "Type",
        accessor: getType,
        id: "packageType",
        Cell: renderType,
      },
      {
        Header: "State",
        accessor: getState,
        id: "territory",
      },
      {
        Header: "Status",
        accessor: "currentStatus",
        id: "packageStatus",
      },
      {
        Header: "Date Submitted",
        accessor: "submissionTimestamp",
        Cell: renderDate,
      },
      {
        Header: "Submitted By",
        accessor: "submitterName",
        id: "submitter",
        Cell: renderName,
      },
    ];

    if (userRoleObj.canAccessForms) {
      const actionsColumn = {
        Header: "Actions",
        accessor: "actions",
        disableSortBy: true,
        id: "packageActions",
        Cell: renderActions,
      };
      tableColumns.push(actionsColumn);
    }

    return tableColumns;
  }, [
    getType,
    renderActions,
    getState,
    renderId,
    renderType,
    renderDate,
    renderName,
    userRoleObj.canAccessForms,
  ]);

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

  const tableClassName = classNames({
    "submissions-table": true,
    "submissions-table-actions-column": userRoleObj.canAccessForms,
  });
  // Render the dashboard
  return (
    <div className="dashboard-white">
      <PageTitleBar
        heading="Submission Dashboard"
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
                className={tableClassName}
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

export default PackageList;
