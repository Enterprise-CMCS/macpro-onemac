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
import { territoryList } from "../libs/territoryLib";
import { formatDate } from "../utils/date-utils";
import AlertBar from "../components/AlertBar";
import PageTitleBar from "../components/PageTitleBar";
import { ALERTS_MSG } from "../libs/alert-messages";
import { renderOptionsList, validateSpaId } from "../utils/form-utils";
import { Formik, Form, Field } from 'formik';

export default function Spa() {

  // The attachment list
  const requiredUploads = ["CMS Form 179", "SPA Pages"];
  const optionalUploads = [
    "Cover Letter",
    "Existing State Plan Page(s)",
    "Document Demonstrating Good-Faith Tribal Engagement",
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
  const { id } = useParams();

  // The data record associated with form, used for initialValues
  const [changeRequest, setChangeRequest] = useState({
    type: CHANGE_REQUEST_TYPES.SPA,
    summary: "",
    transmittalNumber: "", //This is needed to be able to control the field
    territory: "",
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
      PageTitleBar.setPageTitleInfo({ heading: "SPA Submission Details", text: "" });

      setReadOnly(true);
      fetchChangeRequest();
    } else {
      PageTitleBar.setPageTitleInfo({ heading: "Submit New SPA", text: "" });

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
    }
  }

  /**
      * Validate Transmittal Number Format
      * @param {value} Transmittal Number Field Entered on Change Event.
      * NOTE: State Code should be removed when we get info form user profile.
      */
  function validateTransmittalNumber(value) {

    let errorMessage;
    let updatedRecord = { ...changeRequest };
    changeRequest.transmittalNumber = value;

    errorMessage = validateSpaId(value)
    if (errorMessage === undefined) {
      updatedRecord[FIELD_NAMES.TRANSMITTAL_NUMBER] = value;
      setValidTransmittalNumber(true);
    }

    return errorMessage;
  }

  function validateTerritory(territory) {
    let errorMessage;

    if (!territory)
      errorMessage =  "Please select a State or Territory";
    
    return errorMessage;
  }
  /**
   * Submit the new change request.
   * @param {Object} event the click event
   */
  async function handleSubmit(event) {
    event.preventDefault();

    if (!event.target.checkValidity() || hasValidTransmittalNumber !== true) {
      AlertBar.alert(ALERTS_MSG.SUBMISSION_INCOMPLETE);
      window.scrollTo(0, 0);
      return;
    }

    if (!areUploadsReady) {
      console.log("Uploads are not ready.");
      AlertBar.alert(ALERTS_MSG.REQUIRED_UPLOADS_MISSING);
      window.scrollTo(0, 0);
    } else {
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
      value,
      as: "select",
    }

    let selectProps = {}

    if (!isReadOnly) {
      selectProps = {
        onChange: handleInputChange,
        required: true,
      //  validate: validateTerritory,
        ...defaultSelectProps
      }
    } else {
      selectProps = {
        disabled: true,
        ...defaultSelectProps
      }
    }
selectProps="";
    return selectProps
  }
  function validateTerritory(value) {
    if (value === "")
      return false;
    else
      return true;
  }
  // Render the component conditionally when NOT in read only mode
  // OR in read only mode when change request data was successfully retrieved
  return (
    <LoadingScreen isLoading={isLoading}>
      {!isReadOnly || (isReadOnly && changeRequest !== null) ? (
        <div className="form-container">
          <Formik initialValues={changeRequest}>
            {({ errors, touched }) => (
              <Form onSubmit={handleSubmit} noValidate
              >
                <h3>SPA Details</h3>
                <p className="req-message"><span className="required-mark">*</span> indicates required field.</p>
                <div className="form-card">
                  <label htmlFor={FIELD_NAMES.TERRITORY}>
                    State/Territory<span className="required-mark">*</span>
                  </label>
                  {errors.territory && touched.territory && (
                    <div id={"spaTerritoryErrorMsg"}
                      className="ds-u-color--error">{errors.territory}</div>
                  )}
                  <Field validate={validateTerritory}
                                      className="field"
                                      as="select"
                                      id={FIELD_NAMES.TERRITORY}
                                      name={FIELD_NAMES.TERRITORY}
                                      disabled={isReadOnly}
                  
                  {...getSelectProps(FIELD_NAMES.TERRITORY, changeRequest.territory)}>
                    <option value="">-- select a territory --</option>
                    {renderOptionsList(territoryList)}
                  </Field>
                  <div className="label-container">
                    <div className="label-lcol"><label className="ds-c-label" htmlFor={FIELD_NAMES.TRANSMITTAL_NUMBER}>
                      SPA ID<span className="required-mark">*</span>
                    </label>
                    </div>
                    <div className="label-rcol"><HashLink to="/FAQ#spa-id-format">What is my SPA ID?</HashLink></div>
                  </div>
                  {!isReadOnly && (
                    <p className="field-hint">
                      Must follow the format SS-YY-NNNN-xxxx
                    </p>
                  )}
                  {errors.transmittalNumber || touched.transmittalNumber ? (
                    <div id={"spaTransmittalNumberErrorMsg"}
                      className="ds-u-color--error">Test{errors.transmittalNumber}</div>
                  ): null }
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
                <p className="req-message"><span className="required-mark">*</span> indicates required attachment.</p>
                {errors.uploads && (
                  <div id={"spaUploadsErrorMsg"}
                    className="ds-u-color--error">{errors.uploads}</div>
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
              </Form>
            )}
          </Formik>
        </div>
      ) : null}
    </LoadingScreen>
  );
}
