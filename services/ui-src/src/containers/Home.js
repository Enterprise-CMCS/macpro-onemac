import React, { useState, useEffect } from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import "./Home.css";
import { API } from "aws-amplify";
import { LinkContainer } from "react-router-bootstrap";
import { RECORD_TYPES } from "../libs/recordTypes";

export default function Home() {
  const [amendments, setAmendments] = useState([]);
  const { isAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }

      try {
        setAmendments(await API.get("amendments", "/list"));
      } catch (e) {
        onError(e);
      }

      setIsLoading(false);
    }

    onLoad();
  }, [isAuthenticated]);

  function renderRecordList(records) {
    // First sort the list with the lastest record first.
    let sortedRecords = records.sort(function(a, b) {
      let retVal = 0;
      if(a && b && a.createdAt && b.createdAt) {
        let aDate = new Date(a.createdAt);
        let bDate = new Date(b.createdAt);
        if(aDate < bDate) retVal = 1;
        else if(aDate > bDate) retVal = -1;
      } 
      return retVal;
    });

    return sortedRecords.map((record, i) => {
      let title;
      let link = "/" + record.type + "/" + record.amendmentId;
      switch (record.type) {
        case RECORD_TYPES.AMENDMENT:
          title = "SPA " + record.transmittalNumber;
          break;
        case RECORD_TYPES.WAIVER:
          title = "Waiver " + record.transmittalNumber;
          break;

        case RECORD_TYPES.SPA_RAI:
          title = "RAI for SPA " + record.transmittalNumber;
          break;

        default:
          title = "Unknown record type";
      }

      return (
        <LinkContainer key={record.amendmentId} to={link}>
          <ListGroupItem header={title}>
            {"Created: " + new Date(record.createdAt).toLocaleString()}
          </ListGroupItem>
        </LinkContainer>
      );
    });
  }

  function renderLander() {
    return (
      <div className="lander">
        <h1>CMS State Plan Amendment and Waiver Submission Platform</h1>
        <p>
          Welcome to the official submission system for email-based state plan
          amendments (SPAs) and section 1915 waivers. After signing up for the
          system, you can fill out forms to send the SPA and/or waivers and
          attached documents to SPA@cms.hhs.gov. After you submit, you will
          receive an email confirmation that your submission was received,
          marking the start of the 90-day review process.
        </p>
        <hr></hr>
        <h2>In this system, you can submit:</h2>
        <ul>
          <li>
            Amendments to your Medicaid State Plans (not submitted through
            MACPro or MMDL)
          </li>
          <li>
            Official state responses to formal Requests for Additional
            Information (RAIs) for SPAs (not submitted through MACPro)
          </li>
          <li>
            Section 1915(b) waiver submissions (those not submitted through WMS)
          </li>
          <li>
            All Cost Effectiveness spreadsheets associated with 1915(b) waivers
          </li>
          <li>
            Section 1915(c) Appendix K amendments (which cannot be submitted
            through WMS)
          </li>
          <li>
            Official state responses to formal Requests for Additional
            Information (RAIs) for Section 1915(b) waiver actions (in addition
            to submitting waiver changes in WMS, if applicable)
          </li>
          <li>
            State requests for Temporary Extensions for section 1915(b) and
            1915(c) waivers
          </li>
        </ul>
      </div>
    );
  }

  function renderInsides() {
    return (
      <div>
        <div className="actions-container">
          <div className="actions-left-col">
            <div className="action-title">SPAs</div>
            <div className="action">
              <a href="/amendment/new">Submit new SPA</a>
            </div>
            <div className="action">
              <a href="/sparai">Respond to SPA RAI</a>
            </div>
          </div>
          <div className="actions-right-col">
            <div className="action-title">Waivers</div>
            <div className="action">
              <a href="/waiver/new">Submit new Waiver</a>
            </div>
          </div>
        </div>
        <br />
        <div className="amendments">
          <PageHeader>Your SPA and Waiver Submissions</PageHeader>
          <ListGroup>{!isLoading && renderRecordList(amendments)}</ListGroup>
        </div>
      </div>
    );
  }

  return (
    <div className="Home">
      {isAuthenticated ? renderInsides() : renderLander()}
    </div>
  );
}
