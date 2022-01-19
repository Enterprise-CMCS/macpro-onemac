import React, {
  useCallback,
  useState,
  useEffect,
  useMemo,
  useRef,
} from "react";
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
  USER_STATUS,
} from "cmscommonlib";

import PageTitleBar from "../components/PageTitleBar";
import PortalTable, {
  CustomFilterTypes,
  CustomFilterUi,
} from "../components/PortalTable";
import AlertBar from "../components/AlertBar";
import { EmptyList } from "../components/EmptyList";
import LoadingScreen from "../components/LoadingScreen";
import PackageAPI from "../utils/PackageApi";
import PopupMenu from "../components/PopupMenu";
import { useAppContext } from "../libs/contextLib";
import { pendingMessage, deniedOrRevokedMessage } from "../libs/userLib";
import { tableListExportToCSV } from "../utils/tableListExportToCSV";

const filterArray = {
  currentStatus: ["Withdrawn", "Terminated", "Unsubmitted"],
  componentType: [ChangeRequest.TYPE.SPA, ChangeRequest.TYPE.CHIP_SPA],
};

const getFilteredDate =
  (valueField, filterField) =>
  ({ [valueField]: value, [filterField]: filterValue }) => {
    if (!filterArray[filterField].includes(filterValue)) {
      if (value) return value;
    } else {
      return "N/A";
    }
    return "Pending";
  };

const renderDate = ({ value }) =>
  typeof value === "number" ? format(value, "MMM d, yyyy") : value ?? "N/A";

const getFamily = ({ componentId }) =>
  componentId ? ChangeRequest.getBaseWaiverId(componentId) : "";

export const getState = ({ componentId }) =>
  componentId ? componentId.toString().substring(0, 2) : "--";

/**
 * Component containing dashboard
 */
const PackageList = () => {
  const dashboardRef = useRef();
  const [packageList, setPackageList] = useState([]);
  const [tab, setTab] = useState(ChangeRequest.PACKAGE_GROUP.SPA);
  const [isLoading, setIsLoading] = useState(true);
  const {
    userStatus,
    userProfile,
    userProfile: { cmsRoles, userData } = {},
  } = useAppContext();
  const history = useHistory();
  const location = useLocation();
  const [alertCode, setAlertCode] = useState(location?.state?.passCode);
  const userRoleObj = getUserRoleObj(
    userData.type,
    !cmsRoles,
    userData?.attributes
  );

  const loadPackageList = useCallback(
    async (ctrlr) => {
      setIsLoading(true);
      try {
        const data = await PackageAPI.getMyPackages(userProfile.email, tab);

        if (typeof data === "string") throw new Error(data);
        if (!ctrlr?.signal.aborted) setPackageList(data);
      } catch (error) {
        console.log("Error while fetching user's list.", error);
        if (!ctrlr?.signal.aborted) setAlertCode(error.message);
      }
      if (!ctrlr?.signal.aborted) setIsLoading(false);
    },
    [tab, userProfile.email]
  );

  // Redirect new users to the signup flow, and load the data from the backend for existing users.
  useEffect(() => {
    if (location?.state?.passCode !== undefined) location.state.passCode = null;

    const ctrlr = new AbortController();
    loadPackageList(ctrlr);

    return function cleanup() {
      ctrlr.abort();
    };
  }, [cmsRoles, history, loadPackageList, location, userData, userProfile]);

  const renderId = useCallback(
    ({ row, value }) => (
      <Link
        to={`/detail/${row.original.componentType}/${row.original.submissionTimestamp}/${value}`}
      >
        {value}
      </Link>
    ),
    []
  );

  const getType = useCallback(
    ({ componentType }) =>
      ({
        [ChangeRequest.TYPE.CHIP_SPA]: "CHIP SPA",
        [ChangeRequest.TYPE.SPA]: "Medicaid SPA",
        [ChangeRequest.TYPE.WAIVER_BASE]: "1915(b) Waiver",
        [ChangeRequest.TYPE.WAIVER_APP_K]: "1915(c) Appendix K Amendment",
      }[componentType] ?? []),
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
        to={`${ROUTES.PROFILE}/${row.original.submitterEmail}`}
      >
        {value}
      </Link>
    ),
    []
  );

  const onPopupActionWithdraw = useCallback(
    async (rowNum) => {
      // For now, the second argument is constant.
      // When we add another action to the menu, we will need to look at the action taken here.

      const packageToModify = packageList[rowNum];
      try {
        const resp = await PackageAPI.withdraw(
          [userProfile.userData.firstName, userProfile.userData.lastName].join(
            " "
          ),
          userProfile.email,
          packageToModify.componentId,
          packageToModify.componentType
        );
        setAlertCode(resp);
        loadPackageList();
      } catch (e) {
        console.log("Error while updating package.", e);
        setAlertCode(RESPONSE_CODE[e.message]);
      }
    },
    [packageList, loadPackageList, userProfile.email, userProfile.userData]
  );

  const onPopupActionRAI = useCallback(
    (value) => {
      history.push(`${value.link}?transmittalNumber=${value.raiId}`);
    },
    [history]
  );

  const renderActions = useCallback(
    ({ row }) => {
      const packageConfig = ChangeRequest.CONFIG[row.original.componentType];
      let menuItems = [];

      packageConfig?.actionsByStatus[row.original.currentStatus]?.forEach(
        (actionLabel) => {
          const newItem = { label: actionLabel };
          if (actionLabel === ChangeRequest.PACKAGE_ACTION.WITHDRAW) {
            newItem.value = "Withdrawn";
            newItem.formatConfirmationMessage = ({ componentId }) =>
              `You are about to withdraw ${componentId}. Once complete, you will not be able to resubmit this package. CMS will be notified.`;
            newItem.handleSelected = onPopupActionWithdraw;
          } else {
            newItem.value = {
              link: packageConfig?.raiLink,
              raiId: row.original.componentId,
            };
            newItem.handleSelected = onPopupActionRAI;
          }
          menuItems.push(newItem);
        }
      );

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

  const columns = useMemo(
    () =>
      [
        {
          Header:
            tab === ChangeRequest.PACKAGE_GROUP.SPA
              ? "SPA ID"
              : "Waiver Number",
          accessor: "componentId",
          disableGlobalFilter: false,
          disableSortBy: true,
          Cell: renderId,
        },
        tab === ChangeRequest.PACKAGE_GROUP.WAIVER && {
          Header: "Waiver Family #",
          id: "familyNumber",
          accessor: getFamily,
          disableGlobalFilter: true,
          disableFilters: true,
        },
        {
          Header: "Type",
          accessor: getType,
          id: "componentType",
          Cell: renderType,
          disableFilters: false,
          filter: CustomFilterTypes.MultiCheckbox,
          Filter: CustomFilterUi.MultiCheckbox,
        },
        {
          Header: "State",
          accessor: getState,
          id: "territory",
          disableFilters: false,
          filter: "includesValue",
          Filter: CustomFilterUi.TerritorySelect,
        },
        {
          Header: "90th Day",
          accessor: getFilteredDate("clockEndTimestamp", "currentStatus"),
          id: "ninetiethDay",
          Cell: renderDate,
          disableFilters: false,
          filter: CustomFilterTypes.DateRangeAndMultiCheckbox,
          Filter: CustomFilterUi.DateRangeAndMultiCheckbox,
        },
        tab === ChangeRequest.PACKAGE_GROUP.WAIVER && {
          Header: "Expiration Date",
          accessor: getFilteredDate("expirationTimestamp", "componentType"),
          id: "expirationTimestamp",
          Cell: renderDate,
          disableFilters: false,
          filter: CustomFilterTypes.DateRange,
          Filter: CustomFilterUi.DateRange,
        },
        {
          Header: "Status",
          accessor: "currentStatus",
          id: "packageStatus",
          disableFilters: false,
          filter: CustomFilterTypes.MultiCheckbox,
          Filter: CustomFilterUi.MultiCheckbox,
        },
        {
          Header: "Date Submitted",
          accessor: "submissionTimestamp",
          Cell: renderDate,
          disableFilters: false,
          filter: CustomFilterTypes.DateRange,
          Filter: CustomFilterUi.DateRangeInPast,
        },
        {
          Header: "Submitted By",
          accessor: "submitterName",
          disableGlobalFilter: false,
          id: "submitter",
          Cell: renderName,
        },
        userRoleObj.canAccessForms && {
          Header: "Actions",
          accessor: "actions",
          disableSortBy: true,
          id: "packageActions",
          Cell: renderActions,
        },
      ].filter(Boolean),
    [
      getType,
      renderActions,
      renderId,
      renderType,
      renderName,
      tab,
      userRoleObj.canAccessForms,
    ]
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
        tableListExportToCSV("submission-table", packageList, "SubmissionList");
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

  function getRightSideContent() {
    const userCanSubmit =
      userStatus === USER_STATUS.ACTIVE && userRoleObj.canAccessForms;

    let rightSideContent = "";
    if (userCanSubmit) {
      rightSideContent = newSubmissionButton;
    } else if (userStatus === USER_STATUS.ACTIVE || !userStatus) {
      rightSideContent = csvExportSubmissions;
    }

    return rightSideContent;
  }
  function renderSubmissionList() {
    if (userData.type !== USER_TYPE.CMS_ROLE_APPROVER) {
      if (userStatus === USER_STATUS.PENDING) {
        return (
          <EmptyList message={pendingMessage[userProfile.userData.type]} />
        );
      }

      const userStatusNotActive =
        userData.type && (!userStatus || userStatus !== USER_STATUS.ACTIVE);
      if (userStatusNotActive) {
        return (
          <EmptyList
            showProfileLink="true"
            message={deniedOrRevokedMessage[userProfile.userData.type]}
          />
        );
      }
    }

    const tableClassName = classNames({
      "submissions-table": true,
      "submissions-table-actions-column": userRoleObj.canAccessForms,
    });
    const packageListExists = packageList && packageList.length > 0;
    return (
      <LoadingScreen isLoading={isLoading}>
        {packageListExists ? (
          <PortalTable
            className={tableClassName}
            columns={columns}
            data={packageList}
            initialState={initialTableState}
            pageContentRef={dashboardRef}
            searchBarTitle="Search by Package ID or Submitter Name"
            withSearchBar
          />
        ) : (
          <EmptyList message="You have no submissions yet." />
        )}
      </LoadingScreen>
    );
  }

  function switchTo(event) {
    setTab(event.currentTarget.value);
  }

  // Render the dashboard
  return (
    <div className="dashboard-white">
      <PageTitleBar
        heading="Submission Dashboard"
        rightSideContent={getRightSideContent()}
      />
      <div className="dash-and-filters" ref={dashboardRef}>
        <div className="dashboard-and-alert-bar">
          <AlertBar alertCode={alertCode} closeCallback={closedAlert} />
          <div className="dashboard-container">
            <div className="tab-bar">
              <Button
                id="show-spas-button"
                aria-label="switch to showing spa packages"
                className="tab-button"
                disabled={tab === ChangeRequest.PACKAGE_GROUP.SPA}
                onClick={switchTo}
                value={ChangeRequest.PACKAGE_GROUP.SPA}
              >
                SPAs
              </Button>
              <Button
                id="show-waivers-button"
                aria-label="switch to showing waiver packages"
                className="tab-button"
                disabled={tab === ChangeRequest.PACKAGE_GROUP.WAIVER}
                onClick={switchTo}
                value={ChangeRequest.PACKAGE_GROUP.WAIVER}
              >
                Waivers
              </Button>
            </div>
            {renderSubmissionList()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageList;
