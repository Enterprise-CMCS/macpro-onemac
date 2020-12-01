import React, { useRef, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import LoadingScreen from "../components/LoadingScreen";
import FileUploader from "../components/FileUploader";
import FileList from "../components/FileList";
import { TextField } from "@cmsgov/design-system";
import { CHANGE_REQUEST_TYPES } from "./changeRequestTypes";
import ChangeRequestDataApi from "../utils/ChangeRequestDataApi";
import { ROUTES } from "../Routes";
import { formatDate } from "../utils/date-utils";
import AlertBar from "../components/AlertBar";
import { ALERTS_MSG } from "../libs/alert-messages";
import PageTitleBar from "../components/PageTitleBar";
import { validateWaiverId } from "../utils/form-utils";

export default function WaiverExtension() {
    // The attachment list
    const requiredUploads = ["Waiver Extension Request"];
    const optionalUploads = [
        "Independent Assessment Reports",
        "Other"
    ];

    // The form field names
    const FIELD_NAMES = {
        TRANSMITTAL_NUMBER: "transmittalNumber",
        SUMMARY: "summary",
    };

    // True when the required attachments have been selected.
    const [areUploadsReady, setAreUploadsReady] = useState(false);

    // because the first time through, we do not want to be annoying with the error messaging
    const [firstTimeThrough, setFirstTimeThrough] = useState(true);

    // if the message string is set, then the error div should be shown for these items
    const [transmittalNumberErrorMessage, setTransmittalNumberErrorMessage] = useState("");
    const [attachmentsErrorMessage, setAttachmentsErrorMessage] = useState("");

    // True if we are currently submitting the form or on inital load of the form
    const [isLoading, setIsLoading] = useState(true);

    // True if the form is read only.
    const [isReadOnly, setReadOnly] = useState(false);

    // The browser history, so we can redirect to the home page
    const history = useHistory();

    //Reference to the File Uploader.
    const uploader = useRef(null);

    // Optional ID parameter from the URL
    const { id } = useParams();

    // The record we are using for the form.
    const [changeRequest, setChangeRequest] = useState({
        type: CHANGE_REQUEST_TYPES.WAIVER_EXTENSION,
        summary: "",
        transmittalNumber: "", //This is needed to be able to control the field
    });

    useEffect(() => {
        /**
         * Fetch the given ID
         */
        async function fetchChangeRequest() {
            if (!id) {
                throw new Error("ID not specified for fetchChangeRequest");
            }

            try {
                const changeRequest = await ChangeRequestDataApi.get(id);
                setChangeRequest(changeRequest);
            } catch (error) {
                console.log("Error while fetching submission.", error);
                setChangeRequest(null);
                AlertBar.alert(ALERTS_MSG.FETCH_ERROR);
            }

            setIsLoading(false);
        }

        // Trigger the fetch only if an ID is present.
        if (id) {
            PageTitleBar.setPageTitleInfo({
                heading: "Waiver Temporary Extension Details",
                text: ""
            });

            setReadOnly(true);
            fetchChangeRequest();
        } else {
            PageTitleBar.setPageTitleInfo({
                heading: "Request Waiver Temporary Extension",
                text: ""
            });

            setReadOnly(false);
            setIsLoading(false);
        }
    }, [id]);

    /**
     * Callback for the uploader to set if the upload requirements are met.
     * @param {Boolean} state true if the required uploads have been specified
     */
    function uploadsReadyCallbackFunction(state) {
        setAreUploadsReady(state);
    }

    /**
     * Handle changes to the form.
     * @param {Object} event the event
     */
    async function handleInputChange(event) {
        if (event && event.target) {
            let updatedRecord = { ...changeRequest }; // You need a new object to be able to update the state
            updatedRecord[event.target.name] = event.target.value;
            setChangeRequest(updatedRecord);

            if (!firstTimeThrough) {
                if (!areUploadsReady) setAttachmentsErrorMessage("Required Attachments Missing");
                else setAttachmentsErrorMessage("");
            }
            if (event.target.name === 'transmittalNumber') {
                setTransmittalNumberErrorMessage(validateWaiverId(updatedRecord.transmittalNumber));
            }

        }
    }

    /**
     * Submit the new change request.
     * @param {Object} event the click event
     */
    async function handleSubmit(event) {
        event.preventDefault();

        // so the old alert goes away
        AlertBar.dismiss();

        setIsLoading(true);

        // once Submit is clicked, show error messages
        setFirstTimeThrough(false);

        // validate the form fields and set the messages
        // because this is an asynchronous function, you can't trust that the 
        // state functions will be processed in time to use the variables
        let transmittalNumberMessage = "";

        transmittalNumberMessage = validateWaiverId(changeRequest.transmittalNumber);

        // check which alert to show.  Fields first, than attachments
        // if all passes, submit the form and return to dashboard
        if (transmittalNumberMessage) {
            AlertBar.alert(ALERTS_MSG.SUBMISSION_INCOMPLETE);
        } else if (!areUploadsReady) {
            AlertBar.alert(ALERTS_MSG.REQUIRED_UPLOADS_MISSING);
        } else {

            try {
                let uploadedList = await uploader.current.uploadFiles();
                await ChangeRequestDataApi.submit(changeRequest, uploadedList);
                history.push(ROUTES.DASHBOARD);
                //Alert must come last or it will be cleared after the history push.
                AlertBar.alert(ALERTS_MSG.SUBMISSION_SUCCESS);
            } catch (error) {
                console.log("There was an error submitting a request.", error);
                AlertBar.alert(ALERTS_MSG.SUBMISSION_ERROR);
                setIsLoading(false);
            }
        }

        // now set the state variables to show the error messages
        setTransmittalNumberErrorMessage(transmittalNumberMessage);
        if (!areUploadsReady) setAttachmentsErrorMessage("Required Attachments Missing");

        window.scrollTo(0, 0);
        setIsLoading(false);
    }

    // Render the component conditionally when NOT in read only mode
    // OR in read only mode when change request data was successfully retrieved
    return (
        <LoadingScreen isLoading={isLoading}>
            {!isReadOnly || (isReadOnly && changeRequest !== null) ? (
                <div className="form-container">
                    <form
                        onSubmit={handleSubmit}
                        noValidate
                        className={!firstTimeThrough ? "display-errors" : ""}
                    >
                        <h3>Request Temporary Extension</h3>
                        <p className="req-message">
                            <span className="required-mark">*</span>
                                    indicates required field.
                                </p>
                        <div className="form-card">
                            <div className="label-container">
                                <div className="label-lcol">
                                    <label htmlFor={FIELD_NAMES.TRANSMITTAL_NUMBER}>
                                        Waiver Number
                                                <span className="required-mark">*</span>
                                    </label>
                                </div>
                                <div className="label-rcol">
                                    <HashLink to={ROUTES.FAQ_WAIVER_ID}>What is my Waiver Number?</HashLink>
                                </div>
                            </div>
                            {!isReadOnly &&
                                <p className="field-hint">
                                    Enter the Waiver number for this Temporary Extension Request
                                    </p>
                            }
                            {transmittalNumberErrorMessage && (
                                <div id="waiverTransmittalNumberErrorMsg"
                                    className="ds-u-color--error">{transmittalNumberErrorMessage}</div>
                            )}
                            <input
                                className="field"
                                type="text"
                                required={!isReadOnly}
                                id={FIELD_NAMES.TRANSMITTAL_NUMBER}
                                name={FIELD_NAMES.TRANSMITTAL_NUMBER}
                                onChange={handleInputChange}
                                disabled={isReadOnly}
                                value={changeRequest.transmittalNumber}
                            ></input>
                            {isReadOnly && (
                                <div>
                                    <br />
                                    <label htmlFor="submittedAt">Submitted on</label>
                                    <input
                                        className="field"
                                        type="text"
                                        id="submittedAt"
                                        name="submittedAt"
                                        disabled
                                        value={formatDate(changeRequest.submittedAt)}
                                    ></input>
                                </div>
                            )}
                        </div>
                        <h3>Attachments</h3>
                        <p className="req-message">Maximum file size of 50MB.</p>
                        <p className="req-message">
                            <span className="required-mark">*</span>
                                    indicates required attachment.
                                </p>
                        {attachmentsErrorMessage && !areUploadsReady && (
                            <div id="spaUploadsErrorMsg"
                                className="ds-u-color--error">{attachmentsErrorMessage}</div>
                        )}
                        <div className="upload-card">
                            {isReadOnly ? (
                                <FileList uploadList={changeRequest.uploads}></FileList>
                            ) : (
                                    <FileUploader
                                        ref={uploader}
                                        requiredUploads={requiredUploads}
                                        optionalUploads={optionalUploads}
                                        readyCallback={uploadsReadyCallbackFunction}
                                    ></FileUploader>
                                )}
                        </div>
                        <div className="summary-box">
                            <TextField
                                name={FIELD_NAMES.SUMMARY}
                                label="Summary"
                                fieldClassName="summary-field"
                                multiline
                                onChange={handleInputChange}
                                disabled={isReadOnly}
                                value={changeRequest.summary}
                            ></TextField>
                        </div>
                        {!isReadOnly && (
                            <input
                                type="submit"
                                className="form-submit"
                                value="Submit"
                            />
                        )}
                    </form>
                </div>
            ) : null
            }
        </LoadingScreen >
    );
}
