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
  Validate,
  Workflow,
  getUserRoleObj,
  USER_ROLE,
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
  componentType: [Workflow.ONEMAC_TYPE.SPA, Workflow.ONEMAC_TYPE.CHIP_SPA],
};

const renderDate = ({ value }) =>
  typeof value === "number" ? format(value, "MMM d, yyyy") : value ?? "N/A";

const getFamily = ({ componentId }) =>
  componentId ? Validate.getWaiverFamily(componentId) : "";

export const getState = ({ componentId }) =>
  componentId ? componentId.toString().substring(0, 2) : "--";

const getChildren = ({ children }) => children;

/**
 * Component containing dashboard
 */
const PackageList = ({ startTab = Workflow.PACKAGE_GROUP.SPA }) => {
  const dashboardRef = useRef();
  const [packageList, setPackageList] = useState([]);
  const [tab, setTab] = useState(startTab);
  const [isLoading, setIsLoading] = useState(true);
  const {
    userStatus,
    userRole,
    userProfile,
    userProfile: { cmsRoles, userData } = {},
  } = useAppContext();
  const history = useHistory();
  const location = useLocation();
  const [alertCode, setAlertCode] = useState(location?.state?.passCode);
  const userRoleObj = getUserRoleObj(userData?.roleList);

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
      <Link to={`/detail/${row.original.componentType}/${value}`}>{value}</Link>
    ),
    []
  );

  const getType = useCallback(
    ({ componentType }) => Workflow.ONEMAC_LABEL[componentType] ?? [],
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
      const [row, child] = rowNum.split(".");
      let packageToModify;
      if (child) packageToModify = packageList[row].children[child];
      else packageToModify = packageList[row];
      try {
        console.log("rowNum: ", rowNum);
        console.log("package to modify ", packageToModify);
        const resp = await PackageAPI.withdraw(
          userProfile.userData.fullName,
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

      (packageConfig?.actionsByStatus ?? Workflow.defaultActionsByStatus)[
        row.original.currentStatus
      ]?.forEach((actionLabel) => {
        const newItem = { label: actionLabel };
        if (actionLabel === Workflow.PACKAGE_ACTION.WITHDRAW) {
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
      });

      return (
        <PopupMenu
          buttonLabel={`Actions for ${row.original.componentId}`}
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
            tab === Workflow.PACKAGE_GROUP.SPA ? "SPA ID" : "Waiver Number",
          accessor: "componentId",
          disableGlobalFilter: false,
          disableSortBy: true,
          Cell: renderId,
        },
        tab === Workflow.PACKAGE_GROUP.WAIVER && {
          Header: "Waiver Family #",
          id: "familyNumber",
          accessor: getFamily,
          disableGlobalFilter: true,
          disableFilters: true,
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
          Header: "Type",
          accessor: getType,
          id: "componentType",
          Cell: renderType,
          disableFilters: false,
          filter: CustomFilterTypes.MultiCheckbox,
          Filter: CustomFilterUi.MultiCheckbox,
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
          Header: "90th Day",
          accessor: ({ currentStatus, clockEndTimestamp }) => {
            return Workflow.get90thDayText(currentStatus, clockEndTimestamp);
          },
          id: "ninetiethDay",
          Cell: renderDate,
          disableFilters: false,
          filter: CustomFilterTypes.DateRangeAndMultiCheckbox,
          Filter: CustomFilterUi.DateRangeAndMultiCheckbox,
        },
        tab === Workflow.PACKAGE_GROUP.WAIVER && {
          Header: "Expiration Date",
          accessor: ({ expirationTimestamp, componentType }) => {
            if (!filterArray.componentType.includes(componentType)) {
              if (expirationTimestamp) return expirationTimestamp;
            } else {
              return "N/A";
            }
            return "Pending";
          },
          id: "expirationTimestamp",
          Cell: renderDate,
          disableFilters: false,
          filter: CustomFilterTypes.DateRange,
          Filter: CustomFilterUi.DateRange,
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
    () => ({
      sortBy: [{ id: "timestamp", desc: true }],
      hiddenColumns: ["expirationTimestamp", "familyNumber"],
    }),
    []
  );

  const csvExportSubmissions = (
    <Button
      id="new-submission-button"
      className="new-submission-button"
      onClick={(e) => {
        e.preventDefault();
        tableListExportToCSV("package-dashboard", packageList, `${tab}List`);
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
      href={ROUTES.TRIAGE_GROUP}
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
    } else if (userStatus === USER_STATUS.ACTIVE || !userStatus) {
      rightSideContent = csvExportSubmissions;
    }

    return rightSideContent;
  }

  const TEMP_onReset = useCallback(() => setPackageList((d) => [...d]), []);

  function renderSubmissionList() {
    if (userRole !== USER_ROLE.CMS_ROLE_APPROVER) {
      if (userStatus === USER_STATUS.PENDING) {
        return <EmptyList message={pendingMessage[userRole]} />;
      }

      if (userStatus !== USER_STATUS.ACTIVE) {
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
    const packageListExists = packageList && packageList.length > 0;
    return (
      <LoadingScreen isLoading={isLoading}>
        {packageListExists ? (
          <PortalTable
            className={tableClassName}
            columns={columns}
            data={packageList}
            expandable={tab === Workflow.PACKAGE_GROUP.WAIVER}
            getSubRows={getChildren}
            initialState={initialTableState}
            pageContentRef={dashboardRef}
            searchBarTitle="Search by Package ID or Submitter Name"
            withSearchBar
            TEMP_onReset={TEMP_onReset}
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
                disabled={tab === Workflow.PACKAGE_GROUP.SPA}
                onClick={switchTo}
                value={Workflow.PACKAGE_GROUP.SPA}
              >
                SPAs
              </Button>
              <Button
                id="show-waivers-button"
                aria-label="switch to showing waiver packages"
                className="tab-button"
                disabled={tab === Workflow.PACKAGE_GROUP.WAIVER}
                onClick={switchTo}
                value={Workflow.PACKAGE_GROUP.WAIVER}
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
