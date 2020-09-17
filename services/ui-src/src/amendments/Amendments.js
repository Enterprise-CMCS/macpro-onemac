import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API } from "aws-amplify";
import { onError } from "../libs/errorLib";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import Select from 'react-select';
import Switch from "react-ios-switch";
import { territoryList } from '../libs/territoryLib';


export default function Amendments() {
    const { id } = useParams();
    const [amendment, setAmendment] = useState(null);
    const [transmittalNumber, setTransmittalNumber] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [territory, setTerritory] = useState("");
    const [urgent, setUrgent] = useState(false);
    const [comments, setComments] = useState("");
    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }

    useEffect(() => {
        function loadAmendment() {
            return API.get("amendments", `/amendments/${id}`);
        }

        async function onLoad() {
            try {
                const amendment = await loadAmendment();
                const { email, firstName, lastName, territory, transmittalNumber, urgent, comments } = amendment;
                setEmail(email);
                setFirstName(capitalize(firstName));
                setLastName(capitalize(lastName));
                setTerritory(territory);
                setTransmittalNumber(transmittalNumber);
                setUrgent(urgent);
                setComments(comments);
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
                        <ControlLabel>APS ID &nbsp;(Transmittal Number)</ControlLabel>
                        <FormControl
                            disabled={true}
                            value={transmittalNumber}
                        />
                    </FormGroup>
                    <FormGroup controlId="name">
                        <ControlLabel>Submitter</ControlLabel>
                        <FormControl
                            value={firstName + ' ' + lastName}
                            disabled={true}
                        />
                    </FormGroup>

                    <FormGroup controlId="email">
                        <ControlLabel>Submitter Email</ControlLabel>
                        <FormControl
                            value={email}
                            disabled={true}
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
                                    {upload.title}: <a href={upload.url} target="_blank">{upload.filename}</a> 
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
