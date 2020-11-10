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
import { territoryList } from "../libs/territoryLib";
import { formatDate } from "../utils/date-utils";
import AlertBar from "../components/AlertBar";
import PageTitleBar from "../components/PageTitleBar";
import { ALERTS_MSG } from "../libs/alert-messages";
import { renderOptionsList } from "../utils/form-utils";

export default function Spa() {

  // The attachment list
  const requiredUploads = ["CMS Form 179", "SPA Pages"];
  const optionalUploads = [
    "Cover Letter",
    "Existing state plan page(s)",
    "Tribal Consultation",
    "Public Notice",
    "Standard Funding Questions (SFQs)",
    "Other",
  ];

  // The form field names
  const FIELD_NAMES = {
    TRANSMITTAL_NUMBER: "transmittalNumber",
    SUMMARY: "summary",
    TERRITORY: "territory",
  };

  // True when the required attachments have been selected.
  const [areUploadsReady, setAreUploadsReady] = useState(false);
  const [isFormReady, setIsFormReady] = useState(false);

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
    type: CHANGE_REQUEST_TYPES.SPA,
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

      PageTitleBar.setPageTitleInfo({ heading: "SPA Submission Details", text: "" });
    } else {
      setReadOnly(false);

      PageTitleBar.setPageTitleInfo({ heading: "Submit New SPA", text: "" });
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

      // Check to see if the required fields are provided
      setIsFormReady(
        updatedRecord[FIELD_NAMES.TRANSMITTAL_NUMBER] &&
        updatedRecord[FIELD_NAMES.TERRITORY]
      );
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
          <form onSubmit={handleSubmit}>
            <h3>SPA Details</h3>
            <p className="req-message"><span className="required-mark">*</span> indicates required field.</p>
            <div className="form-card">
              <label htmlFor={FIELD_NAMES.TERRITORY}>
                State/Territory<span className="required-mark">*</span>
              </label>
              <select {...getSelectProps(FIELD_NAMES.TERRITORY, changeRequest.territory)}>
                <option disabled value="none-selected">-- select a territory --</option>
                {renderOptionsList(territoryList)}
              </select>
              <div className="label-container">
                <div className="label-lcol"><label htmlFor={FIELD_NAMES.TRANSMITTAL_NUMBER}>
                  SPA ID<span className="required-mark">*</span>
                </label>
                </div>
                <div className="label-rcol"><HashLink to="/FAQ#spa-id-format">What is my SPA ID?</HashLink></div>
              </div>
              {!isReadOnly && (
                <p className="ds-c-field__hint">
                  Must follow the format SS-YY-NNNN-xxxx
                </p>
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
            <p className="req-message"><span className="required-mark">*</span> indicates required field.</p>
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
          </form>
        </div>
      ) : null}
    </LoadingScreen>
  );
}
