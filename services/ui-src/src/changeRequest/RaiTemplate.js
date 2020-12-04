import React, { useRef, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import LoadingScreen from "../components/LoadingScreen";
import FileUploader from "../components/FileUploader";
import FileList from "../components/FileList";
import { TextField } from "@cmsgov/design-system";
import ChangeRequestDataApi from "../utils/ChangeRequestDataApi";
import { ROUTES } from "../Routes";
import PropTypes from "prop-types";
import AlertBar from "../components/AlertBar";
import { ALERTS_MSG } from "../libs/alert-messages";
import { formatDate } from "../utils/date-utils";
import PageTitleBar from "../components/PageTitleBar";
import { CHANGE_REQUEST_TYPES } from "./changeRequestTypes";
import { validateSpaId, validateWaiverId } from "../utils/form-utils";

/**
 * RAI Form template to allow rendering for different types of RAI's.
 * @param {String} changeRequestType - functional name for the type of change request
 * @param {Array} optionalUploads - list of attachment that are optional
 * @param {Array} requiredUploads - list of attachments that are required
 * @param {String} raiType - display name for the type of change request
 */
export default function RaiTemplate({
    changeRequestType,
    optionalUploads,
    requiredUploads,
    raiType,
    transmittalNumberLabel,
    transmittalNumberHint,
    FAQLink,
}) {
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
        type: changeRequestType,
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
            PageTitleBar.setPageTitleInfo({ heading: raiType + " RAI Reponse Details", text: "" });

            setReadOnly(true);
            fetchChangeRequest();
        } else {
            PageTitleBar.setPageTitleInfo({ heading: "Respond to " + raiType + " RAI", text: "" });

            setReadOnly(false);
            setIsLoading(false);
        }
    }, [id, raiType]);

    /**
     * Callback for the uploader to set if the upload requirements are met.
     * @param {Boolean} state true if the required uploads have been specified
     */
    function uploadsReadyCallbackFunction(state) {
        setAreUploadsReady(state);
    }

    /**
     * Validate Transmittal Number Format
     * @param {value} Transmittal Number Field Entered on Change Event.
     * @return the validation error message or undefined
     */
    function validateTransmittalNumber(value) {
        let errorMessage

        if (changeRequestType === CHANGE_REQUEST_TYPES.SPA_RAI) {
            errorMessage = validateSpaId(value)
        } else if (changeRequestType === CHANGE_REQUEST_TYPES.WAIVER_RAI) {
            errorMessage = validateWaiverId(value)
        } else {
            throw new Error(`Unable to validate invalid type ${changeRequestType}.`)
        }

        return errorMessage;
    };


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
                setTransmittalNumberErrorMessage(validateTransmittalNumber(updatedRecord.transmittalNumber));
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

        // in case form validation takes a while (external validation)
        setIsLoading(true);

        // once Submit is clicked, show error messages
        setFirstTimeThrough(false);

        // validate the form fields and set the messages
        // because this is an asynchronous function, you can't trust that the 
        // state functions will be processed in time to use the variables
        let transmittalNumberMessage = "";
        transmittalNumberMessage = validateTransmittalNumber(changeRequest.transmittalNumber);

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
                AlertBar.alert(ALERTS_MSG.SUBMISSION_ERROR);
                setIsLoading(false);
            }
        }

        // now set the state variables to show thw error messages
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
                        <h3>{raiType} RAI Details</h3>
                        <p className="req-message">
                            <span className="required-mark">*</span>
                                    indicates required field.
                                </p>
                        <div className="form-card">
                            <div className="label-container">
                                <div className="label-lcol">
                                    <label htmlFor={FIELD_NAMES.TRANSMITTAL_NUMBER}>
                                        {transmittalNumberLabel}
                                                <span className="required-mark">*</span>
                                    </label>
                                </div>
                                <div className="label-rcol">
                                    <HashLink to={FAQLink}>What is my {transmittalNumberLabel}?</HashLink>
                                </div>
                            </div>
                            {!isReadOnly && (
                                <p className="field-hint">
                                    {transmittalNumberHint}
                                </p>
                            )}
                            {transmittalNumberErrorMessage && (
                                <div id="spaTransmittalNumberErrorMsg"
                                    className="ds-u-color--error">{transmittalNumberErrorMessage}</div>
                            )}
                            <input
                                className="field"
                                type="text"
                                id={FIELD_NAMES.TRANSMITTAL_NUMBER}
                                name={FIELD_NAMES.TRANSMITTAL_NUMBER}
                                onChange={handleInputChange}
                                disabled={isReadOnly}
                                value={changeRequest.transmittalNumber}
                                required
                            ></input>
                            {isReadOnly && (
                                <div>
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

RaiTemplate.propTypes = {
    changeRequestType: PropTypes.string.isRequired,
    optionalUploads: PropTypes.arrayOf(PropTypes.string).isRequired,
    requiredUploads: PropTypes.arrayOf(PropTypes.string).isRequired,
    raiType: PropTypes.oneOf(["SPA", "Waiver"]).isRequired,
};
