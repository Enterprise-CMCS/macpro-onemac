import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoaderButton from "../components/LoaderButton";
import FileUploader from "../components/FileUploader";
import FileList from "../components/FileList";
import { TextField } from "@cmsgov/design-system";
import { onError } from "../libs/errorLib";
import { useHistory } from "react-router-dom";
import ChangeRequestDataApi from "../utils/ChangeRequestDataApi";
import { ROUTES } from "../Routes";
import PropTypes from "prop-types";
import { formatDate } from "../utils/date-utils";

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

  // True if we are currently submitting the form
  const [isLoading, setIsLoading] = useState(false);

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
      setIsFormReady(updatedRecord.transmittalNumber);
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
      console.log("There was an error submitting a request.", error);
      setIsLoading(false);
    }
  }

  // Render the component.
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h3>{raiType} RAI Details</h3>
        <label htmlFor={FIELD_NAMES.TRANSMITTAL_NUMBER}>
          {raiType} ID<span className="required-mark">*</span>
        </label>
        {!isReadOnly ? (
          <p className="field-hint">
            Enter the transmittal number for this RAI
          </p>
        ) : (
          <br />
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
            <label htmlFor="createdAt">Submitted on</label>
            <br />
            <input
              className="field"
              type="text"
              id="createdAt"
              name="createdAt"
              disabled
              value={formatDate(changeRequest.createdAt)}
            ></input>
          </div>
        )}
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
          disabled={isReadOnly}
          value={changeRequest.summary}
        ></TextField>
        {!isReadOnly && (
          <LoaderButton
            block
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
  );
}

RaiTemplate.propTypes = {
  changeRequestType: PropTypes.string.isRequired,
  optionalUploads: PropTypes.arrayOf(PropTypes.string).isRequired,
  requiredUploads: PropTypes.arrayOf(PropTypes.string).isRequired,
  raiType: PropTypes.oneOf(["SPA", "Waiver"]).isRequired,
};
