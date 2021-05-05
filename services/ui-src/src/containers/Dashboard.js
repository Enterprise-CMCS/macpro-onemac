import React, { useCallback, useState, useEffect, useMemo } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { format } from "date-fns";
import { Button } from "@cmsgov/design-system";
import { ROUTES } from "cmscommonlib";

import { CHANGE_REQUEST_TYPES } from "../changeRequest/changeRequestTypes";
import PageTitleBar from "../components/PageTitleBar";
import PortalTable from "../components/PortalTable";
import { AlertBar } from "../components/AlertBar";
import { EmptyList } from "../components/EmptyList";
import LoadingScreen from "../components/LoadingScreen";
import { ALERTS_MSG } from "../libs/alert-messages";
import ChangeRequestDataApi from "../utils/ChangeRequestDataApi";
import { useAppContext } from "../libs/contextLib";
import {
  pendingMessage,
  deniedOrRevokedMessage,
  isPending,
  isActive,
} from "../libs/userLib";

/**
 * Component containing dashboard
 */
const Dashboard = () => {
  const [changeRequestList, setChangeRequestList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { userProfile, userProfile: { userData } = {} } = useAppContext();
  const history = useHistory();
  const location = useLocation();

  // Redirect new users to the signup flow, and load the data from the backend for existing users.
  useEffect(() => {
    if (!userData?.type || !userData?.attributes) {
      history.replace("/signup", location.state);
      return;
    }

    let mounted = true;

    (async function onLoad() {
      try {
        if (mounted)
          setChangeRequestList(
            await ChangeRequestDataApi.getAllByAuthorizedTerritories(
              userProfile.email
            )
          );
        if (mounted) setIsLoading(false);
      } catch (error) {
        console.log("Error while fetching user's list.", error);
        history.replace("/dashboard", {
          showAlert: ALERTS_MSG.DASHBOARD_LIST_FETCH_ERROR,
        });
      }
    })();

    return function cleanup() {
      mounted = false;
    };
  }, [history, location, userData, userProfile]);

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
        [CHANGE_REQUEST_TYPES.CHIP_SPA]: "CHIP SPA",
        [CHANGE_REQUEST_TYPES.CHIP_SPA_RAI]: "CHIP SPA RAI",
        [CHANGE_REQUEST_TYPES.SPA]: "Medicaid SPA",
        [CHANGE_REQUEST_TYPES.WAIVER]: "Waiver",
        [CHANGE_REQUEST_TYPES.SPA_RAI]: "SPA RAI",
        [CHANGE_REQUEST_TYPES.WAIVER_RAI]: "Waiver RAI",
        [CHANGE_REQUEST_TYPES.WAIVER_EXTENSION]: "Temporary Extension Request",
        [CHANGE_REQUEST_TYPES.WAIVER_APP_K]: "1915(c) Appendix K Amendment",
      }[type] ?? []),
    []
  );

  const renderType = useCallback(
    ({ value }) => <span className="type-badge">{value}</span>,
    []
  );

  const renderDate = useCallback(
    ({ value }) => format(value, "MMM d, yyyy"),
    []
  );

  const columns = useMemo(
    () => [
      {
        Header: "SPA ID/Waiver Number",
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
    ],
    [getType, renderDate, renderId, renderType]
  );

  const initialTableState = useMemo(
    () => ({ sortBy: [{ id: "submittedAt", desc: true }] }),
    []
  );

  // Render the dashboard
  return (
    <div className="dashboard-white">
      <PageTitleBar heading="SPA and Waiver Dashboard" text="" />
      <AlertBar />
      <div className="dashboard-container">
        {!!userProfile?.userData?.attributes &&
        isActive(userProfile?.userData) ? (
          <>
            <div className="dashboard-left-col">
              <div className="action-title">SPAs</div>
              <Button
                id="spaSubmitBtn"
                variation="transparent"
                onClick={() => history.push(ROUTES.SPA)}
              >
                Submit New Medicaid SPA
              </Button>
              <Button
                id="spaRaiBtn"
                variation="transparent"
                onClick={() => history.push(ROUTES.SPA_RAI)}
              >
                Respond to Medicaid SPA RAI
              </Button>
              <Button
                id="chipSpaBtn"
                variation="transparent"
                onClick={() => history.push(ROUTES.CHIP_SPA)}
              >
                Submit New CHIP SPA
              </Button>
              <Button
                id="chipSpaRaiBtn"
                variation="transparent"
                onClick={() => history.push(ROUTES.CHIP_SPA_RAI)}
              >
                Respond to CHIP SPA RAI
              </Button>
              <div className="action-title">Waivers</div>
              <Button
                id="waiverBtn"
                variation="transparent"
                onClick={() => history.push(ROUTES.WAIVER)}
              >
                Submit 1915(b) Waiver Action
              </Button>
              <Button
                id={"waiverRaiBtn"}
                variation="transparent"
                onClick={() => history.push(ROUTES.WAIVER_RAI)}
              >
                Respond to 1915(b) Waiver RAI
              </Button>
              <Button
                id="waiverExtBtn"
                variation="transparent"
                onClick={() => history.push(ROUTES.WAIVER_EXTENSION)}
              >
                Request Temporary Extension form - 1915(b) and 1915(c)
              </Button>
              <Button
                id="waiverAppKBtn"
                variation="transparent"
                onClick={() => history.push(ROUTES.WAIVER_APP_K)}
              >
                Submit 1915(c) Appendix K Amendment
              </Button>
            </div>
            <div className="dashboard-right-col">
              <div>
                <div className="action-title">Submissions List</div>
                <LoadingScreen isLoading={isLoading}>
                  <div>
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
                  </div>
                </LoadingScreen>
              </div>
            </div>
          </>
        ) : isPending(userProfile.userData) ? (
          <EmptyList message={pendingMessage[userProfile.userData.type]} />
        ) : (
          <EmptyList
            message={deniedOrRevokedMessage[userProfile.userData.type]}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
