import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { onError } from "../libs/errorLib";
import config from "../config";
import "./NewAmendment.css";
import { API } from "aws-amplify";
import * as s3Uploader from "../libs/s3Uploader";
import { Auth } from "aws-amplify"
import Select from 'react-select';
import Switch from 'react-ios-switch';
import { territoryList } from '../libs/territoryLib';
import FileUploader from '../components/FileUploader';

export default function NewAmendment() {
    const requiredUploads = ['One type', 'Another type'];
    const optionalUploads = ['some other type', 'And another type'];
    const file = useRef(null);
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [transmittalNumber, setTransmittalNumber] = useState("");
    const [territory, setTerritory] = useState("");
    const [urgent, setUrgent] = useState(false);
    const [comments, setComments] = useState("");
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
        return email.length > 0 && firstName.length > 0 && lastName.length > 0
          && transmittalNumber.length > 0 && territory.length > 0 && areUploadsComplete;
    }

    function handleFileChange(event) {
        file.current = event.target.files[0];
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
            alert(
                `Please pick a file smaller than ${
                    config.MAX_ATTACHMENT_SIZE / 1000000
                } MB.`
            );
            return;
        }

        setIsLoading(true);

        uploader.current.uploadFiles();

        try {
            const attachment = file.current ? await s3Uploader.uploadFile(file.current) : null;
            await createAmendment({ email, firstName, lastName, territory, transmittalNumber, urgent, comments, attachment });
            history.push("/");
        } catch (e) {
            onError(e);
            setIsLoading(false);
        }
    }

    function createAmendment(amendment) {
        return API.post("amendments", "/amendments", {
            body: amendment
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
        <div className="NewAmendment">
            <form onSubmit={handleSubmit}>
                <h3>SPA Details</h3>
                <FormGroup controlId="email">
                    <ControlLabel>Contact Email</ControlLabel>
                    <FormControl
                        value={email}
                        disabled={true}
                        onChange={e => setEmail(e.target.value)}
                    />
                </FormGroup>
                <FormGroup controlId="firstName">
                    <ControlLabel>First Name</ControlLabel>
                    <FormControl
                        value={firstName}
                        disabled={true}
                        onChange={e => setFirstName(e.target.value)}
                    />
                </FormGroup>
                <FormGroup controlId="lastName">
                    <ControlLabel>Last Name</ControlLabel>
                    <FormControl
                        value={lastName}
                        disabled={true}
                        onChange={e => setLastName(e.target.value)}
                    />
                </FormGroup>
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
                <FormGroup controlId="transmittalNumber">
                    <ControlLabel>SPA ID</ControlLabel>
                    <FormControl
                        value={transmittalNumber}
                        placeholder='Sample: NY-20-0053'
                        onChange={e => setTransmittalNumber(e.target.value)}
                    />
                </FormGroup>
                <FormGroup controlId="urgent">
                    <ControlLabel>This APS is classified as urgent &nbsp;</ControlLabel>
                    <Switch controlId="urgent"
                        checked={urgent}
                        onChange={e => setUrgent(!urgent)}
                    />
                </FormGroup>
                <FileUploader ref={uploader} requiredUploads={requiredUploads} optionalUploads={optionalUploads} 
                    completedCallback={uploadsReadyCallbackFunction}></FileUploader>
                <FormGroup controlId="file">
                    <ControlLabel>Attachment</ControlLabel>
                    <FormControl onChange={handleFileChange} type="file" />
                </FormGroup>
                <h3>Summary</h3>
                <FormGroup controlId="comments">
                    <FormControl
                        componentClass="textarea"
                        placeholder="Additional comments here"
                        value={comments}
                        onChange={e => setComments(e.target.value)}
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
