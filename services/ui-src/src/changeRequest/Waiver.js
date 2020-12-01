import React, { useRef, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
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
import { ALERTS_MSG } from "../libs/alert-messages";
import PageTitleBar from "../components/PageTitleBar";
import { renderOptionsList, validateWaiverId, validateTerritory } from "../utils/form-utils";


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
    { label: "New waiver", value: "new" },
    { label: "Waiver amendment", value: "amendment" },
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
    { label: "All other 1915(b) Waivers", value: "1915(b)" },
    { label: "1915(c) Appendix K waiver", value: "1915(c)" },
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

  // because the first time through, we do not want to be annoying with the error messaging
  const [firstTimeThrough, setFirstTimeThrough] = useState(true);

  // if the message string is set, then the error div should be shown for these items
  const [territoryErrorMessage, setTerritoryErrorMessage] = useState("");
  const [actionTypeErrorMessage, setActionTypeErrorMessage] = useState("");
  const [waiverAuthorityErrorMessage, setWaiverAuthorityErrorMessage] = useState("");
  const [transmittalNumberErrorMessage, setTransmittalNumberErrorMessage] = useState("");
  const [attachmentsErrorMessage, setAttachmentsErrorMessage] = useState("");

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
    type: CHANGE_REQUEST_TYPES.WAIVER,
    summary: "",
    transmittalNumber: "", //This is needed to be able to control the field
    territory: "",
    actionType: "",
    waiverAuthority: "",
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
      PageTitleBar.setPageTitleInfo({
        heading: "Waiver Action Details",
        text: "",
      });

      setReadOnly(true);
      fetchChangeRequest();
    } else {
      PageTitleBar.setPageTitleInfo({
        heading: "Submit New Waiver Action",
        text: "",
      });
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
   * Validate that the Waiver Action Type has been selected
   * @param {value} String The actionType Selected
   */
  function validateActionType(value) {
    let errorMessage = "";

    if (!value) errorMessage = "Please select the Action Type.";

    return errorMessage;
  }

  /**
   * Validate that the Waiver Authority has been selected
   * @param {value} String The waiverAuthourity Selected
   */
  function validateWaiverAuthority(value) {
    let errorMessage = "";

    if (!value) errorMessage = "Please select the Waiver Authority.";

    return errorMessage;
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

      if (!firstTimeThrough) {
        setTerritoryErrorMessage(validateTerritory(updatedRecord.territory));
        setActionTypeErrorMessage(validateActionType(updatedRecord.actionType));
        setWaiverAuthorityErrorMessage(validateWaiverAuthority(updatedRecord.waiverAuthority));
        if (!areUploadsReady) setAttachmentsErrorMessage("Required Attachments Missing");
        else setAttachmentsErrorMessage("");
      }
      if (event.target.name === 'transmittalNumber') {
        setTransmittalNumberErrorMessage(validateWaiverId(updatedRecord.transmittalNumber));
      }
    }
  }

  /**
   * Submit the new change request.
   * @param {Object} event the click event
   */
  async function handleSubmit(event) {
    event.preventDefault();

    // so the old alert goes away
    AlertBar.dismiss();

    setIsLoading(true);

    // once Submit is clicked, show error messages
    setFirstTimeThrough(false);

    // validate the form fields and set the messages
    // because this is an asynchronous function, you can't trust that the 
    // state functions will be processed in time to use the variables
    let territoryMessage = "";
    let actionTypeMessage = "";
    let waiverAuthorityMessage = "";
    let transmittalNumberMessage = "";

    territoryMessage = validateTerritory(changeRequest.territory);
    actionTypeMessage = validateActionType(changeRequest.actionType);
    waiverAuthorityMessage = validateWaiverAuthority(changeRequest.waiverAuthority);
    transmittalNumberMessage = validateWaiverId(changeRequest.transmittalNumber);

    // check which alert to show.  Fields first, than attachments
    // if all passes, submit the form and return to dashboard
    if (territoryMessage || transmittalNumberMessage || 
        actionTypeMessage || waiverAuthorityMessage) {
      AlertBar.alert(ALERTS_MSG.SUBMISSION_INCOMPLETE);
    } else if (!areUploadsReady) {
      AlertBar.alert(ALERTS_MSG.REQUIRED_UPLOADS_MISSING);
    } else {

      try {
        let uploadedList = await uploader.current.uploadFiles();
        await ChangeRequestDataApi.submit(changeRequest, uploadedList);
        history.push(ROUTES.DASHBOARD);
        //Alert must come last or it will be cleared after the history push.
        AlertBar.alert(ALERTS_MSG.SUBMISSION_SUCCESS);
      } catch (error) {
        AlertBar.alert(ALERTS_MSG.SUBMISSION_ERROR);
        setIsLoading(false);
      }
    }

    // now set the state variables to show the error messages
    setTerritoryErrorMessage(territoryMessage);
    setActionTypeErrorMessage(actionTypeMessage);
    setWaiverAuthorityErrorMessage(waiverAuthorityMessage);
    setTransmittalNumberErrorMessage(transmittalNumberMessage);
    if (!areUploadsReady) setAttachmentsErrorMessage("Required Attachments Missing");

    window.scrollTo(0, 0);
    setIsLoading(false);
  }

  // Render the component conditionally when NOT in read only mode
  // OR in read only mode when change request data was successfully retrieved
  return (
    <LoadingScreen isLoading={isLoading}>
      {!isReadOnly || (isReadOnly && changeRequest !== null) ? (
        <div className="form-container">
          <form 
            onSubmit={handleSubmit} 
            noValidate 
            className={!firstTimeThrough ? "display-errors" : ""}
            >
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
                  {territoryErrorMessage && (
                <div id="spaTerritoryErrorMsg"
                  className="ds-u-color--error">{territoryErrorMessage}</div>
              )}
              {!isReadOnly ? <select
                className="field"
                id={FIELD_NAMES.TERRITORY}
                name={FIELD_NAMES.TERRITORY}
                onChange={handleInputChange}
                required
              >
                <option value="">-- select a territory --</option>
                {renderOptionsList(territoryList)}
              </select>
                :
                <input
                  className="field"
                  type="text"
                  id={FIELD_NAMES.TERRITORY}
                  name={FIELD_NAMES.TERRITORY}
                  disabled
                  value={changeRequest.territory}
                ></input>
              }
                  <label htmlFor={FIELD_NAMES.ACTION_TYPE}>
                    Action Type
                    <span className="required-mark">*</span>
                  </label>
                  {actionTypeErrorMessage && (
                <div id="actionTypeErrorMsg"
                  className="ds-u-color--error">{actionTypeErrorMessage}</div>
              )}
              {!isReadOnly ? (
                <select
                className="field"
                id={FIELD_NAMES.ACTION_TYPE}
                name={FIELD_NAMES.ACTION_TYPE}
                onChange={handleInputChange}
                required
              >
                <option value="">-- select an action type --</option>
                {renderOptionsList(actionTypeOptions)}
              </select>)
                :
                (<input
                  className="field"
                  type="text"
                  id={FIELD_NAMES.ACTION_TYPE}
                  name={FIELD_NAMES.ACTION_TYPE}
                  disabled
                  value={changeRequest.actionType}
                ></input>
                )}

                <label htmlFor={FIELD_NAMES.WAIVER_AUTHORITY}>
                Waiver Authority
                    <span className="required-mark">*</span>
                  </label>
                  {waiverAuthorityErrorMessage && (
                <div id="waiverAuthorityErrorMsg"
                  className="ds-u-color--error">{waiverAuthorityErrorMessage}</div>
              )}
                  {!isReadOnly ? (
                <select
                className="field"
                id={FIELD_NAMES.WAIVER_AUTHORITY}
                name={FIELD_NAMES.WAIVER_AUTHORITY}
                onChange={handleInputChange}
                required
              >
                <option value="">-- select a waiver authority --</option>
                {renderOptionsList(waiverAuthorityOptions)}
              </select>)
                :
                (<input
                  className="field"
                  type="text"
                  id={FIELD_NAMES.WAIVER_AUTHORITY}
                  name={FIELD_NAMES.WAIVER_AUTHORITY}
                  disabled
                  value={changeRequest.waiverAuthority}
                ></input>
                )}
                  <div className="label-container">
                    <div className="label-lcol">
                      <label htmlFor={FIELD_NAMES.TRANSMITTAL_NUMBER}>
                        Waiver Number
                        <span className="required-mark">*</span>
                      </label>
                    </div>
                    <div className="label-rcol">
                      <HashLink to={ROUTES.FAQ_WAIVER_ID}>
                        What is my Waiver Number?
                      </HashLink>
                    </div>
                  </div>
                  {!isReadOnly && (
                    <p className="field-hint">
                      Must follow the format SS.##.R##.M## or SS.####.R##.##
                    </p>
                  )}
                {transmittalNumberErrorMessage && (
                <div id="waiverTransmittalNumberErrorMsg"
                  className="ds-u-color--error">{transmittalNumberErrorMessage}</div>
              )}
              <input
                className="field"
                type="text"
                id={FIELD_NAMES.TRANSMITTAL_NUMBER}
                name={FIELD_NAMES.TRANSMITTAL_NUMBER}
                onChange={handleInputChange}
                disabled={isReadOnly}
                value={changeRequest.transmittalNumber}
                required
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
                <p className="req-message">
                  <span className="required-mark">*</span>
                  indicates required attachment.
                </p>
                {attachmentsErrorMessage && !areUploadsReady && (
              <div id="spaUploadsErrorMsg"
                className="ds-u-color--error">{attachmentsErrorMessage}</div>
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
          </form>
        </div>
      ) : null}
    </LoadingScreen>
  );
}
