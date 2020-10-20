import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoaderButton from "../components/LoaderButton";
import FileUploader from "../components/FileUploader";
import FileList from "../components/FileList";
import { TextField } from "@cmsgov/design-system";
import { onError } from "../libs/errorLib";
import { useHistory } from "react-router-dom";
import { CHANGE_REQUEST_TYPES } from "./changeRequestTypes";
import ChangeRequestDataApi from "../utils/ChangeRequestDataApi";
import { ROUTES } from "../Routes";
import { territoryList } from "../libs/territoryLib";

export default function SpaRai() {
  // The attachment list
  const requiredUploads = ["CMS Form 179", "SPA Pages"];
  const optionalUploads = [
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
    TERRITORY: "territory",
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
    type: CHANGE_REQUEST_TYPES.AMENDMENT,
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
      setIsFormReady(updatedRecord.transmittalNumber && updatedRecord.territory);
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

  function renderTerritoryList() {
    let optionsList = territoryList.map((item, i) => {
      return (
        <option key={i} value={item.value}>
          {item.label}
        </option>
      );
    });
    return optionsList;
  }

  // Render the component.
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h3>SPA Details</h3>
        <label htmlFor={FIELD_NAMES.TERRITORY}>
          State/Territory<span className="required-mark">*</span>
        </label>
        <br />
        <select
          id={FIELD_NAMES.TERRITORY}
          name={FIELD_NAMES.TERRITORY}
          required={!isReadOnly}
          onChange={handleInputChange}
          disabled={isReadOnly}
          value={changeRequest.territory}
          defaultValue="none-selected"
        >
          <option disabled value="none-selected"> -- select a territory -- </option>
          {renderTerritoryList()}
        </select>
        <br />
        <label htmlFor={FIELD_NAMES.TRANSMITTAL_NUMBER}>
          SPA ID<span className="required-mark">*</span>
        </label>
        <p className="field-hint">
          Enter the State Plan Amendment transmittal number for this RAI
        </p>
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
      </form>
    </div>
  );
}
