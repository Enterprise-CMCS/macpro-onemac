import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { onError } from "../libs/errorLib";
import { API, Auth } from "aws-amplify";
import Select from 'react-select';
import { ROUTES } from "../Routes"
import { territoryList } from '../libs/territoryLib';
import {actionTypeOptions, waiverAuthorityOptions, requiredUploads, optionalUploads} from '../libs/waiverLib.js';
import FileUploader from '../common/FileUploader';

export default function NewWaiver() {
    const history = useHistory()

    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [waiverNumber, setWaiverNumber] = useState("");
    const [transmittalNumber, setTransmittalNumber] = useState("");
    const [territory, setTerritory] = useState("");
    const [summary, setSummary] = useState("");
    const [actionType, setActionType] = useState("");
    const [waiverAuthority, setWaiverAuthority] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // True when the required uploads have been set.
    const [areUploadsComplete, setAreUploadsReady] = useState(false);

    //Reference to the File Uploader.
    const uploader = useRef(null);

    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }

    async function populateUserInfo() {
        var userInfo = await Auth.currentUserInfo();
        setEmail(userInfo.attributes.email);
        setFirstName(capitalize(userInfo.attributes.given_name));
        setLastName(capitalize(userInfo.attributes.family_name));
        return userInfo.attributes.email;
    }

    populateUserInfo();
 
    function validateForm() {
        return territory.length > 0 
         && actionType.length > 0 
         && waiverNumber.length > 0 
         && waiverAuthority.length > 0 
         && areUploadsComplete;
    }

    async function handleSubmit(event) {
        event.preventDefault();

        setIsLoading(true);

        try {    
            let uploads = await uploader.current.uploadFiles();
            setTransmittalNumber(waiverNumber);
            await createWaiver({ email, firstName, lastName, transmittalNumber, waiverNumber, territory, actionType, waiverAuthority, summary, uploads });
            history.push(ROUTES.DASHBOARD)
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

    /**
     * Callback for the uploader to set if the upload requirements are met.
     * @param {Boolean} state true if the required uploads have been specified
     */
    function uploadsReadyCallbackFunction(state) {
        setAreUploadsReady(state);
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
            <FormGroup controlId="waiverNumber">
                <ControlLabel>Waiver Number</ControlLabel>
                <FormControl
                    value={waiverNumber}
                    placeholder="AA.####.R##.##"
                    onChange={e => setWaiverNumber(e.target.value)}
                />
            </FormGroup>
            <h3>Attachments</h3>
                <FileUploader ref={uploader} requiredUploads={requiredUploads} optionalUploads={optionalUploads} 
                    readyCallback={uploadsReadyCallbackFunction}></FileUploader>
                <br/>
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
