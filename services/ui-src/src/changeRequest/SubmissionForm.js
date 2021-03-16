import React, { useRef, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import FileUploader from "../components/FileUploader";
import { TextField } from "@cmsgov/design-system";
import ChangeRequestDataApi from "../utils/ChangeRequestDataApi";
import { ROUTES } from "../Routes";
import PropTypes from "prop-types";
import { ALERTS_MSG } from "../libs/alert-messages";
import PageTitleBar, { TITLE_BAR_ID } from "../components/PageTitleBar";
import { Alert } from "@cmsgov/design-system";
import TransmittalNumber from "../components/TransmittalNumber";
import RequiredChoice from "../components/RequiredChoice";
<<<<<<< HEAD
import { ERROR_MSG } from "../libs/error-messages";
import {CHANGE_REQUEST_TYPES} from "./changeRequestTypes";
=======
import { getAlert } from "../libs/error-mappings";
import { territoryList } from "../libs/territoryLib";
>>>>>>> develop

/**
 * RAI Form template to allow rendering for different types of RAI's.
 * @param {Object} formInfo - all the change request details specific to this submission
 * @param {String} changeRequestType - the type of change request
 */
const SubmissionForm = ({ formInfo, changeRequestType }) => {
  // for setting the alert
  const [alert, setAlert] = useState(ALERTS_MSG.NONE);

  // True when the required attachments have been selected.
  const [areUploadsReady, setAreUploadsReady] = useState(false);

  // because the first time through, we do not want to be annoying with the error messaging
  const [firstTimeThrough, setFirstTimeThrough] = useState(true);

<<<<<<< HEAD
  const [hasExistingSubmission, setExistingSubmission] = useState(false)
=======
>>>>>>> develop
  const [actionTypeErrorMessage, setActionTypeErrorMessage] = useState("");
  const [
    waiverAuthorityErrorMessage,
    setWaiverAuthorityErrorMessage,
  ] = useState("");
  const [
<<<<<<< HEAD
    transmittalNumberErrorMessage,
    setTransmittalNumberErrorMessage,
  ] = useState("");
=======
    transmittalNumberStatusMessage,
    setTransmittalNumberStatusMessage,
  ] = useState({
    statusLevel: "error",
    statusMessage: "",
  });
>>>>>>> develop

  // True if we are currently submitting the form or on inital load of the form
  const [isLoading, setIsLoading] = useState(false);

  // The browser history, so we can redirect to the home page
  const history = useHistory();

  //Reference to the File Uploader.
  const uploader = useRef(null);

<<<<<<< HEAD
  // The record we are using for the form.
  const [changeRequest, setChangeRequest] = useState({
    type: changeRequestType,
=======
  // because the transmittal number has state
  const [transmittalNumberDetails, setTransmittalNumberDetails] = useState({
    ...formInfo.transmittalNumber,
  });

  // The record we are using for the form.
  const [changeRequest, setChangeRequest] = useState({
    type: changeRequestType,
    territory: "",
>>>>>>> develop
    summary: "",
    transmittalNumber: "", //This is needed to be able to control the field
    actionType: "",
    waiverAuthority: "",
  });

  /**
   * Callback for the uploader to set if the upload requirements are met.
   * @param {Boolean} state true if the required uploads have been specified
   */
  function uploadsReadyCallbackFunction(state) {
    setAreUploadsReady(state);
  }

  const jumpToPageTitle = () => {
    var elmnt = document.getElementById(TITLE_BAR_ID);
    if (elmnt) elmnt.scrollIntoView();
  };

  useEffect(() => {
    let mounted = true;
    if (mounted && alert && alert.heading && alert.heading !== "") {
      jumpToPageTitle();
    }

    return function cleanup() {
      mounted = false;
    };
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
<<<<<<< HEAD
   * Check for Existing Transmittal Number
   * @param {value} Transmittal Number
   * @return false or true;
   */
  async function isExistingTransmittalID(transmittalID)
  {
    let dupID;
    try {
      dupID = await ChangeRequestDataApi.packageExists(transmittalID);
    } catch (error) {
      console.log("There was an error submitting a request.", error);
    }
    setExistingSubmission(dupID)
    return dupID;
  }
=======
   * Validate Field
   * @param {value} Transmittal Number Field Entered on Change Event.
   */
  function matchesRegex(fieldValue, regexFormatString) {
    let fieldValidationRegEx = new RegExp(regexFormatString);
    let result = false;

    if (fieldValue && fieldValidationRegEx.test(fieldValue)) {
      result = true;
    } else {
      result = false;
    }

    return result;
  }

  function validateTransmittalNumber(newTransmittalNumber) {
    let errorMessage = "";

    // Must have a value
    if (!newTransmittalNumber) {
      errorMessage = transmittalNumberDetails.idLabel + " Required";
    }
    // must have a valid state code as the first two characters
    else if (
      !territoryList.some(
        (state) => state["value"] === newTransmittalNumber.substring(0, 2)
      )
    ) {
      errorMessage =
        `The ` +
        transmittalNumberDetails.idLabel +
        ` must contain valid Territory/State Code`;
    }
    // must match the associated Regex string for format
    else if (
      !matchesRegex(newTransmittalNumber, transmittalNumberDetails.idRegex)
    ) {
      errorMessage =
        `The ` +
        transmittalNumberDetails.idLabel +
        ` must be in the format of ` +
        transmittalNumberDetails.idFormat;
    }

    return errorMessage;
  }

>>>>>>> develop
  /**
   * Handle changes to the ID.
   * @param {Object} event the event
   */
  async function handleTransmittalNumberChange(event) {
    if (!event || !event.target) return;

<<<<<<< HEAD
    let updatedRecord = { ...changeRequest }; // You need a new object to be able to update the state
    updatedRecord[event.target.name] = event.target.value;
    updatedRecord["territory"] =    event.target.value.toString().substring(0,2)
    setChangeRequest(updatedRecord);

    const newTransmittalNumber = event.target.value;
    let errorMessage


    // when we have a valid ID, check for exists/not exists based on type
    if (errorMessage === undefined && newTransmittalNumber) {

      errorMessage = formInfo.idValidationFn(updatedRecord["transmittalNumber"], await isExistingTransmittalID(newTransmittalNumber), updatedRecord, formInfo)

    }
    setTransmittalNumberErrorMessage(errorMessage);
  }
=======
    let newTransmittalNumber = event.target.value.toUpperCase();
    let updatedRecord = { ...changeRequest }; // You need a new object to be able to update the state
    updatedRecord[event.target.name] = newTransmittalNumber;
    updatedRecord["territory"] = newTransmittalNumber
      .toString()
      .substring(0, 2);

    // validate that the ID is in correct format
    let newMessage = {
      statusLevel: "error",
      statusMessage: "",
    };

    newMessage.statusMessage = validateTransmittalNumber(newTransmittalNumber);

    // if the ID is valid, check if exists/not exist in data
    if (newMessage.statusMessage === "") {
      newMessage.statusLevel = transmittalNumberDetails.errorLevel;
      try {
        if (transmittalNumberDetails.existenceRegex !== undefined) {
          newTransmittalNumber = newTransmittalNumber.match(transmittalNumberDetails.existenceRegex)[0];
        } 
        const dupID = await ChangeRequestDataApi.packageExists(
          newTransmittalNumber
        );

        if (!dupID && transmittalNumberDetails.idMustExist) {
          if (transmittalNumberDetails.errorLevel === "error") {
            newMessage.statusMessage =
            "According to our records, this " +
            transmittalNumberDetails.idLabel +
            " does not exist. Please check the " +
            transmittalNumberDetails.idLabel +
            " and try entering it again.";
          } else {
            newMessage.statusMessage =
            transmittalNumberDetails.idLabel +
            " not found. Please ensure you have the correct " +
            transmittalNumberDetails.idLabel +
            " before submitting. Contact the MACPro Help Desk (code: OMP002) if you need support.";
          }
        } else if (dupID && !transmittalNumberDetails.idMustExist) {
          if (transmittalNumberDetails.errorLevel === "error") {
            newMessage.statusMessage =
              "According to our records, this " +
              transmittalNumberDetails.idLabel +
              " already exists. Please check the " +
              transmittalNumberDetails.idLabel +
              " and try entering it again.";
          } else {
            newMessage.statusMessage =
              "Please ensure you have the correct " +
              transmittalNumberDetails.idLabel +
              " before submitting.  Contact the MACPro Help Desk (code: OMP003) if you need support.";
          }
        }
      } catch (error) {
        console.log("There was an error submitting a request.", error);
      }
    }

    setChangeRequest(updatedRecord);
    setTransmittalNumberStatusMessage(newMessage);
  }

  /**
   * Handle changes to the action type.
   * @param {Object} event the event
   */
  const handleActionTypeChange = (event) => {
    if (!event || !event.target) return;

    let updatedRecord = { ...changeRequest }; // You need a new object to be able to update the state

    updatedRecord[event.target.name] = event.target.value;
    let actionTypeMessage = "";

    if (!firstTimeThrough) {
      if (formInfo.actionType && !updatedRecord.actionType)
        actionTypeMessage = formInfo.actionType.errorMessage;
    }

    let transmittalNumberInfo;

    switch (updatedRecord.actionType) {
      case "new":
        transmittalNumberInfo = formInfo.newTransmittalNumber;
        break;
      case "amendment":
        transmittalNumberInfo = formInfo.amendmentTransmittalNumber;
        break;
      case "renewal":
        transmittalNumberInfo = formInfo.renewalTransmittalNumber;
        break;
      default:
        transmittalNumberInfo = formInfo.transmittalNumber;
        break;
    }

    setChangeRequest(updatedRecord);
    setActionTypeErrorMessage(actionTypeMessage);
    setTransmittalNumberDetails(transmittalNumberInfo);
  };
>>>>>>> develop

  /**
   * Handle changes to the form.
   * @param {Object} event the event
   */
  const handleInputChange = (event) => {
    if (!event || !event.target) return;

    let updatedRecord = { ...changeRequest }; // You need a new object to be able to update the state

    updatedRecord[event.target.name] = event.target.value;
<<<<<<< HEAD
    let actionTypeMessage = "";
    let waiverAuthorityMessage = "";

    if (!firstTimeThrough) {
      if (formInfo.actionType && !updatedRecord.actionType)
        actionTypeMessage = formInfo.actionType.errorMessage;
=======
    let waiverAuthorityMessage = "";

    if (!firstTimeThrough) {
>>>>>>> develop
      if (formInfo.waiverAuthority && !updatedRecord.waiverAuthority)
        waiverAuthorityMessage = formInfo.waiverAuthority.errorMessage;
    }

    if (event.target.name !== "summary") {
<<<<<<< HEAD
      updatedRecord["transmittalNumber"] = ""
      actionTypeMessage = ""
=======
      updatedRecord["transmittalNumber"] = "";
>>>>>>> develop
    }

    // state set functions have to be at top level
    // because we can't trust they got set, can't use them in the function

    setChangeRequest(updatedRecord);
<<<<<<< HEAD
    setActionTypeErrorMessage(actionTypeMessage);
    setWaiverAuthorityErrorMessage(waiverAuthorityMessage);

=======
    setWaiverAuthorityErrorMessage(waiverAuthorityMessage);
>>>>>>> develop
  };

  /**
   * Submit the new change request.
   * @param {Object} event the click event
   */
  async function handleSubmit(event) {
    event.preventDefault();

    // in case form validation takes a while (external validation)
    setIsLoading(true);

    // once Submit is clicked, show error messages
    setFirstTimeThrough(false);

    // validate the form fields and set the messages
    // because this is an asynchronous function, you can't trust that the
    let actionTypeMessage = "";
    let waiverAuthorityMessage = "";
<<<<<<< HEAD
    let transmittalNumberMessage = "";
    let newAlert = null;
    let mounted = true;


    transmittalNumberMessage = formInfo.idValidationFn(changeRequest.transmittalNumber, hasExistingSubmission, changeRequest, formInfo);

    if (formInfo.idType === CHANGE_REQUEST_TYPES.WAIVER
        || CHANGE_REQUEST_TYPES.WAIVER_EXTENSION
        || CHANGE_REQUEST_TYPES.WAIVER_RAI)
    {

      if (formInfo.actionType && !changeRequest.actionType) {
        actionTypeMessage = formInfo.actionType.errorMessage;
      }

      if (formInfo.waiverAuthority && !changeRequest.waiverAuthority) {
        waiverAuthorityMessage = formInfo.waiverAuthority.errorMessage;
      }
=======
    let newAlert = null;
    let mounted = true;
    const uploadRef = uploader.current;
    let newMessage = {
      statusLevel: "error",
      statusMessage: "",
    };

    newMessage.statusMessage = validateTransmittalNumber(
      changeRequest.transmittalNumber
    );

    // if the ID is valid, check if exists/not exist in data
    // warnings are allowed to submit
    if (
      newMessage.statusMessage === "" &&
      transmittalNumberDetails.errorLevel === "error"
    ) {
      try {
        const dupID = await ChangeRequestDataApi.packageExists(
          changeRequest.transmittalNumber
        );
        if (!dupID && transmittalNumberDetails.idMustExist) {
          newMessage.statusMessage = `According to our records, this ${transmittalNumberDetails.idLabel} does not exist. Please check the ${transmittalNumberDetails.idLabel} and try entering it again.`;
          newAlert = ALERTS_MSG.SUBMISSION_ID_NOT_FOUND;
        } else if (dupID && !transmittalNumberDetails.idMustExist) {
          newMessage.statusMessage = `According to our records, this ${transmittalNumberDetails.idLabel} already exists. Please check the ${transmittalNumberDetails.idLabel} and try entering it again.`;
          newAlert = ALERTS_MSG.SUBMISSION_DUPLICATE_ID;
        }
      } catch (err) {
        console.log("There was an error submitting a request.", err);
      }
    }

    if (formInfo.actionType && !changeRequest.actionType) {
      actionTypeMessage = formInfo.actionType.errorMessage;
    }

    if (formInfo.waiverAuthority && !changeRequest.waiverAuthority) {
      waiverAuthorityMessage = formInfo.waiverAuthority.errorMessage;
>>>>>>> develop
    }

    // check which alert to show.  Fields first, than attachments
    // if all passes, submit the form and return to dashboard
<<<<<<< HEAD
    if (transmittalNumberMessage) {
      newAlert = ALERTS_MSG.SUBMISSION_INCOMPLETE;
=======
    if (
      newMessage.statusMessage ||
      actionTypeMessage ||
      waiverAuthorityMessage
    ) {
      if (!newAlert) newAlert = ALERTS_MSG.SUBMISSION_INCOMPLETE;
>>>>>>> develop
    } else if (!areUploadsReady) {
      newAlert = ALERTS_MSG.REQUIRED_UPLOADS_MISSING;
    } else {
      try {
<<<<<<< HEAD
        let uploadedList = await uploader.current.uploadFiles();
        console.log("changeRequest is: ", changeRequest);
        const aresponse = await ChangeRequestDataApi.submit(changeRequest, uploadedList);
        console.log("Response is: ", aresponse);
        if (!aresponse.error) {
          newAlert = ALERTS_MSG.SUBMISSION_SUCCESS;
        } else switch (aresponse.error) {
          case ERROR_MSG.TRANSMITTAL_ID_TERRITORY_NOT_VALID:
            newAlert = ALERTS_MSG.SUBMISSION_TERRITORY_ERROR;
            break;
          case ERROR_MSG.DUPLICATE_ID:
            newAlert = ALERTS_MSG.SUBMISSION_DUPLICATE_ID;
            break;
          case ERROR_MSG.ID_NOT_FOUND:
            newAlert = ALERTS_MSG.SUBMISSION_ID_NOT_FOUND;
            break;
          case ERROR_MSG.WAIVER_RENEWAL_ID:
            newAlert = ALERTS_MSG.WAIVER_RENEWAL_ID;
            break;
          case ERROR_MSG.WAIVER_AMENDMENT_ON_K:
            newAlert = ALERTS_MSG.WAIVER_AMENDMENT_ON_K;
            break;
          case ERROR_MSG.WAIVER_NEW_ON_K:
            newAlert = ALERTS_MSG.WAIVER_NEW_ON_K;
            break;
          case ERROR_MSG.WAIVER_NEW_NOT_K:
            newAlert = ALERTS_MSG.WAIVER_NEW_NOT_K;
            break;
          case ERROR_MSG.WAIVER_ACTION_UNKNOWN:
            newAlert = ALERTS_MSG.WAIVER_ACTION_UNKNOWN;
            break;
          default:
            newAlert = ALERTS_MSG.SUBMISSION_ERROR;
            break;
        }
      } catch (error) {
        console.log("Error is: ", error);
        newAlert = ALERTS_MSG.SUBMISSION_ERROR;
      }
    }
    if (newAlert === ALERTS_MSG.SUBMISSION_SUCCESS) {
      mounted=false;
      history.push({
        pathname: ROUTES.DASHBOARD,
        query: "?query=abc",
        state: {
          showAlert: ALERTS_MSG.SUBMISSION_SUCCESS,
        },
      });
    }

    // now set the state variables to show thw error messages
    if (mounted) setTransmittalNumberErrorMessage(transmittalNumberMessage);
=======
        const uploadedList = await uploadRef.uploadFiles();
        try {
          const returnCode = await ChangeRequestDataApi.submit(
            changeRequest,
            uploadedList
          );
          newAlert = getAlert(returnCode);

          if (newAlert === ALERTS_MSG.SUBMISSION_SUCCESS) {
            mounted = false;
            history.push({
              pathname: ROUTES.DASHBOARD,
              query: "?query=abc",
              state: {
                showAlert: ALERTS_MSG.SUBMISSION_SUCCESS,
              },
            });
          }
        } catch (err) {
          newAlert = ALERTS_MSG.CONTACT_HELP_DESK;
          console.log("submit caught error: ", err);
        }
      } catch (err) {
        newAlert = ALERTS_MSG.CONTACT_HELP_DESK;
        console.log("uploadFiles() caught error: ", err);
      }
    }

    // now set the state variables to show the error messages
    if (mounted)
      setTransmittalNumberStatusMessage(newMessage);
>>>>>>> develop
    if (mounted) setActionTypeErrorMessage(actionTypeMessage);
    if (mounted) setWaiverAuthorityErrorMessage(waiverAuthorityMessage);
    if (mounted) setAlert(newAlert);
    if (mounted) setIsLoading(false);
    if (mounted) jumpToPageTitle();
  }

<<<<<<< HEAD
  const renderTransmittalNumber = () => {
    return (
      <TransmittalNumber
        idType={formInfo.idType}
        errorMessage={transmittalNumberErrorMessage}
        value={changeRequest.transmittalNumber}
        onChange={handleTransmittalNumberChange}
      />
    );
  };

=======
>>>>>>> develop
  // Render the component conditionally when NOT in read only mode
  // OR in read only mode when change request data was successfully retrieved
  return (
    <LoadingScreen isLoading={isLoading}>
<<<<<<< HEAD
      <PageTitleBar
        heading={formInfo.pageTitle}
        text=""
      />
      {renderAlert(alert)}
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
              {formInfo.actionType && (
                <RequiredChoice
                  fieldInfo={formInfo.actionType}
                  label="Action Type"
                  errorMessage={actionTypeErrorMessage}
                  value={changeRequest.actionType}
                  onChange={handleInputChange}
                />
              )}
              {formInfo.waiverAuthority && (
                <RequiredChoice
                  fieldInfo={formInfo.waiverAuthority}
                  label="Waiver Authority"
                  errorMessage={waiverAuthorityErrorMessage}
                  value={changeRequest.waiverAuthority}
                  onChange={handleInputChange}
                />
              )}
              {renderTransmittalNumber()}
            </div>
            <h3>Attachments</h3>
              <FileUploader
                ref={uploader}
                requiredUploads={formInfo.requiredUploads}
                optionalUploads={formInfo.optionalUploads}
                readyCallback={uploadsReadyCallbackFunction}
                showRequiredFieldErrors={!firstTimeThrough}
              ></FileUploader>
            <div className="summary-box">
              <TextField
                name="summary"
                label="Summary"
                fieldClassName="summary-field"
                multiline
                onChange={handleInputChange}
                value={changeRequest.summary}
              ></TextField>
            </div>
              <input type="submit" className="form-submit" value="Submit" />
          </form>
        </div>
=======
      <PageTitleBar heading={formInfo.pageTitle} text="" />
      {renderAlert(alert)}
      <div className="form-container">
        {formInfo.subheaderMessage && <div className="form-subheader-message">{formInfo.subheaderMessage}</div>}
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
            {formInfo.actionType && (
              <RequiredChoice
                fieldInfo={formInfo.actionType}
                label="Action Type"
                errorMessage={actionTypeErrorMessage}
                value={changeRequest.actionType}
                onChange={handleActionTypeChange}
              />
            )}
            {formInfo.waiverAuthority && (
              <RequiredChoice
                fieldInfo={formInfo.waiverAuthority}
                label="Waiver Authority"
                errorMessage={waiverAuthorityErrorMessage}
                value={changeRequest.waiverAuthority}
                onChange={handleInputChange}
              />
            )}
            <TransmittalNumber
              idLabel={transmittalNumberDetails.idLabel}
              hintText={transmittalNumberDetails.idHintText}
              idFAQLink={transmittalNumberDetails.idFAQLink}
              statusLevel={transmittalNumberStatusMessage.statusLevel}
              statusMessage={transmittalNumberStatusMessage.statusMessage}
              value={changeRequest.transmittalNumber}
              onChange={handleTransmittalNumberChange}
            />
          </div>
          <h3>Attachments</h3>
          <FileUploader
            ref={uploader}
            requiredUploads={formInfo.requiredUploads}
            optionalUploads={formInfo.optionalUploads}
            readyCallback={uploadsReadyCallbackFunction}
            showRequiredFieldErrors={!firstTimeThrough}
          ></FileUploader>
          <div className="summary-box">
            <TextField
              name="summary"
              label="Additional Information"
              fieldClassName="summary-field"
              multiline
              onChange={handleInputChange}
              value={changeRequest.summary}
            ></TextField>
          </div>
          <input type="submit" className="form-submit" value="Submit" />
        </form>
      </div>
>>>>>>> develop
    </LoadingScreen>
  );
};

SubmissionForm.propTypes = {
  formInfo: PropTypes.object.isRequired,
  changeRequestType: PropTypes.string.isRequired,
};

export default SubmissionForm;
