import React, { useState, useEffect } from "react"
import { ListGroup, ListGroupItem } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import { API } from "aws-amplify"
import { useAppContext } from "../libs/contextLib"
import { onError } from "../libs/errorLib"
import "./Dashboard.scss"

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

    function loadAmendments() {
        return API.get("amendments", "/amendments")
    }
    function loadWaivers() {
        return API.get("waivers", "/waivers")
    }
    function getNumber(numberIn) {
        if (numberIn)
            return numberIn.trim().split("\n")[0]
        else 
            return "Number Undefined"
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
        )
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
