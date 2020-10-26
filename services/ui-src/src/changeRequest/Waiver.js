import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoaderButton from "../components/LoaderButton";
import FileUploader from "../components/FileUploader";
import FileList from "../components/FileList";
import { TextField } from "@cmsgov/design-system";
import { useHistory } from "react-router-dom";
import { CHANGE_REQUEST_TYPES } from "./changeRequestTypes";
import ChangeRequestDataApi from "../utils/ChangeRequestDataApi";
import { ROUTES } from "../Routes";
import { territoryList } from "../libs/territoryLib";
import { formatDate } from "../utils/date-utils";
import AlertBar from "../components/AlertBar";
import { ALERTS_MSG } from "../libs/alert-messages";

export default function Waiver() {
  // The attachment list
  const requiredUploads = ['Required Upload (per Waiver Authority)'];
  const optionalUploads = [
    '1915(b)(4) waiver application',
    'Cost effectiveness spreadsheets',
    'Tribal Consultation',
    '1915(c) Appendix K amendment waiver template',
    '1915(b) waiver',
    'Other'
  ];
  const actionTypeOptions = [
    { "label": "New waiver", "value": "New waiver" },
    { "label": "Waiver amendment", "value": "Waiver amendment" },
    { "label": "Request for waiver renewal", "value": "Request for waiver renewal" }
  ];
  const waiverAuthorityOptions = [
    { "label": "1915(b)(4) FFS Selective Contracting waivers", "value": "1915(b)(4) FFS Selective Contracting waivers" },
    { "label": "All other 1915(b) Waivers", "value": "All other 1915(b) Waivers" },
    { "label": "1915(c) Appendix K waiver", "value": "1915(c) Appendix K waiver" }
  ];

  // The form field names
  const FIELD_NAMES = {
    TRANSMITTAL_NUMBER: "transmittalNumber",
    TERRITORY: "territory",
    ACTION_TYPE: "actionType",
    WAIVER_AUTHORITY: "waiverAuthority",
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
        setReadOnly(true);
      } catch (error) {
        console.log("Error while fetching submission.", error);
        AlertBar.alert(ALERTS_MSG.FETCH_ERROR);
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
      setIsFormReady(updatedRecord.transmittalNumber
        && updatedRecord.territory
        && updatedRecord.actionType
        && updatedRecord.waiverAuthority
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

  // Render the component.
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h3>Waiver Submission</h3>
        <label htmlFor={FIELD_NAMES.TERRITORY}>
          State/Territory<span className="required-mark">*</span>
        </label>
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
          {renderOptionsList(territoryList)}
        </select>
        <br />
        <label htmlFor={FIELD_NAMES.ACTION_TYPE}>
          Action Type<span className="required-mark">*</span>
        </label>
        <select
          id={FIELD_NAMES.ACTION_TYPE}
          name={FIELD_NAMES.ACTION_TYPE}
          required={!isReadOnly}
          onChange={handleInputChange}
          disabled={isReadOnly}
          value={changeRequest.actionType}
          defaultValue="none-selected"
        >
          <option disabled value="none-selected"> -- select an action type -- </option>
          {renderOptionsList(actionTypeOptions)}
        </select>
        <br />
        <label htmlFor={FIELD_NAMES.WAIVER_AUTHORITY}>
          Action Type<span className="required-mark">*</span>
        </label>
        <select
          id={FIELD_NAMES.WAIVER_AUTHORITY}
          name={FIELD_NAMES.WAIVER_AUTHORITY}
          required={!isReadOnly}
          onChange={handleInputChange}
          disabled={isReadOnly}
          value={changeRequest.waiverAuthority}
          defaultValue="none-selected"
        >
          <option disabled value="none-selected"> -- select a waiver authority -- </option>
          {renderOptionsList(waiverAuthorityOptions)}
        </select>
        <br />
        <label htmlFor={FIELD_NAMES.TRANSMITTAL_NUMBER}>
          Waiver Number<span className="required-mark">*</span>
        </label>
        {!isReadOnly &&
          <p className="field-hint">
            Enter the Waiver number
          </p>
        }
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
