import React, {useRef, useState, useEffect} from "react";
import {useParams, useHistory} from "react-router-dom";
import {HashLink} from 'react-router-hash-link';
import LoaderButton from "../components/LoaderButton";
import LoadingScreen from "../components/LoadingScreen";
import FileUploader from "../components/FileUploader";
import FileList from "../components/FileList";
import {TextField} from "@cmsgov/design-system";
import {CHANGE_REQUEST_TYPES} from "./changeRequestTypes";
import ChangeRequestDataApi from "../utils/ChangeRequestDataApi";
import {ROUTES} from "../Routes";
import {territoryList} from "../libs/territoryLib";
import {formatDate} from "../utils/date-utils";
import AlertBar from "../components/AlertBar";
import {ALERTS_MSG} from "../libs/alert-messages";
import PageTitleBar from "../components/PageTitleBar";
import {Formik, Form, Field} from 'formik';
import {validateWavierId} from "../utils/form-utils";

export default function Waiver() {
    // The attachment list
    const requiredUploads = ["Required Upload (per Waiver Authority)"];
    const optionalUploads = [
        "1915(b)(4) waiver application",
        "Cost effectiveness spreadsheets",
        "Tribal Consultation",
        "1915(c) Appendix K amendment waiver template",
        "1915(b) waiver",
        "Other",
    ];
    const actionTypeOptions = [
        {label: "New waiver", value: "new"},
        {label: "Waiver amendment", value: "amendment"},
        {
            label: "Request for waiver renewal",
            value: "renewal",
        },
    ];
    const waiverAuthorityOptions = [
        {
            label: "1915(b)(4) FFS Selective Contracting waivers",
            value: "1915(b)(4)",
        },
        {label: "All other 1915(b) Waivers", value: "1915(b)"},
        {label: "1915(c) Appendix K waiver", value: "1915(c)"},
    ];

    // The form field names
    const FIELD_NAMES = {
        TRANSMITTAL_NUMBER: "transmittalNumber",
        TERRITORY: "territory",
        ACTION_TYPE: "actionType",
        WAIVER_AUTHORITY: "waiverAuthority",
        SUMMARY: "summary",
        STATE_CODE: "state_code",
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
        type: CHANGE_REQUEST_TYPES.WAIVER,
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

            PageTitleBar.setPageTitleInfo({heading: "Waiver Action Details", text: ""});
        } else {
            setReadOnly(false);

            PageTitleBar.setPageTitleInfo({heading: "Submit New Waiver Action", text: ""});
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
            let updatedRecord = {...changeRequest}; // You need a new object to be able to update the state
            updatedRecord[event.target.name] = event.target.value;
            setChangeRequest(updatedRecord);

            if (event.target.name === "territory") updatedRecord[FIELD_NAMES.STATE_CODE] = event.target.value

            // Check to see if the required fields are provided
            setIsFormReady(
                hasValidTransmittalNumber &&
                updatedRecord[FIELD_NAMES.TERRITORY] &&
                updatedRecord[FIELD_NAMES.ACTION_TYPE] &&
                updatedRecord[FIELD_NAMES.WAIVER_AUTHORITY]
            );
        }
    }

    /**
     * Validate Transmittal Number Format
     * @param {value} Transmittal Number Field Entered on Change Event.
     */
    function validateTransmittalNumber(value) {

        let errorMessage
        let updatedRecord = {...changeRequest}
        changeRequest.transmittalNumber = value

        errorMessage = validateWavierId(value)
        if (errorMessage === undefined) {
            updatedRecord[FIELD_NAMES.TRANSMITTAL_NUMBER] = value
            setValidTransmittalNumber(true)
        } else {
            setValidTransmittalNumber(false)
        }

        return errorMessage;
    };

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

    function renderOptionsList(theList) {
        let optionsList = theList.map((item, i) => {
            return (
                <option key={i} value={item.value}>
                    {item.label}
                </option>
            );
        });
        return optionsList;
    }

    /**
     * Get props for the select component dependent on the value of isReadOnly.
     * Note: The defaultValue prop should NOT be set when the form is read only due to the following warning:
     *   "Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both).
     *    Decide between using a controlled or uncontrolled select element and remove one of these props."
     * @param {String} id an identifier used to set select params
     * @param {String} value the display text in select params
     */
    function getSelectProps(id, value) {
        const defaultSelectProps = {
            id,
            name: id,
            value
        }

        let selectProps = {}

        if (!isReadOnly) {
            selectProps = {
                defaultValue: "none-selected",
                onChange: handleInputChange,
                required: true,
                ...defaultSelectProps
            }
        } else {
            selectProps = {
                disabled: true,
                ...defaultSelectProps
            }
        }

        return selectProps
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
                                <h3>Waiver Action Details</h3>
                                <p className="req-message">
                                    <span className="required-mark">*</span>
                                    indicates required field.
                                </p>
                                <div className="form-card">
                                    <label htmlFor={FIELD_NAMES.TERRITORY}>
                                        State/Territory
                                        <span className="required-mark">*</span>
                                    </label>
                                    <select {...getSelectProps(FIELD_NAMES.TERRITORY, changeRequest.territory)}>
                                        <option disabled value="none-selected">-- select a territory --</option>
                                        {renderOptionsList(territoryList)}
                                    </select>
                                    <label htmlFor={FIELD_NAMES.ACTION_TYPE}>
                                        Action Type
                                        <span className="required-mark">*</span>
                                    </label>
                                    <select {...getSelectProps(FIELD_NAMES.ACTION_TYPE, changeRequest.actionType)}>
                                        <option disabled value="none-selected">-- select an action type --</option>
                                        {renderOptionsList(actionTypeOptions)}
                                    </select>
                                    <label htmlFor={FIELD_NAMES.WAIVER_AUTHORITY}>
                                        Waiver Authority
                                        <span className="required-mark">*</span>
                                    </label>
                                    <select {...getSelectProps(FIELD_NAMES.WAIVER_AUTHORITY, changeRequest.waiverAuthority)}>
                                        <option disabled value="none-selected">-- select a waiver authority --</option>
                                        {renderOptionsList(waiverAuthorityOptions)}
                                    </select>
                                    <div className="label-container">
                                        <div className="label-lcol">
                                            <label htmlFor={FIELD_NAMES.TRANSMITTAL_NUMBER}>
                                                Waiver Number
                                                <span className="required-mark">*</span>
                                            </label>
                                        </div>
                                        <div className="label-rcol">
                                            <HashLink to="/FAQ#waiver-id-format">What is my Waiver Number?</HashLink>
                                        </div>
                                    </div>
                                    {!isReadOnly &&
                                    <p className="field-hint">
                                        Must follow the format SS.##.R##.M## or SS.####.R##.##
                                    </p>
                                    }
                                    {errors.transmittalNumber && (
                                        <div id="waiverTransmittalError" class="ds-u-color--error">{errors.transmittalNumber}</div>
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
                            </Form>
                        )}
                    </Formik>
                </div>
            ) : null}
        </LoadingScreen>
    );
}
