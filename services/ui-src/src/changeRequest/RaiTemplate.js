import React, {useRef, useState, useEffect} from "react";
import {useParams, useHistory} from "react-router-dom";
import {HashLink} from 'react-router-hash-link';
import LoaderButton from "../components/LoaderButton";
import LoadingScreen from "../components/LoadingScreen";
import FileUploader from "../components/FileUploader";
import FileList from "../components/FileList";
import {TextField} from "@cmsgov/design-system";
import ChangeRequestDataApi from "../utils/ChangeRequestDataApi";
import {ROUTES} from "../Routes";
import PropTypes from "prop-types";
import AlertBar from "../components/AlertBar";
import {ALERTS_MSG} from "../libs/alert-messages";
import {formatDate} from "../utils/date-utils";
import PageTitleBar from "../components/PageTitleBar";
import {Formik, Form, Field} from 'formik';
import {CHANGE_REQUEST_TYPES} from "./changeRequestTypes";
import {validateSpaId, validateWavierId} from "../utils/form-utils";

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
                                    }) {
    // The form field names
    const FIELD_NAMES = {
        TRANSMITTAL_NUMBER: "transmittalNumber",
        SUMMARY: "summary",
    };

    // True when the required attachments have been selected.
    const [areUploadsReady, setAreUploadsReady] = useState(false);
    const [isFormReady, setIsFormReady] = useState(false);
    const [hasValidTransmittalNumber, setValidTransmittalNumber] = useState(false);

    // True if we are currently submitting the form or on inital load of the form
    const [isLoading, setIsLoading] = useState(true);

    // True if the form is read only.
    const [isReadOnly, setReadOnly] = useState(false);

    // The browser history, so we can redirect to the home page
    const history = useHistory();

    //Reference to the File Uploader.
    const uploader = useRef(null);

    // Optional ID parameter from the URL
    const {id} = useParams();

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
            setReadOnly(true);
            fetchChangeRequest();
            PageTitleBar.setPageTitleInfo({heading: raiType + " RAI Reponse Details", text: ""});
        } else {
            setReadOnly(false);
            PageTitleBar.setPageTitleInfo({heading: "Respond to " + raiType + " RAI", text: ""});
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
     * Creates the FAQ link for the correct RAI type ID
     */
    function RAIFAQLink() {
        return "/FAQ#" + raiType.toLowerCase() + "-id-format";
    }

    /**
     * Validate Transmittal Number Format
     * @param {value} Transmittal Number Field Entered on Change Event.
     */
    function validateTransmittalNumber(value) {
        let errorMessage
        let updatedRecord = {...changeRequest}
        changeRequest.transmittalNumber = value

        if (changeRequestType === CHANGE_REQUEST_TYPES.SPA_RAI) {
            errorMessage = validateSpaId(value)
            if (errorMessage === undefined) {
                updatedRecord[FIELD_NAMES.TRANSMITTAL_NUMBER] = value
                setValidTransmittalNumber(true)
            }

        } else if (changeRequestType === CHANGE_REQUEST_TYPES.WAIVER_RAI) {
            let updatedRecord = {...changeRequest}
            changeRequest.transmittalNumber = value
            errorMessage = validateWavierId(value)
            if (errorMessage === undefined) {
                updatedRecord[FIELD_NAMES.TRANSMITTAL_NUMBER] = value
                setValidTransmittalNumber(true)
            }
        }
        return errorMessage;
    };


    /**
     * Handle changes to the form.
     * @param {Object} event the event
     */
    async function handleInputChange(event) {
        if (event && event.target) {
            let updatedRecord = {...changeRequest}; // You need a new object to be able to update the state
            updatedRecord[event.target.name] = event.target.value;
            setChangeRequest(updatedRecord);

            // Check to see if the required fields are provided
            setIsFormReady(hasValidTransmittalNumber);
        }
    }

    /**
     * Submit the new change request.
     * @param {Object} event the click event
     */
    async function handleSubmit(event) {
        event.preventDefault();

        setIsLoading(true);

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

    // Render the component conditionally when NOT in read only mode
    // OR in read only mode when change request data was successfully retrieved
    return (
        <LoadingScreen isLoading={isLoading}>
            {!isReadOnly || (isReadOnly && changeRequest !== null) ? (
                <div className="form-container">
                    <Formik
                        initialValues={{transmittalNumber: ''}}
                    >
                        {({errors}) => (
                            <Form onSubmit={handleSubmit}>
                                <h3>{raiType} RAI Details</h3>
                                <p className="req-message">
                                    <span className="required-mark">*</span>
                                    indicates required field.
                                </p>
                                <div className="form-card">
                                    <div className="label-container">
                                        <div className="label-lcol">
                                            <label htmlFor={FIELD_NAMES.TRANSMITTAL_NUMBER}>
                                                {raiType} ID
                                                <span className="required-mark">*</span>
                                            </label>
                                        </div>
                                        <div className="label-rcol">
                                            <HashLink to={RAIFAQLink()}>What is my {raiType} ID?</HashLink>
                                        </div>
                                    </div>
                                    {!isReadOnly && (
                                        <p className="field-hint">
                                            Enter the transmittal number for this RAI
                                        </p>
                                    )}
                                    {errors.transmittalNumber && (
                                        <div id="raiTransmittalNumError" class="ds-u-color--error">{errors.transmittalNumber}</div>
                                    )}
                                    <Field
                                        className="field"
                                        type="text"
                                        id={FIELD_NAMES.TRANSMITTAL_NUMBER}
                                        name={FIELD_NAMES.TRANSMITTAL_NUMBER}
                                        validate={validateTransmittalNumber}
                                        disabled={isReadOnly}
                                        value={changeRequest.transmittalNumber}
                                    ></Field>
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
                                    <LoaderButton
                                        type="submit"
                                        bsSize="large"
                                        bsStyle="primary"
                                        isLoading={isLoading}
                                        disabled={!isFormReady || !areUploadsReady}
                                    >
                                        Submit
                                    </LoaderButton>
                                )}
                            </Form>)}
                    </Formik>
                </div>
            ) : null}
        </LoadingScreen>
    );
}

RaiTemplate.propTypes = {
    changeRequestType: PropTypes.string.isRequired,
    optionalUploads: PropTypes.arrayOf(PropTypes.string).isRequired,
    requiredUploads: PropTypes.arrayOf(PropTypes.string).isRequired,
    raiType: PropTypes.oneOf(["SPA", "Waiver"]).isRequired,
};
