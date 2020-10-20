import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API } from "aws-amplify";
import { onError } from "../libs/errorLib";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import Select from 'react-select';
import Switch from "react-ios-switch";
import { territoryList } from '../libs/territoryLib';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { Storage } from "aws-amplify";


export default function Amendments() {
    const { id } = useParams();
    const [amendment, setAmendment] = useState(null);
    const [transmittalNumber, setTransmittalNumber] = useState("");
    const [territory, setTerritory] = useState("");
    const [urgent, setUrgent] = useState(false);
    const [comments, setComments] = useState("");

    useEffect(() => {
        function loadAmendment() {
            return API.get("changeRequestAPI", `/amendments/${id}`);
        }

        async function onLoad() {
            try {
                const amendment = await loadAmendment();
                const { territory, transmittalNumber, urgent, comments } = amendment;
                setTerritory(territory);
                setTransmittalNumber(transmittalNumber);
                setUrgent(urgent);
                setComments(comments);

                // Get temporary URLs to the S3 bucket
                if(amendment.uploads) {
                    let i;
                    // Use a for loop instead of forEach to stay in the context of this async function.
                    for (i = 0; i < amendment.uploads.length; i++) {
                        amendment.uploads[i].url = await Storage.vault.get(amendment.uploads[i].s3Key, { level: "protected" });
                    }
                }
                setAmendment(amendment);
            } catch (e) {
                onError(e);
            }
        }

        onLoad();
    }, [id]);

    return (
        <div className="Amendments">
            {amendment && (
                <form>
                    <h3>SPA Details</h3>
                    <FormGroup controlId="transmittalNumber">
                        <ControlLabel>SPA ID &nbsp;(Transmittal Number)</ControlLabel>
                        <FormControl
                            disabled={true}
                            value={transmittalNumber}
                        />
                    </FormGroup>
                    <FormGroup controlId="territory">
                        <ControlLabel>State/Territory</ControlLabel>
                        <Select
                            name="form-field-name"
                            value={territoryList.filter(function(option) {
                                return option.value === territory;
                            })}
                            isDisabled={true}
                            options={territoryList}
                        />
                    </FormGroup>
                    <FormGroup controlId="urgent">
                        <ControlLabel>This amendment is classified as urgent &nbsp;</ControlLabel>
                        <Switch controlId="urgent"
                                checked={urgent}
                                disabled={true}
                        />
                    </FormGroup>
                    <h3>Attachments</h3>
                    <div>
                        {amendment.uploads && (
                            <div>
                            {amendment.uploads.map((upload, index) => (
                                <div key={index}>
                                    {upload.title}: <a href={upload.url} target="_blank" rel="noopener noreferrer">{upload.filename}</a> <FontAwesomeIcon icon={faExternalLinkAlt} />
                                </div>
                            ))}
                            </div>
                        )}
                    </div>
                    <br/>
                    <FormGroup controlId="comments">
                        <ControlLabel>Summary</ControlLabel>
                        <FormControl
                            componentClass="textarea"
                            value={comments}
                            disabled={true}
                        />
                    </FormGroup>
                    
                </form>
            )}
        </div>
    );
}
