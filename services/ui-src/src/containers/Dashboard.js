import React, { useState, useEffect } from "react"
import { ListGroup, ListGroupItem } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import { API } from "aws-amplify"

import { ROUTES } from "../Routes"
import { useAppContext } from "../libs/contextLib"
import { onError } from "../libs/errorLib"
import "./Dashboard.scss"

/**
 * Returns a Dashboard component
 * @constructor
 */
export default function Dashboard() {
    const [amendments, setAmendments] = useState([])
    const [waivers, setWaivers] = useState([])
    const { isAuthenticated } = useAppContext()
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        async function onLoad() {
            if (!isAuthenticated) {
                return
            }

            try {
                const amendments = await loadAmendments()
                setAmendments(amendments)
                const waivers = await loadWaivers()
                setWaivers(waivers)
            } catch (e) {
                onError(e)
            }

            setIsLoading(false)
        }

        onLoad()
    }, [isAuthenticated])

    /**
     * Returns amendments data from api call
     */
    function loadAmendments() {
        return API.get("amendments", "/amendments")
    }

    /**
     * Returns waivers data from api call
     */
    function loadWaivers() {
        return API.get("waivers", "/waivers")
    }

    /**
     * Returns parsed out information from string or returns error string
     * @param {string} numberIn - list of amendments objects
     */
    function getNumber(numberIn) {
        if (numberIn)
            return numberIn.trim().split("\n")[0]
        else 
            return "Number Undefined"
    }

    /**
     * Renders either a list of amendments submitted by user or an option to submit a new one
     * @param {Array} amendments - list of amendments objects
     */
    function renderAmendmentsList(amendments) {
        return [{}].concat(amendments).map((amendment, i) =>
            i !== 0 ? (
                <LinkContainer key={amendment.amendmentId} to={`${ROUTES.AMENDMENTS}/${amendment.amendmentId}`}>
                    <ListGroupItem header={getNumber(amendment.transmittalNumber)}>
                        {"Created: " + new Date(amendment.createdAt).toLocaleString()}
                    </ListGroupItem>
                </LinkContainer>
            ) : (
                <LinkContainer key="new" to={`${ROUTES.AMENDMENTS}/new`}>
                    <ListGroupItem>
                        <h4>
                            <b>{"\uFF0B"}</b> Submit New SPA
                        </h4>
                    </ListGroupItem>
                </LinkContainer>
            )
        )
    }

    /**
     * Renders either a list of waivers submitted by user or an option to submit a new one
     * @param {Array} waivers - list of waivers objects
     */
    function renderWaiversList(waivers) {
        return [{}].concat(waivers).map((waiver, i) =>
            i !== 0 ? (
                <LinkContainer key={waiver.amendmentId} to={`${ROUTES.WAIVERS}/${waiver.amendmentId}`}>
                    <ListGroupItem header={getNumber(waiver.waiverNumber)}>
                        {"Created: " + new Date(waiver.createdAt).toLocaleString()}
                    </ListGroupItem>
                </LinkContainer>
            ) : (
                <LinkContainer key="new" to={`${ROUTES.WAIVERS}/new`}>
                    <ListGroupItem>
                        <h4>
                            <b>{"\uFF0B"}</b> Submit New Waiver
                        </h4>
                    </ListGroupItem>
                </LinkContainer>
            )
        )
    }

    return (
        <div className="submissions">
            <h1>Your SPA and Waiver Submissions</h1>
            <ListGroup>
                {!isLoading && renderAmendmentsList(amendments)}
            </ListGroup>
            <ListGroup>
                {!isLoading && renderWaiversList(waivers)}
            </ListGroup>
        </div>
    )
}
