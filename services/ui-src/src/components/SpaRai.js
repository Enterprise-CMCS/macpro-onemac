import React, { useRef, useState } from "react";
import LoaderButton from "./LoaderButton";
import FileUploader from "../common/FileUploader";
import { TextField } from "@cmsgov/design-system";
import { onError } from "../libs/errorLib";
import { useHistory } from "react-router-dom";
import { RECORD_TYPES } from "../libs/recordTypes";
import submitChangeRequest from "../common/SubmitChangeRequest";

export default function SpaRai() {
  // The attachment list
  const requiredUploads = ['RAI Response'];
  const optionalUploads = [
    'CMS Form 179',
    'SPA Pages',
    'Cover Letter',
    'Existing state plan pages',
    'Tribal Consultation',
    'Public Notice',
    'Standard Funding Questions (SFQs)',
    'Other',
  ];

  // The form field names
  const FIELD_NAMES = {
    TRANSMITTAL_NUMBER: 'transmittalNumber',
    SUMMARY: 'summary',
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
  const [record, setRecord] = useState({
    type: RECORD_TYPES.SPA_RAI,
    summary: '',
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
    validateForm(record, state);
  }

  /**
   * Handle changes to the form.
   * @param {Object} event the event
   */
  async function handleInputChange(event) {
    if (event && event.target) {
      let updatedRecord = record;
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
      setRecord(updatedRecord);
      // Need to use the current data to validate and not what is in the state
      validateForm(updatedRecord, areUploadsReady);
    }
  }

  /**
   * Submit the new record.
   * @param {Object} event the click event
   */
  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
      let uploadedList = await uploader.current.uploadFiles();
      await submitChangeRequest(record, uploadedList);
      history.push('/');
    } catch (error) {
      onError('There was an error submitting your request.  Please try again.');
      console.log('Error while submitting the form.', error);
      setIsLoading(false);
    }
  }

  // Render the component.
  return (
    <div className='form-container'>
      <form onSubmit={handleSubmit}>
        <h3>SPA Details</h3>
        <TextField
          name={FIELD_NAMES.TRANSMITTAL_NUMBER}
          size='medium'
          label='SPA ID'
          requirementLabel='REQUIRED'
          hint='Enter the State Plan Amendment transmittal number for this RAI.'
          onChange={handleInputChange}
        ></TextField>
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
          label='Summary'
          fieldClassName='summary-field'
          multiline
          onChange={handleInputChange}
        ></TextField>
        <LoaderButton
          block
          type='submit'
          bsSize='large'
          bsStyle='primary'
          isLoading={isLoading}
          disabled={!isFormReady}
        >
          Submit
        </LoaderButton>
      </form>
    </div>
  );
}
