import React, { useState, useEffect } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useAppContext } from "../libs/contextLib";
import { CHANGE_REQUEST_TYPES } from "../changeRequest/changeRequestTypes";
import AlertBar from "../components/AlertBar";
import { ALERTS_MSG } from "../libs/alert-messages";
import { ROUTES } from "../Routes";
import { useHistory } from "react-router-dom";
import { Button } from "@cmsgov/design-system";
import ChangeRequestDataApi from "../utils/ChangeRequestDataApi";
import "./Dashboard.scss";

/**
 * Component containing dashboard
 */
export default function Dashboard() {
  const [changeRequestList, setChangeRequestList] = useState([]);
  const { isAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  const history = useHistory();

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
      let title;
      let link = "/" + changeRequest.type + "/" + changeRequest.id;
      switch (changeRequest.type) {
        case CHANGE_REQUEST_TYPES.SPA:
          title = "SPA Submission: " + changeRequest.transmittalNumber;
          break;
        case CHANGE_REQUEST_TYPES.WAIVER:
          title = "Waiver Submission: " + changeRequest.transmittalNumber;
          break;

        case CHANGE_REQUEST_TYPES.SPA_RAI:
          title = "Response to RAI for SPA Submission: " + changeRequest.transmittalNumber;
          break;

        case CHANGE_REQUEST_TYPES.WAIVER_RAI:
          title = "Response to RAI for Waiver Submission: " + changeRequest.transmittalNumber;
          break;

        case CHANGE_REQUEST_TYPES.WAIVER_EXTENSION:
          title = "Temporary Extension Request for Waiver: " + changeRequest.transmittalNumber;
          break;

        default:
          title = "Submission Type: " + changeRequest.type ;
      }

      return (
        <LinkContainer key={changeRequest.id} to={link}>
          <ListGroupItem header={title}>
            {"Submitted on: " + new Date(changeRequest.submittedAt).toLocaleString()}
          </ListGroupItem>
        </LinkContainer>
      );
    });
  }

  // Render the dashboard
  return (
    <div className="dashboard-container">
      <div className="dashboard-title">SPA and Waiver Dashboard</div>
      <div className="dashboard-left-col">
        <div className="action-title">SPAs</div>
          <Button
            variation="transparent"
            onClick={() => history.push(ROUTES.SPA)}
          >
            Submit new SPA
            </Button>
          <Button
            variation="transparent"
            onClick={() => history.push(ROUTES.SPA_RAI)}
          >
            Respond to SPA RAI
            </Button>
        <div className="action-title">Waivers</div>
          <Button
            variation="transparent"
            onClick={() => history.push(ROUTES.WAIVER)}
          >
            Submit new Waiver
            </Button>
          <Button
            variation="transparent"
            onClick={() => history.push(ROUTES.WAIVER_RAI)}
          >
            Respond to 1915(b) Waiver RAI
            </Button>
          <Button
            variation="transparent"
            onClick={() => history.push(ROUTES.WAIVER_EXTENSION)}
          >
            Request Temporary Extension form - 1915(b) and 1915(c)
          </Button>
      </div>
      <div className="dashboard-right-col">
      <div className="action-title">Your SPA and Waiver Submissions</div>
        {isLoading ? (
          <div className="loading">Please wait while we fetch your submissions...</div>
        ) : (
            <div>
              {changeRequestList.length > 0 ? (
                <ListGroup>
                  {renderChangeRequestList(changeRequestList)}
                </ListGroup>
              ) : (
                  <div className="empty-list">You have no submissions yet</div>
                )}
            </div>
          )}
      </div>
    </div>
  );
}
