import React, { useState, useEffect } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { API } from "aws-amplify";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import { CHANGE_REQUEST_TYPES } from "../changeRequest/changeRequestTypes";
import "./Dashboard.scss";

/**
 * Component containing dashboard
 */
export default function Dashboard() {
  const [changeRequestList, setChangeRequestList] = useState([]);
  const { isAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  // Load the data from the backend.
  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }

      try {
        setChangeRequestList(await API.get("changeRequestAPI", "/list"));
      } catch (e) {
        onError(e);
      }

      setIsLoading(false);
    }

    onLoad();
  }, [isAuthenticated]);

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

    return sortedChangeRequests.map((changeRequest, i) => {
      let title;
      let link = "/" + changeRequest.type + "/" + changeRequest.id;
      switch (changeRequest.type) {
        case CHANGE_REQUEST_TYPES.AMENDMENT:
          title = "SPA " + changeRequest.transmittalNumber;
          break;
        case CHANGE_REQUEST_TYPES.WAIVER:
          title = "Waiver " + changeRequest.transmittalNumber;
          break;

        case CHANGE_REQUEST_TYPES.SPA_RAI:
          title = "RAI for SPA " + changeRequest.transmittalNumber;
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

  return (
    <div className="submissions">
      <h1>Your SPA and Waiver Submissions</h1>
      <ListGroup>{!isLoading && renderChangeRequestList(changeRequestList)}</ListGroup>
    </div>
  );
}
