import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { onError } from "../libs/errorLib";
import { API } from "aws-amplify";
import Select from 'react-select';
import { territoryList } from '../libs/territoryLib';
import {actionTypeOptions, waiverAuthorityOptions} from '../libs/waiverLib.js';

export default function NewWaiver() {
    const history = useHistory();  // ?? do we need?

    const [waiverNumber, setWaiverNumber] = useState("");
    const [transmittalNumber, setTransmittalNumber] = useState("");
    const [territory, setTerritory] = useState("");
    const [summary, setSummary] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [actionType, setActionType] = useState("");
    const [waiverAuthority, setWaiverAuthority] = useState("");
 
    function validateForm() {
        return territory.length > 0 
         && actionType.length > 0 
         && waiverNumber.length > 0 
         && waiverAuthority.length > 0 ;
    }

    async function handleSubmit(event) {
        event.preventDefault();

        setIsLoading(true);

        try {    
            setTransmittalNumber(waiverNumber);
            await createWaiver({ transmittalNumber, waiverNumber, territory, actionType, waiverAuthority, summary });
            history.push("/");
        } catch (e) {
            onError(e);
            setIsLoading(false);
        }
    }

    function createWaiver(waiver) {
        return API.post("waivers", "/waivers", {
            body: waiver
        });
    }

    return (
        <div className="NewWaiver">
            <form onSubmit={handleSubmit}>
            <FormGroup controlId="territory">
                <ControlLabel>State/Territory</ControlLabel>
                <Select
                    name="form-field-name"
                    value={territoryList.filter(function(option) {
                        return option.value === territory;
                    })}
                    onChange={e => setTerritory(e.value)}
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
                    onChange={e => setActionType(e.value)}
                    options={actionTypeOptions}
                />
            </FormGroup>
            <FormGroup controlId="waiverNumber">
                <ControlLabel>Waiver Number</ControlLabel>
                <FormControl
                    value={waiverNumber}
                    onChange={e => setWaiverNumber(e.target.value)}
                />
            </FormGroup>
            <FormGroup controlId="waiverAuthority">
                <ControlLabel>Waiver Authority</ControlLabel>
                <Select
                    name="form-field-name"
                    value={waiverAuthorityOptions.filter(function(option) {
                        return option.value === waiverAuthority;
                    })}
                    onChange={e => setWaiverAuthority(e.value)}
                    options={waiverAuthorityOptions}
                />
            </FormGroup>
            <FormGroup controlId="summary">
                <ControlLabel>Summary</ControlLabel>
                <FormControl
                    componentClass="textarea"
                    value={summary}
                    onChange={e => setSummary(e.target.value)}
                />
            </FormGroup>
                <LoaderButton
                    block
                    type="submit"
                    bsSize="large"
                    bsStyle="primary"
                    isLoading={isLoading}
                    disabled={!validateForm()}
                >
                    Submit
                </LoaderButton>
            </form>
        </div>
    );
}
