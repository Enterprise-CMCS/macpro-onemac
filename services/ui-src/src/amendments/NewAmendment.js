import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { onError } from "../libs/errorLib";
import { API } from "aws-amplify";
import { Auth } from "aws-amplify"
import Select from 'react-select';
import Switch from 'react-ios-switch';
import { ROUTES } from "../Routes"
import { territoryList } from '../libs/territoryLib';
import FileUploader from '../components/FileUploader';
import { CHANGE_REQUEST_TYPES } from "../changeRequest/changeRequestTypes";

export default function NewAmendment() {
    const requiredUploads = ['CMS Form 179', 'SPA Pages'];
    const optionalUploads = ['Cover Letter', 'Existing state plan pages', 'Tribal Consultation', 'Public Notice', 'Standard Funding Questions (SFQs)', 'Other'];
    const history = useHistory();
    const [transmittalNumber, setTransmittalNumber] = useState("");
    const [territory, setTerritory] = useState("");
    const [urgent, setUrgent] = useState(false);
    const [comments, setComments] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // True when the required uploads have been set.
    const [areUploadsComplete, setAreUploadsReady] = useState(false);

    //Reference to the File Uploader.
    const uploader = useRef(null);

    function validateForm() {
        return transmittalNumber.length > 0 && territory.length > 0 && areUploadsComplete;
    }

    async function handleSubmit(event) {
        event.preventDefault();

        setIsLoading(true);

        var user = await Auth.currentUserInfo();
        let type = CHANGE_REQUEST_TYPES.AMENDMENT;

        try {
            let uploads = await uploader.current.uploadFiles();
            await createAmendment({ type, user, territory, transmittalNumber, urgent, comments, uploads });
            history.push(ROUTES.DASHBOARD);
        } catch (error) {
            onError("There was an error submitting your request.  Please try again.");
            setIsLoading(false);
        }
    }

    function createAmendment(amendment) {
        return API.post("changeRequestAPI", "/submit", {
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
                <FormGroup controlId="territory">
                    <ControlLabel>State/Territory<span className="required-mark">*</span></ControlLabel>
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
                    <ControlLabel>SPA ID<span className="required-mark">*</span></ControlLabel>
                    <FormControl
                        value={transmittalNumber}
                        placeholder='AA-20-####'
                        onChange={e => setTransmittalNumber(e.target.value)}
                    />
                </FormGroup>
                <FormGroup controlId="urgent">
                    <ControlLabel>This SPA is classified as urgent &nbsp;</ControlLabel>
                    <Switch controlId="urgent"
                        checked={urgent}
                        onChange={e => setUrgent(!urgent)}
                    />
                </FormGroup>
                <h3>Attachments</h3>
                <FileUploader ref={uploader} requiredUploads={requiredUploads} optionalUploads={optionalUploads} 
                    readyCallback={uploadsReadyCallbackFunction}></FileUploader>
                <br/>
                <FormGroup controlId="comments">
                    <ControlLabel>Summary</ControlLabel>
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
