import React, { useState, useEffect } from "react";
import { CHANGE_REQUEST_TYPES } from "../changeRequest/changeRequestTypes";
import PageTitleBar from "../components/PageTitleBar";
import { AlertBar } from "../components/AlertBar";
import { EmptyList } from "../components/EmptyList";
import LoadingScreen from "../components/LoadingScreen";
import { ALERTS_MSG } from "../libs/alert-messages";
import { ROUTES  } from "cmscommonlib";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Button } from "@cmsgov/design-system";
import ChangeRequestDataApi from "../utils/ChangeRequestDataApi";
import { format } from "date-fns";
import { useAppContext } from "../libs/contextLib";
import { pendingMessage, isPending } from "../libs/userLib";

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
        if (mounted) setChangeRequestList(await ChangeRequestDataApi.getAll());
        if (mounted) setIsLoading(false);
      } catch (error) {
        console.log("Error while fetching user's list.", error);
        history.replace("/dashboard", { showAlert: ALERTS_MSG.DASHBOARD_LIST_FETCH_ERROR })
      }
    })();

    return function cleanup() {
      mounted = false;
    };
  }, [history, location, userData]);

  /**
   * Render the list of change requests.
   * @param {Array} changeRequests
   * @returns the change requests
   */
  function renderChangeRequestList(changeRequests) {
    // First sort the list with the lastest record first.
    let sortedChangeRequests = changeRequests.sort(function (a, b) {
      let retVal = 0;
      if (a && b && a.submittedAt && b.submittedAt) {
        let aDate = new Date(a.submittedAt);
        let bDate = new Date(b.submittedAt);
        if (aDate < bDate) retVal = 1;
        else if (aDate > bDate) retVal = -1;
      }
      return retVal;
    });

    //Now generate the list
    return sortedChangeRequests.map((changeRequest, i) => {
      let type;
      let link = "/" + changeRequest.type + "/" + changeRequest.id;
      switch (changeRequest.type) {
        case CHANGE_REQUEST_TYPES.CHIP_SPA:
          type = "CHIP SPA";
          break;
        case CHANGE_REQUEST_TYPES.SPA:
          type = "Medicaid SPA";
          break;

        case CHANGE_REQUEST_TYPES.WAIVER:
          type = "Waiver";
          break;

        case CHANGE_REQUEST_TYPES.SPA_RAI:
          type = "SPA RAI";
          break;

        case CHANGE_REQUEST_TYPES.WAIVER_RAI:
          type = "Waiver RAI";
          break;

        case CHANGE_REQUEST_TYPES.WAIVER_EXTENSION:
          type = "Temporary Extension Request";
          break;

        case CHANGE_REQUEST_TYPES.WAIVER_APP_K:
          type = "1915(c) Appendix K Amendment";
          break;

        default:
          type = "";
      }

      return (
        <tr key={i}>
          <td>
            <Link to={link}>{changeRequest.transmittalNumber}</Link>
          </td>
          <td>
            <span className="type-badge">{type}</span>
          </td>
          <td className="date-submitted-column">
            {format(changeRequest.submittedAt, "MMM d, yyyy")}
          </td>
        </tr>
      );
    });
  }

  // Render the dashboard
  return (
    <div className="dashboard-white">
      <PageTitleBar heading="SPA and Waiver Dashboard" text="" />
      <AlertBar />
      <div className="dashboard-container">
        <div className="dashboard-left-col">
          <div className="action-title">SPAs</div>
          <Button
            id="spaSubmitBtn"
            variation="transparent"
            onClick={() => history.push(ROUTES.SPA)}
          >
            Submit new Medicaid SPA
          </Button>
          <Button
            id="spaRaiBtn"
            variation="transparent"
            onClick={() => history.push(ROUTES.SPA_RAI)}
          >
            Respond to SPA RAI
          </Button>
          <Button
              id="chipSpaBtn"
              variation="transparent"
              onClick={() => history.push(ROUTES.CHIP_SPA)}
          >
            Submit New CHIP SPA
          </Button>
          <div className="action-title">Waivers</div>
          <Button
            id="waiverBtn"
            variation="transparent"
            onClick={() => history.push(ROUTES.WAIVER)}
          >
            Submit new Submit 1915(b) Waiver Action form
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
          {userProfile &&
          userProfile.userData &&
          userProfile.userData.attributes &&
          userProfile.userData.attributes.length !== 0 &&
          isPending(userProfile.userData) ? (
            <EmptyList message={pendingMessage[userProfile.userData.type]} />
          ) : (
            <div>
              <div className="action-title">Submissions List</div>
              <LoadingScreen isLoading={isLoading}>
                <div>
                  {changeRequestList.length > 0 ? (
                    <table className="submissions-table">
                      <thead>
                        <tr>
                          <th scope="col">SPA ID/Waiver Number</th>
                          <th scope="col">Type</th>
                          <th className="date-submitted-column" scope="col">
                            Date Submitted
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {renderChangeRequestList(changeRequestList)}
                      </tbody>
                    </table>
                  ) : (
                    <EmptyList message="You have no submissions yet." />
                  )}
                </div>
              </LoadingScreen>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
