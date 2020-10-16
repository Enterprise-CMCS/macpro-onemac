import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types';
import { TextField } from "@cmsgov/design-system";

import { onError } from "../libs/errorLib";
import FileUploader from "../common/FileUploader";
import submitChangeRequest from "../common/SubmitChangeRequest";
import LoaderButton from "../components/LoaderButton";
import { ROUTES } from "../Routes";

  /**
   * RAI Form template to allow rendering for different types of RAI's.
   * @param {String} changeRequestType - functional name for the type of change request
   * @param {Array} optionalUploads - list of attachment that are optional
   * @param {Array} requiredUploads - list of attachments that are required
   * @param {String} raiType - display name for the type of change request
   */
export default function RaiTemplate({changeRequestType, optionalUploads, requiredUploads, raiType}) {
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

  // The browser history, so we can redirect to the home page
  const history = useHistory();

  //Reference to the File Uploader.
  const uploader = useRef(null);

  // The record we are using for the form.
  const [changeRequest, setChangeRequest] = useState({
    type: changeRequestType,
    summary: "",
  });

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
      await submitChangeRequest(changeRequest, uploadedList);
      history.push(ROUTES.DASHBOARD);
    } catch (error) {
      onError("There was an error submitting your request.  Please try again.");
      console.log("Error while submitting the form.", error);
      setIsLoading(false);
    }
  }

  // Render the component.
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h3>{raiType} Details</h3>
        <label for={FIELD_NAMES.TRANSMITTAL_NUMBER}>
          {raiType} ID<span className="required-mark">*</span>
        </label>
        <p>Enter the {raiType} transmittal number for this RAI</p>
        <input
          type="text"
          required
          id={FIELD_NAMES.TRANSMITTAL_NUMBER}
          name={FIELD_NAMES.TRANSMITTAL_NUMBER}
          onChange={handleInputChange}
        ></input>
        <h3>Attachments</h3>
        <FileUploader
          ref={uploader}
          requiredUploads={requiredUploads}
          optionalUploads={optionalUploads}
          readyCallback={uploadsReadyCallbackFunction}
        ></FileUploader>
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

RaiTemplate.propTypes = {
  changeRequestType: PropTypes.string.isRequired,
  optionalUploads: PropTypes.arrayOf(PropTypes.string).isRequired,
  requiredUploads: PropTypes.arrayOf(PropTypes.string).isRequired,
  raiType: PropTypes.oneOf(['SPA', 'Waiver']).isRequired
}
