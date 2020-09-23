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

    function renderAmendmentsList(amendments) {
        return [{}].concat(amendments).map((amendment, i) =>
            i !== 0 ? (
                <LinkContainer key={amendment.amendmentId} to={`/amendments/${amendment.amendmentId}`}>
                    <ListGroupItem header={amendment.transmittalNumber.trim().split("\n")[0]}>
                        {"Created: " + new Date(amendment.createdAt).toLocaleString()}
                    </ListGroupItem>
                </LinkContainer>
            ) : (
                <LinkContainer key="new" to="/amendments/new">
                    <ListGroupItem>
                        <h4>
                            <b>{"\uFF0B"}</b> Submit New APS
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
                    <ListGroupItem header={waiver.waiverNumber.trim().split("\n")[0]}>
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
                <h1>APS Submission Application</h1>
                <p>ACME's Amendment to Planned Settlement (APS) submission application</p>
            </div>
        );
    }

    function renderInsides() {
        return (
            <div className="amendments">
                <PageHeader>Your APS Submissions</PageHeader>
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
