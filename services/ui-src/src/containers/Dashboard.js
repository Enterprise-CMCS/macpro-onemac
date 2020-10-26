import React, { useState, useEffect } from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { API } from "aws-amplify";
import { useAppContext } from "../libs/contextLib";
import { CHANGE_REQUEST_TYPES } from "../changeRequest/changeRequestTypes";
import AlertBar from "../components/AlertBar";
import { ALERTS_MSG } from "../libs/alert-messages";
import { ROUTES } from "../Routes";
import { useHistory } from "react-router-dom";
import { Button } from "@cmsgov/design-system";
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
        setChangeRequestList(await API.get("changeRequestAPI", "/list"));
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
      if (a && b && a.createdAt && b.createdAt) {
        let aDate = new Date(a.createdAt);
        let bDate = new Date(b.createdAt);
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
          title = "SPA " + changeRequest.transmittalNumber;
          break;
        case CHANGE_REQUEST_TYPES.WAIVER:
          title = "Waiver " + changeRequest.transmittalNumber;
          break;

        case CHANGE_REQUEST_TYPES.SPA_RAI:
          title = "RAI for SPA " + changeRequest.transmittalNumber;
          break;

        case CHANGE_REQUEST_TYPES.WAIVER_RAI:
          title = "RAI for Waiver " + changeRequest.transmittalNumber;
          break;

        case CHANGE_REQUEST_TYPES.WAIVER_EXTENSION:
          title = "Temporary Extension Request for Waiver " + changeRequest.transmittalNumber;
          break;

        default:
          title = "Unknown record type";
      }

      return (
        <LinkContainer key={changeRequest.id} to={link}>
          <ListGroupItem header={title}>
            {"Created: " + new Date(changeRequest.createdAt).toLocaleString()}
          </ListGroupItem>
        </LinkContainer>
      );
    });
  }

  // Render the dashboard
  return (
    <div>
      <div className="actions-container">
        <div className="actions-left-col">
          <div className="action-title">SPAs</div>
          <div className="action">
            <Button
              variation="transparent"
              onClick={() => history.push(ROUTES.SPA)}
            >
              Submit new SPA
            </Button>
          </div>
          <div className="action">
            <Button
              variation="transparent"
              onClick={() => history.push(ROUTES.SPA_RAI)}
            >
              Respond to SPA RAI
            </Button>
          </div>
        </div>
        <div className="actions-right-col">
          <div className="action-title">Waivers</div>
          <div className="action">
            <Button
              variation="transparent"
              onClick={() => history.push(ROUTES.WAIVER)}
            >
              Submit new Waiver
            </Button>
          </div>
          <div className="action">
            <Button
              variation="transparent"
              onClick={() => history.push(ROUTES.WAIVER_RAI)}
            >
              Respond to 1915(b) Waiver RAI
            </Button>
          </div>
          <div className="action">
            <a href={ROUTES.WAIVER_EXTENSION}>Request Temporary Extension form - 1915(b) and 1915(c)</a>
          </div>
        </div>
      </div>
      <br />
      <div className="amendments">
        <PageHeader>Your Submissions</PageHeader>
        {isLoading ? (
          <div>Please wait while we fetch your submissions...</div>
        ) : (
          <div>
            {changeRequestList.length > 0 ? (
              <ListGroup>
                {renderChangeRequestList(changeRequestList)}
              </ListGroup>
            ) : (
              <div>You have no submissions yet</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
