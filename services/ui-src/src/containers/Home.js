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
        return API.getWaiver("waiver", "/waiver");
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
    function renderWaiverList(waivers) {
        return [{}].concat(waivers).map((waiver, i) =>
            i !== 0 ? (
                <LinkContainer key={waiver.waiverId} to={`/waiver/${waiver.waiverId}`}>
                    <ListGroupItem header={waiver.waiverNumber.trim().split("\n")[0]}>
                        {"Created: " + new Date(waiver.createdAt).toLocaleString()}
                    </ListGroupItem>
                </LinkContainer>
            ) : (
                <LinkContainer key="new" to="/waiver/new">
                    <ListGroupItem>
                        <h4>
                            <b>{"\uFF0B"}</b> Submit New SPA Waiver
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

    function renderAmendments() {
        return (
            <div className="amendments">
                <PageHeader>Your APS Submissions</PageHeader>
                <ListGroup>
                    {!isLoading && renderAmendmentsList(amendments)}
                </ListGroup>
            </div>
        );
    }

    function renderWaivers() {
        return (
            <div className="waivers">
                <PageHeader>Your Waiver Submissions</PageHeader>
                <ListGroup>
                    {!isLoading && renderWaiverList(waivers)}
                </ListGroup>
            </div>
        );
    }

    return (
        <div className="Home">
            {isAuthenticated ? renderAmendments()+renderWaivers() : renderLander()}
        </div>
    );
}
