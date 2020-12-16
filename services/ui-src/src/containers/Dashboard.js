import React, { useState, useEffect } from "react";
import { useAppContext } from "../libs/contextLib";
import { CHANGE_REQUEST_TYPES } from "../changeRequest/changeRequestTypes";
import AlertBar from "../components/AlertBar";
import PageTitleBar from "../components/PageTitleBar";
import LoadingScreen from "../components/LoadingScreen";
import { ALERTS_MSG } from "../libs/alert-messages";
import { ROUTES } from "../Routes";
import { Link, useHistory } from "react-router-dom";
import { Button } from "@cmsgov/design-system";
import ChangeRequestDataApi from "../utils/ChangeRequestDataApi";
import { format } from 'date-fns'

/**
 * Component containing dashboard
 */
export default function Dashboard() {
  const [changeRequestList, setChangeRequestList] = useState([]);
  const { isAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  const history = useHistory();

  PageTitleBar.setPageTitleInfo({heading : "SPA and Waiver Dashboard", text: "" })
  // Load the data from the backend.
  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }

      try {
        setChangeRequestList(await ChangeRequestDataApi.getAll());
        setIsLoading(false);
      } catch (error) {
        console.log("Error while fetching user's list.", error);
        AlertBar.alert(ALERTS_MSG.DASHBOARD_LIST_FETCH_ERROR);
      }
    }

    onLoad();
  }, [isAuthenticated]);

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
        case CHANGE_REQUEST_TYPES.SPA:
          type = "SPA";
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

        default:
          type = ""
      }

      const dateString = new Date(changeRequest.submittedAt).toDateString()
      const formattedDateString = format(changeRequest.submittedAt, "MMM d, yyyy")

      return (
        <tr>
          <td>
            <Link to={link}>
              {changeRequest.transmittalNumber}
            </Link>
          </td>
          <td>{type}</td>
          <td>{formattedDateString}</td>
        </tr>
      );
    });
  }

  // Render the dashboard
  return (
    <div className="dashboard-container">
      <div className="dashboard-left-col">
        <div className="action-title">SPAs</div>
          <Button id="spaSubmitBtn"
            variation="transparent"
            onClick={() => history.push(ROUTES.SPA)}
          >
            Submit new SPA
            </Button>
          <Button id="spaRaiBtn"
            variation="transparent"
            onClick={() => history.push(ROUTES.SPA_RAI)}
          >
            Respond to SPA RAI
            </Button>
        <div className="action-title">Waivers</div>
          <Button id="waiverBtn"
            variation="transparent"
            onClick={() => history.push(ROUTES.WAIVER)}
          >
            Submit new Waiver
            </Button>
          <Button id={"waiverRaiBtn"}
            variation="transparent"
            onClick={() => history.push(ROUTES.WAIVER_RAI)}
          >
            Respond to 1915(b) Waiver RAI
            </Button>
          <Button id="waiverExtBtn"
            variation="transparent"
            onClick={() => history.push(ROUTES.WAIVER_EXTENSION)}
          >
            Request Temporary Extension form - 1915(b) and 1915(c)
          </Button>
      </div>
      <div className="dashboard-right-col">
      <div className="action-title">Submissions List</div>
        <LoadingScreen isLoading={isLoading}>
          <div>
            {changeRequestList.length > 0 ? (
              <table class="submissions-table">
                <thead>
                  <tr>
                    <th className="column-header" scope="col">Package ID</th>
                    <th className="column-header" scope="col">Type</th>
                    <th className="column-header" scope="col">Date Submitted</th>
                  </tr>
                </thead>
                <tbody>
                  {renderChangeRequestList(changeRequestList)}
                </tbody>
              </table>
            ) : (
              <div className="empty-list">You have no submissions yet</div>
            )}
          </div>
        </LoadingScreen>
      </div>
    </div>
  );
}
