import React, { useRef, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import LoaderButton from "../components/LoaderButton";
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
import {Formik, Form, Field} from 'formik';

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

  const [ hasValidTransmittalNumber, setValidTransmittalNumber] = useState(false);

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
      setReadOnly(true);
      fetchChangeRequest();
      PageTitleBar.setPageTitleInfo({heading: "Waiver Temporary Extension Details",text : ""});
    } else {
      setReadOnly(false);
      PageTitleBar.setPageTitleInfo({heading: "Request Waiver Temporary Extension",text : ""});
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


    let RegexFormatString = "^[A-Z]{2}[.][0-9]{2}[.]R[0-9]{2}[.]M[0-9]{2}$"
    let RegexFormatString2 = "^[A-Z]{2}[.][0-9]{4}[.]R[0-9]{2}[.][0-9]{2}$"
    let transmittalNumberFormatErrorMessage = "SS.##.R##.M## or SS.####.R##.##"
    let transmittalNumberRegex = new RegExp(RegexFormatString)
    let transmittalNumberRegex2 = new RegExp(RegexFormatString2)

    if (!value) {
      errorMessage = 'Transmittal Number Required !';
    } else if (!value.match(transmittalNumberRegex) ) {
      if (!value.match(transmittalNumberRegex2) )
        errorMessage = `Transmittal Number Format Error must Match: ${transmittalNumberFormatErrorMessage} !`;
    } else {
      updatedRecord[FIELD_NAMES.TRANSMITTAL_NUMBER] = value
      setValidTransmittalNumber(true)
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

  // Render the component conditionally when NOT in read only mode
  // OR in read only mode when change request data was successfully retrieved
  return (
    <LoadingScreen isLoading={isLoading}>
      {!isReadOnly || (isReadOnly && changeRequest !== null) ? (
    <div className="form-container">
      <Formik
          initialValues={{ transmittalNumber: '' }}
      >
        {({errors }) => (
            <Form onSubmit={handleSubmit}>
        <h3>Request Temporary Extension</h3>
        <p className="req-message"><span className="required-mark">*</span> indicates required field.</p>
        <div className="form-card">
        <div className="label-container">
          <div className="label-lcol"><label htmlFor={FIELD_NAMES.TRANSMITTAL_NUMBER}>
          Waiver Number<span className="required-mark">*</span>
          </label>
          </div>
          <div className="label-rcol"><HashLink to="/FAQ#waiver-id-format">What is my Waiver Number?</HashLink></div>
          </div>
        {!isReadOnly &&
          <p className="field-hint">
            Enter the Waiver number for this Temporary Extension Request
          </p>
        }
        {!isReadOnly && (
            <Field
                className="field"
                type="text"
                id={FIELD_NAMES.TRANSMITTAL_NUMBER}
                name={FIELD_NAMES.TRANSMITTAL_NUMBER}
                validate={validateTransmittalNumber}
                value={changeRequest.transmittalNumber}
            ></Field> )}
          {errors.transmittalNumber && (
              <div class="ds-u-color--error">{errors.transmittalNumber}</div>
          )}
          {isReadOnly && <input
              className="field"
              type="text"
              required={!isReadOnly}
              id={FIELD_NAMES.TRANSMITTAL_NUMBER}
              name={FIELD_NAMES.TRANSMITTAL_NUMBER}
              onChange={handleInputChange}
              disabled={isReadOnly}
              value={changeRequest.transmittalNumber}
          ></input> }
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
        <p className="req-message"><span className="required-mark">*</span> indicates required attachment.</p>
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
            disabled={!hasValidTransmittalNumber || !areUploadsReady}
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
