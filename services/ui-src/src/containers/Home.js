import React, { useState, useEffect } from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import "./Home.css";
import { API } from "aws-amplify";
import { LinkContainer } from "react-router-bootstrap";

export default function Home() {
    const [amendments, setAmendments] = useState([]);
    const [waivers, setWaivers] = useState([]);
    const { isAuthenticated } = useAppContext();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        async function onLoad() {
            if (!isAuthenticated) {
                return;
            }

            try {
                const amendments = await loadAmendments();
                setAmendments(amendments);
                const waivers = await loadWaivers();
                setWaivers(waivers);
            } catch (e) {
                onError(e);
            }

            setIsLoading(false);
        }

        onLoad();
    }, [isAuthenticated]);

    function loadAmendments() {
        return API.get("amendments", "/amendments");
    }
    function loadWaivers() {
        return API.get("waivers", "/waivers");
    }
    function getNumber(numberIn) {
        if (numberIn)
            return numberIn.trim().split("\n")[0];
        else 
            return "Number Undefined";
    }

    function renderAmendmentsList(amendments) {
        return [{}].concat(amendments).map((amendment, i) =>
            i !== 0 ? (
                <LinkContainer key={amendment.amendmentId} to={`/amendments/${amendment.amendmentId}`}>
                    <ListGroupItem header={getNumber(amendment.transmittalNumber)}>
                        {"Created: " + new Date(amendment.createdAt).toLocaleString()}
                    </ListGroupItem>
                </LinkContainer>
            ) : (
                <LinkContainer key="new" to="/amendments/new">
                    <ListGroupItem>
                        <h4>
                            <b>{"\uFF0B"}</b> Submit New SPA
                        </h4>
                    </ListGroupItem>
                </LinkContainer>
            )
        );
    }

    function renderWaiversList(waivers) {
        return [{}].concat(waivers).map((waiver, i) =>
            i !== 0 ? (
                <LinkContainer key={waiver.amendmentId} to={`/waivers/${waiver.amendmentId}`}>
                    <ListGroupItem header={getNumber(waiver.waiverNumber)}>
                        {"Created: " + new Date(waiver.createdAt).toLocaleString()}
                    </ListGroupItem>
                </LinkContainer>
            ) : (
                <LinkContainer key="new" to="/waivers/new">
                    <ListGroupItem>
                        <h4>
                            <b>{"\uFF0B"}</b> Submit New Waiver
                        </h4>
                    </ListGroupItem>
                </LinkContainer>
            )
        );
    }
    function renderLander() {
        return (
            <div className="lander">
                <h1>CMS State Plan Amendment and Waiver Submission Platform</h1>
                <p>Welcome to the official submission system for email-based state plan 
                    amendments (SPAs) and section 1915 waivers. After signing up for the 
                    system, you can fill out forms to send the SPA and/or waivers and 
                    attached documents to SPA@cms.hhs.gov. After you submit, you will 
                    receive an email confirmation that your submission was received, marking 
                    the start of the 90-day review process.</p>
                    <hr></hr>
                <h2>In this system, you can submit:</h2>
                <ul>
                    <li>Amendments to your Medicaid State Plans (not submitted through MACPro or MMDL)</li>
                    <li>Official state responses to formal Requests for Additional Information (RAIs) for SPAs (not submitted through MACPro)</li>
                    <li>Section 1915(b) waiver submissions (those not submitted through WMS)</li>
                    <li>All Cost Effectiveness spreadsheets associated with 1915(b) waivers</li>
                    <li>Section 1915(c) Appendix K amendments (which cannot be submitted through WMS)</li>
                    <li>Official state responses to formal Requests for Additional Information (RAIs) for Section 1915(b) waiver actions (in addition to submitting waiver changes in WMS, if applicable)</li>
                    <li>State requests for Temporary Extensions for section 1915(b) and 1915(c) waivers</li>
                </ul>
            </div>
        );
    }

    function renderInsides() {
        return (
            <div className="amendments">
                <PageHeader>Your SPA and Waiver Submissions</PageHeader>
                <ListGroup>
                    {!isLoading && renderAmendmentsList(amendments)}
                </ListGroup>
                <ListGroup>
                    {!isLoading && renderWaiversList(waivers)}
                </ListGroup>
            </div>
        );
    }

    return (
        <div className="Home">
            {isAuthenticated ? renderInsides() : renderLander()}
        </div>
    );
}
