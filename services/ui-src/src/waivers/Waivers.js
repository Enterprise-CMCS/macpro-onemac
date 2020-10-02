import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API } from "aws-amplify";
import { onError } from "../libs/errorLib";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import Select from 'react-select';
import { territoryList } from '../libs/territoryLib';
import { actionTypeOptions, waiverAuthorityOptions } from '../libs/waiverLib';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { Storage } from "aws-amplify";

export default function Waivers() {
    const { id } = useParams();
    const [waiver, setWaiver] = useState(null);
    const [territory, setTerritory] = useState("");
    const [actionType, setActionType] = useState("");
    const [waiverNumber, setWaiverNumber] = useState("");
    const [waiverAuthority, setWaiverAuthority] = useState("");
    const [summary, setSummary] = useState("");

    useEffect(() => {
        function loadWaiver() {
            return API.get("waivers", `/waivers/${id}`);
        }

        async function onLoad() {
            try {
                const waiver = await loadWaiver();
                const { waiverNumber, territory, actionType, waiverAuthority, summary } = waiver;
                setTerritory(territory);
                setActionType(actionType);
                setWaiverNumber(waiverNumber);
                setWaiverAuthority(waiverAuthority);
                setSummary(summary);

                // Get temporary URLs to the S3 bucket
                if(waiver.uploads) {
                    let i;
                    // Use a for loop instead of forEach to stay in the context of this async function.
                    for (i = 0; i < waiver.uploads.length; i++) {
                        waiver.uploads[i].url = await Storage.vault.get(waiver.uploads[i].s3Key);
                    }
                }
                setWaiver(waiver);
            } catch (e) {
                onError(e);
            }
        }

        onLoad();
    }, [id]);

    return (
        <div className="Waiver">
            {waiver && (
                <form>
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
                    <FormGroup controlId="actionType">
                        <ControlLabel>Action Type</ControlLabel>
                        <Select
                            name="form-field-name"
                            value={actionTypeOptions.filter(function(option) {
                                return option.value === actionType;
                            })}
                            isDisabled={true}
                            options={actionTypeOptions}
                        />
                    </FormGroup>
                    <FormGroup controlId="actionType">
                        <ControlLabel>Waiver Authority</ControlLabel>
                        <Select
                            name="form-field-name"
                            value={waiverAuthorityOptions.filter(function(option) {
                                return option.value === waiverAuthority;
                            })}
                            isDisabled={true}
                            options={waiverAuthorityOptions}
                        />
                    </FormGroup>
                    <FormGroup controlId="waiverNumber">
                        <ControlLabel>Waiver Number</ControlLabel>
                        <FormControl
                            disabled={true}
                            value={waiverNumber}
                        />
                    </FormGroup>
                    <h3>Attachments</h3>
                    <div>
                        {waiver.uploads && (
                            <div>
                            {waiver.uploads.map((upload, index) => (
                                <div key={index}>
                                    {upload.title}: <a href={upload.url} target="_blank" rel="noopener noreferrer">{upload.filename}</a> <FontAwesomeIcon icon={faExternalLinkAlt} />
                                </div>
                            ))}
                            </div>
                        )}
                    </div>
                    <br/>
                    <FormGroup controlId="summary">
                        <ControlLabel>Summary</ControlLabel>
                        <FormControl
                            componentClass="textarea"
                            value={summary}
                            disabled={true}
                        />
                    </FormGroup>

                </form>
            )}
        </div>
    );
}
