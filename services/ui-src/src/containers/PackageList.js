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
  ONEMAC_ROUTES,
  Workflow,
  getUserRoleObj,
  USER_ROLE,
  USER_STATUS,
  TYPE_TO_DETAIL_ROUTE,
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
import ActionPopup from "../components/ActionPopup";
import { useAppContext } from "../libs/contextLib";
import { pendingMessage, deniedOrRevokedMessage } from "../libs/userLib";
import {
  LOCAL_STORAGE_COLUMN_VISIBILITY_SPA,
  LOCAL_STORAGE_COLUMN_VISIBILITY_WAIVER,
  LOCAL_STORAGE_TABLE_FILTERS_SPA,
  LOCAL_STORAGE_TABLE_FILTERS_WAIVER,
} from "../utils/StorageKeys";
import { portalTableExportToCSV } from "../utils/portalTableExportToCSV";
import { FORM_SOURCE } from "../domain-types";

const defaultStateHiddenCols = ["territory", "cpocName"];
const defaultCMSHiddenCols = ["submitter", "cpocName"];

const DEFAULT_COLUMNS = {
  [USER_ROLE.STATE_SUBMITTER]: defaultStateHiddenCols,
  [USER_ROLE.STATE_SYSTEM_ADMIN]: defaultStateHiddenCols,
  [USER_ROLE.HELPDESK]: defaultStateHiddenCols,
  [USER_ROLE.CMS_REVIEWER]: defaultCMSHiddenCols,
  [USER_ROLE.CMS_ROLE_APPROVER]: defaultCMSHiddenCols,
  [USER_ROLE.SYSTEM_ADMIN]: defaultCMSHiddenCols,
  [USER_ROLE.DEFAULT_CMS_USER]: defaultCMSHiddenCols,
};

const renderDate = ({ value }) =>
  typeof value === "number" && value > 0
    ? format(value, "MMM d, yyyy")
    : "-- --";

export const getState = ({ componentId }) =>
  componentId ? componentId.toString().substring(0, 2) : "--";

/**
 * Component containing dashboard
 */
const PackageList = () => {
  const dashboardRef = useRef();
  const [packageList, setPackageList] = useState([]);
  const [visibleRows, setVisibleRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {
    userStatus,
    userRole,
    userProfile,
    userProfile: { cmsRoles, userData } = {},
  } = useAppContext();
  const history = useHistory();
  const location = useLocation();
  const startTab =
    new URLSearchParams(location.search).get("startTab") ??
    Workflow.PACKAGE_GROUP.SPA;
  const [tab, setTab] = useState(startTab);
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

  const tellPackageListAboutAction = useCallback(
    async (returnCode) => {
      const ctrlr = new AbortController();
      await loadPackageList(ctrlr);

      setAlertCode(returnCode);
    },
    [loadPackageList]
  );

  // load the data from the backend for existing users.
  useEffect(() => {
    if (location?.state?.passCode !== undefined) location.state.passCode = null;

    const ctrlr = new AbortController();

    if (packageList.length === 0) loadPackageList(ctrlr);

    return function cleanup() {
      ctrlr.abort();
    };
  }, [
    cmsRoles,
    history,
    loadPackageList,
    location,
    userData,
    userProfile,
    packageList.length,
  ]);

  const renderId = useCallback(
    ({ row, value }) => (
      <Link to={`${TYPE_TO_DETAIL_ROUTE[row.original.componentType]}/${value}`}>
        {value}
      </Link>
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

  const renderActions = useCallback(
    ({ row }) => {
      return (
        <ActionPopup
          theComponent={row.original}
          formSource={FORM_SOURCE.PACKAGE_LIST}
          alertCallback={tellPackageListAboutAction}
        />
      );
    },
    [tellPackageListAboutAction]
  );

  const exportTransformMap = {
    submissionTimestamp: renderDate,
    latestRaiResponseTimestamp: renderDate,
  };

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
          Header: "Initial Submission",
          accessor: "submissionTimestamp",
          Cell: renderDate,
          disableFilters: false,
          filter: CustomFilterTypes.DateRange,
          Filter: CustomFilterUi.DateRangeInPast,
        },
        {
          Header: "Formal RAI Response",
          accessor: "latestRaiResponseTimestamp",
          Cell: renderDate,
          disableFilters: false,
          filter: CustomFilterTypes.DateRange,
          Filter: CustomFilterUi.DateRangeInPast,
        },
        {
          Header: "CPOC Name",
          accessor: "cpocName",
          id: "cpocName",
          disableGlobalFilter: false,
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
      tab,
      renderId,
      getType,
      renderType,
      userRoleObj.canAccessForms,
      renderName,
      renderActions,
    ]
  );
  const initialTableState = useMemo(() => {
    const hiddenColsSaveKey =
      tab === "spa"
        ? LOCAL_STORAGE_COLUMN_VISIBILITY_SPA
        : LOCAL_STORAGE_COLUMN_VISIBILITY_WAIVER;
    const filtersSaveKey =
      tab === "spa"
        ? LOCAL_STORAGE_TABLE_FILTERS_SPA
        : LOCAL_STORAGE_TABLE_FILTERS_WAIVER;
    // Retrieve hidden column saved state (session)
    let localHiddenColumns = sessionStorage?.getItem(hiddenColsSaveKey);
    let localTableFilters = sessionStorage?.getItem(filtersSaveKey);
    if (localHiddenColumns === null) {
      // If tab/session doesn't have its own, use the source of truth for all tabs
      localHiddenColumns = localStorage?.getItem(hiddenColsSaveKey);
    }
    if (localTableFilters === null) {
      localTableFilters = localStorage?.getItem(filtersSaveKey);
    }
    return {
      sortBy: [{ id: "submissionTimestamp", desc: true }],
      // Set saved hidden cols
      hiddenColumns: localHiddenColumns
        ? JSON.parse(localHiddenColumns)
        : DEFAULT_COLUMNS[userRole],
      // Set saved filters
      filters: localTableFilters ? JSON.parse(localTableFilters) : [],
    };
  }, [tab, userRole]);

  const csvExportPackages = (
    <Button
      id="new-submission-button"
      className="new-submission-button"
      onClick={(e) => {
        e.preventDefault();
        portalTableExportToCSV(visibleRows, exportTransformMap, `${tab}List`);
      }}
      inversed
    >
      Export to Excel (CSV){" "}
    </Button>
  );

  const newSubmissionButton = (
    <Button
      id="new-submission-button"
      className="new-submission-button"
      href={ONEMAC_ROUTES.TRIAGE_GROUP}
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
      rightSideContent = csvExportPackages;
    }

    return rightSideContent;
  }

  function PackageListContent() {
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
      "package-table": true,
      "package-table-actions-column": userRoleObj.canAccessForms,
    });
    const packageListExists = packageList && packageList.length > 0;
    return (
      <LoadingScreen isLoading={isLoading}>
        {packageListExists ? (
          <PortalTable
            internalName={tab}
            className={tableClassName}
            columns={columns}
            data={packageList}
            initialState={initialTableState}
            pageContentRef={dashboardRef}
            searchBarTitle="Search by Package ID, CPOC Name, or Submitter Name"
            withSearchBar
            onVisibleDataChange={setVisibleRows}
          />
        ) : (
          <EmptyList message="You have no packages yet." />
        )}
      </LoadingScreen>
    );
  }

  function switchTo(event) {
    setTab(event.currentTarget.value);
    setPackageList([]);
  }

  // Render the dashboard
  return (
    <div className="dashboard-white">
      <PageTitleBar
        heading="Package Dashboard"
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
            {PackageListContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageList;
