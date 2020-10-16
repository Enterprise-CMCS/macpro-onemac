import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoaderButton from "../components/LoaderButton";
import FileUploader from "../components/FileUploader";
import FileList from "../components/FileList";
import { TextField } from "@cmsgov/design-system";
import { onError } from "../libs/errorLib";
import { useHistory } from "react-router-dom";
import { CHANGE_REQUEST_TYPES } from "./changeRequestTypes";
import ChangeRequestDataApi from "../libs/ChangeRequestDataApi";
import { ROUTES } from "../Routes";

export default function SpaRai() {
  // The attachment list
  const requiredUploads = ["RAI Response"];
  const optionalUploads = [
    "CMS Form 179",
    "SPA Pages",
    "Cover Letter",
    "Existing state plan pages",
    "Tribal Consultation",
    "Public Notice",
    "Standard Funding Questions (SFQs)",
    "Other",
  ];

  // The form field names
  const FIELD_NAMES = {
    TRANSMITTAL_NUMBER: "transmittalNumber",
    SUMMARY: "summary",
  };

  // True when the required attachments have been selected.
  const [areUploadsReady, setAreUploadsReady] = useState(false);
  const [isFormReady, setIsFormReady] = useState(false);

  // True if we are currently submitting the form
  const [isLoading, setIsLoading] = useState(false);

  // True if the form is read only.
  const [isReadOnly, setReadOnly] = useState(true);

  // The browser history, so we can redirect to the home page
  const history = useHistory();

  //Reference to the File Uploader.
  const uploader = useRef(null);

  // Optional ID parameter from the URL
  const { id } = useParams();

  // The record we are using for the form.
  const [changeRequest, setChangeRequest] = useState({
    type: CHANGE_REQUEST_TYPES.SPA_RAI,
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
        setReadOnly(true);
      } catch (e) {
        onError(
          "There was an error fetching your change request.  Please try again"
        );
      }
    }

    // Trigger the fetch only if an ID is present.
    if (id) {
      fetchChangeRequest();
    } else {
      setReadOnly(false);
    }
  }, [id]);

  /**
   * Validate the form fields.
   */
  function validateForm(currentRecord, uploadsReady) {
    setIsFormReady(currentRecord.transmittalNumber && uploadsReady);
  }

  /**
   * Callback for the uploader to set if the upload requirements are met.
   * @param {Boolean} state true if the required uploads have been specified
   */
  function uploadsReadyCallbackFunction(state) {
    setAreUploadsReady(state);
    // Need to use the current data to validate and not what is in the state
    validateForm(changeRequest, state);
  }

  /**
   * Handle changes to the form.
   * @param {Object} event the event
   */
  async function handleInputChange(event) {
    if (event && event.target) {
      let updatedRecord = changeRequest;
      switch (event.target.name) {
        case FIELD_NAMES.TRANSMITTAL_NUMBER:
          updatedRecord.transmittalNumber = event.target.value;
          break;
        case FIELD_NAMES.SUMMARY:
          updatedRecord.summary = event.target.value;
          break;
        default:
          //nothing to do here
          break;
      }
      setChangeRequest(updatedRecord);
      // Need to use the current data to validate and not what is in the state
      validateForm(updatedRecord, areUploadsReady);
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
    } catch (error) {
      onError("There was an error submitting your request.  Please try again.");
      console.log(error);
      setIsLoading(false);
    }
  }

  // Render the component.
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h3>SPA Details</h3>
        <label htmlFor={FIELD_NAMES.TRANSMITTAL_NUMBER}>
          SPA ID<span className="required-mark">*</span>
        </label>
        <p>Enter the State Plan Amendment transmittal number for this RAI</p>
        <input
          type="text"
          required
          id={FIELD_NAMES.TRANSMITTAL_NUMBER}
          name={FIELD_NAMES.TRANSMITTAL_NUMBER}
          onChange={handleInputChange}
          readOnly={isReadOnly}
          value={changeRequest.transmittalNumber}
        ></input>
        <h3>Attachments</h3>
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

        <br />
        <TextField
          name={FIELD_NAMES.SUMMARY}
          label="Summary"
          fieldClassName="summary-field"
          multiline
          onChange={handleInputChange}
        ></TextField>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          bsStyle="primary"
          isLoading={isLoading}
          disabled={!isFormReady}
        >
          Submit
        </LoaderButton>
      </form>
    </div>
  );
}
