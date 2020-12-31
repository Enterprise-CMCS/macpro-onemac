import React, { useRef, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import FileUploader from "../components/FileUploader";
import FileList from "../components/FileList";
import { TextField } from "@cmsgov/design-system";
import ChangeRequestDataApi from "../utils/ChangeRequestDataApi";
import { ROUTES } from "../Routes";
import PropTypes from "prop-types";
import { ALERTS_MSG } from "../libs/alert-messages";
import { formatDate } from "../utils/date-utils";
import PageTitleBar from "../components/PageTitleBar";
import { CHANGE_REQUEST_TYPES } from "./changeRequestTypes";
import {
  validateSpaId,
  validateWaiverId,
  validateTerritory,
} from "../utils/form-utils";
import { Alert } from "@cmsgov/design-system";
import TransmittalNumber from "../components/TransmittalNumber";
import RequiredChoice from "../components/RequiredChoice";

/**
 * RAI Form template to allow rendering for different types of RAI's.
 * @param {String} changeRequestType - functional name for the type of change request
 * @param {Array} optionalUploads - list of attachment that are optional
 * @param {Array} requiredUploads - list of attachments that are required
 * @param {String} raiType - display name for the type of change request
 */
const SubmissionForm = ({ formInfo, changeRequestType }) => {
  // The form field names
  const FIELD_NAMES = {
    TRANSMITTAL_NUMBER: "transmittalNumber",
    SUMMARY: "summary",
    TERRITORY: "territory",
  };
  const [alert, setAlert] = useState(ALERTS_MSG.NONE);

  // True when the required attachments have been selected.
  const [areUploadsReady, setAreUploadsReady] = useState(false);

  // because the first time through, we do not want to be annoying with the error messaging
  const [firstTimeThrough, setFirstTimeThrough] = useState(true);

  // if the message string is set, then the error div should be shown for these items
  const [territoryErrorMessage, setTerritoryErrorMessage] = useState("");
  const [actionTypeErrorMessage, setActionTypeErrorMessage] = useState("");
  const [
    waiverAuthorityErrorMessage,
    setWaiverAuthorityErrorMessage,
  ] = useState("");
  const [
    transmittalNumberErrorMessage,
    setTransmittalNumberErrorMessage,
  ] = useState("");

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
    type: changeRequestType,
    summary: "",
    transmittalNumber: "", //This is needed to be able to control the field
    territory: "",
    actionType: "",
    waiverAuthority: "",
  });

  useEffect(() => {
    let mounted = true;

    /**
     * Fetch the given ID
     */
    async function fetchChangeRequest() {
      if (!id) {
        throw new Error("ID not specified for fetchChangeRequest");
      }

      try {
        const changeRequest = await ChangeRequestDataApi.get(id);
        if (mounted) setChangeRequest(changeRequest);
      } catch (error) {
        console.log("Error while fetching submission.", error);
        if (mounted) setChangeRequest(null);
        if (mounted) setAlert(ALERTS_MSG.FETCH_ERROR);
      }

      if (mounted) setIsLoading(false);
    }

    // Trigger the fetch only if an ID is present.
    if (id) {
      if (mounted) setReadOnly(true);
      if (mounted) fetchChangeRequest();
    } else {
      if (mounted) setReadOnly(false);
      if (mounted) setIsLoading(false);
    }

    return function cleanup() {
      mounted = false;
    };
  }, [id]);

  /**
   * Callback for the uploader to set if the upload requirements are met.
   * @param {Boolean} state true if the required uploads have been specified
   */
  function uploadsReadyCallbackFunction(state) {
    setAreUploadsReady(state);
  }

  const jumpToPageTitle = () => {
    var elmnt = document.getElementById("title_bar");
    elmnt.scrollIntoView();
  };

  useEffect(() => {
    if (alert && alert.heading && alert.heading !== "") {
      jumpToPageTitle();
    }
  }, [alert]);

  const renderAlert = (alert) => {
    if (!alert) return;
    if (alert.heading && alert.heading !== "") {
      return (
        <div className="alert-bar">
          <Alert variation={alert.type} heading={alert.heading}>
            <p className="ds-c-alert__text">{alert.text}</p>
          </Alert>
        </div>
      );
    }
  };

  /**
   * Validate Transmittal Number Format
   * @param {value} Transmittal Number Field Entered on Change Event.
   * @return the validation error message or undefined
   */
  function validateTransmittalNumber(value) {
    let errorMessage;

    if (
      changeRequestType === CHANGE_REQUEST_TYPES.SPA_RAI ||
      changeRequestType === CHANGE_REQUEST_TYPES.SPA
    ) {
      errorMessage = validateSpaId(value);
    } else if (
      changeRequestType === CHANGE_REQUEST_TYPES.WAIVER_RAI ||
      changeRequestType === CHANGE_REQUEST_TYPES.WAIVER ||
      changeRequestType === CHANGE_REQUEST_TYPES.WAIVER_EXTENSION
    ) {
      errorMessage = validateWaiverId(value);
    } else {
      throw new Error(`Unable to validate invalid type ${changeRequestType}.`);
    }

    return errorMessage;
  }

  /**
   * Handle changes to the ID.
   * @param {Object} event the event
   */
  async function handleTransmittalNumberChange(event) {
    if (!event || !event.target) return;

    let updatedRecord = { ...changeRequest }; // You need a new object to be able to update the state
    updatedRecord[event.target.name] = event.target.value;
    setChangeRequest(updatedRecord);

    const newTransmittalNumber = event.target.value;
    let errorMessage = validateTransmittalNumber(newTransmittalNumber);

    // if we have an ID and there's no errors, check if ID is in the database
    if (errorMessage === undefined && newTransmittalNumber) {
      let dupID;
      console.log("Checking package ID: ", newTransmittalNumber);
      try {
        dupID = await ChangeRequestDataApi.packageExists(newTransmittalNumber);
      } catch (error) {
        console.log("There was an error submitting a request.", error);
      }
      if (dupID) {
        errorMessage =
          "According to our records, this SPA ID already exists. Please check the SPA ID and try entering it again.";
      }
    }
    setTransmittalNumberErrorMessage(errorMessage);
  }

  /**
   * Handle changes to the form.
   * @param {Object} event the event
   */
  async function handleInputChange(event) {
    if (!event || !event.target) return;

    let updatedRecord = { ...changeRequest }; // You need a new object to be able to update the state
    updatedRecord[event.target.name] = event.target.value;
    setChangeRequest(updatedRecord);

    let territoryMessage = "";
    let actionTypeMessage = "";
    let waiverAuthorityMessage = "";

    if (!firstTimeThrough) {
      if (!changeRequest.territory)
        territoryMessage = formInfo.fieldList.territory;
      if (!changeRequest.actionType)
        actionTypeMessage = formInfo.fieldList.actionType;
      if (!changeRequest.waiverAuthority)
        waiverAuthorityMessage = formInfo.fieldList.waiverAuthority;
    }

    // state set functions have to be at top level
    setTerritoryErrorMessage(territoryMessage);
    setActionTypeErrorMessage(actionTypeMessage);
    setWaiverAuthorityErrorMessage(waiverAuthorityMessage);
  }

  /**
   * Submit the new change request.
   * @param {Object} event the click event
   */
  async function handleSubmit(event) {
    event.preventDefault();

    let newAlert = null;

    // in case form validation takes a while (external validation)
    setIsLoading(true);

    // once Submit is clicked, show error messages
    setFirstTimeThrough(false);

    // validate the form fields and set the messages
    // because this is an asynchronous function, you can't trust that the
    // state functions will be processed in time to use the variables
    let territoryMessage = "";
    let actionTypeMessage = "";
    let waiverAuthorityMessage = "";

    if (!changeRequest.territory)
      territoryMessage = formInfo.fieldList.territory;
    if (!changeRequest.actionType)
      actionTypeMessage = formInfo.fieldList.actionType;
    if (!changeRequest.waiverAuthority)
      waiverAuthorityMessage = formInfo.fieldList.waiverAuthority;

    // validate the form fields and set the messages
    // because this is an asynchronous function, you can't trust that the
    // state functions will be processed in time to use the variables
    let transmittalNumberMessage = "";
    transmittalNumberMessage = validateTransmittalNumber(
      changeRequest.transmittalNumber
    );

    // check which alert to show.  Fields first, than attachments
    // if all passes, submit the form and return to dashboard
    if (transmittalNumberMessage) {
      newAlert = ALERTS_MSG.SUBMISSION_INCOMPLETE;
    } else if (!areUploadsReady) {
      newAlert = ALERTS_MSG.REQUIRED_UPLOADS_MISSING;
    } else {
      try {
        let uploadedList = await uploader.current.uploadFiles();
        await ChangeRequestDataApi.submit(changeRequest, uploadedList);
        history.push(ROUTES.DASHBOARD);
        //Alert must come last or it will be cleared after the history push.
        newAlert = ALERTS_MSG.SUBMISSION_SUCCESS;
      } catch (error) {
        newAlert = ALERTS_MSG.SUBMISSION_ERROR;
        //          setIsLoading(false);
      }
    }

    // now set the state variables to show thw error messages
    setTransmittalNumberErrorMessage(transmittalNumberMessage);
    setTerritoryErrorMessage(territoryMessage);
    setActionTypeErrorMessage(actionTypeMessage);
    setWaiverAuthorityErrorMessage(waiverAuthorityMessage);
    setAlert(newAlert);
    setIsLoading(false);
    jumpToPageTitle();
  }

  const renderTransmittalNumber = () => {
    return (
      <TransmittalNumber
        idType={formInfo.fieldList.idType}
        errorMessage={transmittalNumberErrorMessage}
        value={changeRequest.transmittalNumber}
        onChange={handleTransmittalNumberChange}
      />
    );
  };

  // Render the component conditionally when NOT in read only mode
  // OR in read only mode when change request data was successfully retrieved
  return (
    <LoadingScreen isLoading={isLoading}>
      <PageTitleBar
        heading={isReadOnly ? formInfo.pageTitle : formInfo.readOnlyPageTitle}
        text=""
      />
      {renderAlert(alert)}
      {!isReadOnly || (isReadOnly && changeRequest !== null) ? (
        <div className="form-container">
          <form
            onSubmit={handleSubmit}
            noValidate
            className={!firstTimeThrough ? "display-errors" : ""}
          >
            <h3>{formInfo.detailsHeader} Details</h3>
            <p className="req-message">
              <span className="required-mark">*</span>
              indicates required field.
            </p>
            <div className="form-card">
              {formInfo.fieldList.territory && (
                <RequiredChoice
                  fieldname="territory"
                  label="State/Territory"
                  errorMessage={territoryErrorMessage}
                  value={changeRequest.territory}
                  onChange={handleInputChange}
                />
              )}
              {formInfo.fieldList.actionType && (
                <RequiredChoice
                  fieldname="action-type"
                  label="Action Type"
                  errorMessage={actionTypeErrorMessage}
                  value={changeRequest.actionType}
                  onChange={handleInputChange}
                />
              )}
              {formInfo.fieldList.waiverAuthority && (
                <RequiredChoice
                  fieldname="waiver-authority"
                  label="Waiver Authority"
                  errorMessage={waiverAuthorityErrorMessage}
                  value={changeRequest.waiverAuthority}
                  onChange={handleInputChange}
                />
              )}
              {renderTransmittalNumber()}
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
            {isReadOnly ? (
              <FileList uploadList={changeRequest.uploads}></FileList>
            ) : (
              <FileUploader
                ref={uploader}
                requiredUploads={formInfo.requiredUploads}
                optionalUploads={formInfo.optionalUploads}
                readyCallback={uploadsReadyCallbackFunction}
                showRequiredFieldErrors={!firstTimeThrough}
              ></FileUploader>
            )}
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
              <input type="submit" className="form-submit" value="Submit" />
            )}
          </form>
        </div>
      ) : null}
    </LoadingScreen>
  );
};

SubmissionForm.propTypes = {
  formInfo: PropTypes.object.isRequired,
  changeRequestType: PropTypes.string.isRequired,
};

export default SubmissionForm;
