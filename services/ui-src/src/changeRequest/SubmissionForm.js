import React, { useRef, useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import LoadingOverlay from "../components/LoadingOverlay";
import FileUploader from "../components/FileUploader";
import { TextField } from "@cmsgov/design-system";
import ChangeRequestDataApi from "../utils/ChangeRequestDataApi";
import {
  latestAccessStatus,
  ChangeRequest,
  RESPONSE_CODE,
  ROUTES,
  USER_STATUS,
} from "cmscommonlib";
import PropTypes from "prop-types";
import PageTitleBar from "../components/PageTitleBar";
import { ConfirmationDialog } from "../components/ConfirmationDialog";
import TransmittalNumber from "../components/TransmittalNumber";
import RequiredChoice from "../components/RequiredChoice";
import AlertBar from "../components/AlertBar";
import { useAppContext } from "../libs/contextLib";
import { useFlag } from "../libs/hooksLib";
import ScrollToTop from "../components/ScrollToTop";
import config from "../utils/config";

const leavePageConfirmMessage = "Changes you made will not be saved.";

/**
 * RAI Form template to allow rendering for different types of RAI's.
 * @param {String} changeRequestType - the type of change request
 */
export const SubmissionForm = ({ changeRequestType }) => {
  // for setting the alert
  const [alertCode, setAlertCode] = useState(RESPONSE_CODE.NONE);
  const [
    showCancelConfirmation,
    closeCancelConfirmation,
    openCancelConfirmation,
  ] = useFlag();
  const {
    userProfile: { userData },
  } = useAppContext();

  // True when the required attachments have been selected.
  const [areUploadsReady, setAreUploadsReady] = useState(false);

  // because the first time through, we do not want to be annoying with the error messaging
  const [firstTimeThrough, setFirstTimeThrough] = useState(true);

  const formInfo = ChangeRequest.CONFIG[changeRequestType];
  const [actionTypeErrorMessage, setActionTypeErrorMessage] = useState(
    formInfo?.actionType?.errorMessage
  );
  const [waiverAuthorityErrorMessage, setWaiverAuthorityErrorMessage] =
    useState("");

  // Rename to Display instead of status messsage ?
  const [transmittalNumberStatusMessage, setTransmittalNumberStatusMessage] =
    useState({
      statusLevel: "error",
      statusMessage: "",
    });

  // True if we are currently submitting the form
  const [isSubmitting, setIsSubmitting] = useState(false);

  // The browser history, so we can redirect to the home page
  const history = useHistory();

  //Reference to the File Uploader.
  const uploader = useRef(null);

  // because the transmittal number has state
  const [transmittalNumberDetails, setTransmittalNumberDetails] = useState({
    ...formInfo.transmittalNumber,
  });

  // The record we are using for the form.
  const [changeRequest, setChangeRequest] = useState({
    type: changeRequestType,
    territory: "",
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

  /**
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

  const validateTransmittalNumber = useCallback(
    (newTransmittalNumber) => {
      let errorMessage = "";

      // Must have a value
      if (!newTransmittalNumber) {
        errorMessage = `${transmittalNumberDetails.idLabel} Required`;
      }
      // state code must be on the User's active state list
      else if (
        newTransmittalNumber.length >= 2 &&
        latestAccessStatus(userData, newTransmittalNumber.substring(0, 2)) !==
          USER_STATUS.ACTIVE
      ) {
        errorMessage = `You can only submit for a state you have access to. If you need to add another state, visit your user profile to request access.`;
      }
      // must match the associated Regex string for format
      else if (
        !matchesRegex(newTransmittalNumber, transmittalNumberDetails.idRegex)
      ) {
        errorMessage = `The ${transmittalNumberDetails.idLabel} must be in the format of ${transmittalNumberDetails.idFormat}`;
      }

      return errorMessage;
    },
    [transmittalNumberDetails, userData]
  );

  /**
   * Handle changes to the ID.
   * @param {Object} event the event
   */
  async function handleTransmittalNumberChange(newTransmittalNumber) {
    let updatedRecord = { ...changeRequest }; // You need a new object to be able to update the state
    updatedRecord["transmittalNumber"] = newTransmittalNumber;
    updatedRecord["territory"] = newTransmittalNumber
      .toString()
      .substring(0, 2);
    setChangeRequest(updatedRecord);
  }

  /**
   * Handle changes to the action type.
   * @param {Object} event the event
   */
  const handleActionTypeChange = (event) => {
    if (!event || !event.target) return;

    let updatedRecord = { ...changeRequest }; // You need a new object to be able to update the state

    updatedRecord[event.target.name] = event.target.value;

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

    setTransmittalNumberDetails(transmittalNumberInfo);
    setChangeRequest(updatedRecord);
  };

  /**
   * Handle changes to the form.
   * @param {Object} event the event
   */
  const handleInputChange = (event) => {
    if (!event || !event.target) return;

    let updatedRecord = { ...changeRequest }; // You need a new object to be able to update the state

    updatedRecord[event.target.name] = event.target.value;

    setChangeRequest(updatedRecord);
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });

    if (alertCode === RESPONSE_CODE.SUCCESSFULLY_SUBMITTED) {
      history.push({
        pathname: ROUTES.DASHBOARD,
        state: {
          passCode: alertCode,
        },
      });
    }
  }, [alertCode, history]);

  useEffect(() => {
    let waiverAuthorityMessage = formInfo?.waiverAuthority?.errorMessage;
    let actionTypeMessage = formInfo?.actionType?.errorMessage;

    if (changeRequest.actionType) actionTypeMessage = "";

    if (changeRequest.waiverAuthority) waiverAuthorityMessage = "";

    // default display message settings with empty message
    let displayMessage = {
      statusLevel: "error",
      statusMessage: "",
    };

    let formatMessage = {
      statusLevel: "error",
      statusMessage: validateTransmittalNumber(changeRequest.transmittalNumber),
      warningMessageCode: "",
    };

    let existMessages = [];
    let result = false;
    try {
      if (
        formatMessage.statusMessage === "" &&
        changeRequest.transmittalNumber
      ) {
        const promises = transmittalNumberDetails.idExistValidations.map(
          async (idExistValidation) => {
            let checkingNumber = changeRequest.transmittalNumber;

            if (idExistValidation.existenceRegex !== undefined) {
              checkingNumber = changeRequest.transmittalNumber.match(
                idExistValidation.existenceRegex
              )[0];
            }
            try {
              result = await ChangeRequestDataApi.packageExists(checkingNumber);
            } catch (e) {
              console.log("error message is: ", e.message);
              setAlertCode(RESPONSE_CODE[e.message]);
            }
            return result;
          }
        );

        Promise.all(promises)
          .then((results) => {
            results.forEach((dupID, key) => {
              const correspondingValidation =
                transmittalNumberDetails.idExistValidations[key];
              let tempMessage, tempCode;

              // ID does not exist but it should exist
              if (!dupID && correspondingValidation.idMustExist) {
                if (correspondingValidation.errorLevel === "error") {
                  tempMessage = `According to our records, this ${transmittalNumberDetails.idLabel} does not exist. Please check the ${transmittalNumberDetails.idLabel} and try entering it again.`;
                } else {
                  tempMessage = `${transmittalNumberDetails.idLabel} not found. Please ensure you have the correct ${transmittalNumberDetails.idLabel} before submitting. Contact the MACPro Help Desk (code: ${RESPONSE_CODE.SUBMISSION_ID_NOT_FOUND_WARNING}) if you need support.`;
                  tempCode = RESPONSE_CODE.SUBMISSION_ID_NOT_FOUND_WARNING;
                }
                // ID exists but it should NOT exist
              } else if (dupID && !correspondingValidation.idMustExist) {
                if (correspondingValidation.errorLevel === "error") {
                  tempMessage = `According to our records, this ${transmittalNumberDetails.idLabel} already exists. Please check the ${transmittalNumberDetails.idLabel} and try entering it again.`;
                  tempCode = RESPONSE_CODE.SUBMISSION_ID_EXIST_WARNING;
                } else {
                  tempMessage = `According to our records, this ${transmittalNumberDetails.idLabel} already exists. Please ensure you have the correct ${transmittalNumberDetails.idLabel} before submitting. Contact the MACPro Help Desk (code: ${RESPONSE_CODE.SUBMISSION_ID_EXIST_WARNING}) if you need support.`;
                  tempCode = RESPONSE_CODE.SUBMISSION_ID_EXIST_WARNING;
                }
              }

              // if we got a message through checking, then we should add it to the existMessages array
              const messageToAdd = {
                statusLevel: correspondingValidation.errorLevel,
                statusMessage: tempMessage,
                warningMessageCode: tempCode,
              };
              tempMessage && existMessages.push(messageToAdd);
            });
          })
          .then(() => {
            if (existMessages.length > 0) {
              displayMessage = existMessages[0];
              setTransmittalNumberStatusMessage(displayMessage);
            } else {
              setTransmittalNumberStatusMessage(displayMessage);
            }
          });
      } else {
        displayMessage = formatMessage;
        setTransmittalNumberStatusMessage(displayMessage);
      }

      setWaiverAuthorityErrorMessage(waiverAuthorityMessage);
      setActionTypeErrorMessage(actionTypeMessage);
    } catch (err) {
      console.log("error is: ", err);
      setAlertCode(RESPONSE_CODE[err.message]);
    }
  }, [
    changeRequest,
    changeRequest.transmittalNumber,
    formInfo,
    transmittalNumberDetails,
    validateTransmittalNumber,
    alertCode,
  ]);

  const limitSubmit = useRef(false);

  useEffect(() => {
    const saveForm = async () => {
      let uploadRef = uploader.current;
      let transmittalNumberWarningMessage = "";

      if (
        transmittalNumberStatusMessage.statusLevel === "warn" &&
        transmittalNumberStatusMessage.statusMessage
      ) {
        transmittalNumberWarningMessage =
          transmittalNumberStatusMessage.warningMessageCode;
      }

      uploadRef
        .uploadFiles()
        .then((uploadedList) => {
          return ChangeRequestDataApi.submit(
            { ...changeRequest, transmittalNumberWarningMessage },
            uploadedList
          );
        })
        .then((returnCode) => {
          setAlertCode(returnCode);
        })
        .catch((err) => {
          console.log("error is: ", err);
          setAlertCode(RESPONSE_CODE[err.message]);
        })
        .finally(() => {
          setIsSubmitting(false);
          limitSubmit.current = false;
        });
    };

    if (isSubmitting && !limitSubmit.current) {
      limitSubmit.current = true;
      saveForm();
    }
  }, [
    isSubmitting,
    transmittalNumberStatusMessage,
    changeRequest,
    uploader,
    alertCode,
  ]);

  /**
   * Submit the new change request.
   * @param {Object} event the click event
   */
  async function handleSubmit(event) {
    event.preventDefault();

    let newAlertCode = RESPONSE_CODE.NONE;
    let readyToSubmit = false;

    setFirstTimeThrough(false);
    if (
      (transmittalNumberStatusMessage.statusLevel === "error" &&
        transmittalNumberStatusMessage.statusMessage) ||
      actionTypeErrorMessage ||
      waiverAuthorityErrorMessage
    ) {
      newAlertCode = RESPONSE_CODE.DATA_MISSING;
    } else if (!areUploadsReady) {
      newAlertCode = RESPONSE_CODE.ATTACHMENTS_MISSING;
    } else {
      readyToSubmit = true;
    }

    // if we would get the same alert message, alert bar does not know to show itself
    // have to do at submit, because when tried to get AlertBar to recognize situation
    // it was showing itself on every form change (ie, selecting Waiver Authority)
    if (newAlertCode === alertCode) window.scrollTo({ top: 0 });

    setAlertCode(newAlertCode);
    setIsSubmitting(readyToSubmit);
  }

  function closedAlert() {
    setAlertCode(RESPONSE_CODE.NONE);
  }

  // Render the component conditionally when NOT in read only mode
  // OR in read only mode when change request data was successfully retrieved
  return (
    <LoadingOverlay isLoading={isSubmitting}>
      <PageTitleBar
        heading={formInfo.pageTitle}
        enableBackNav
        backNavConfirmationMessage={leavePageConfirmMessage}
      />
      <AlertBar alertCode={alertCode} closeCallback={closedAlert} />
      <div className="form-container">
        {formInfo.subheaderMessage && (
          <div className="form-subheader-message">
            <p dangerouslySetInnerHTML={formInfo.subheaderMessage} />
          </div>
        )}
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
                errorMessage={!firstTimeThrough ? actionTypeErrorMessage : ""}
                value={changeRequest.actionType}
                onChange={handleActionTypeChange}
              />
            )}
            {formInfo.waiverAuthority && (
              <RequiredChoice
                fieldInfo={formInfo.waiverAuthority}
                label="Waiver Authority"
                errorMessage={
                  !firstTimeThrough ? waiverAuthorityErrorMessage : ""
                }
                value={changeRequest.waiverAuthority}
                onChange={handleInputChange}
              />
            )}
            <TransmittalNumber
              idLabel={transmittalNumberDetails.idLabel}
              hintText={transmittalNumberDetails.idHintText}
              idFAQLink={transmittalNumberDetails.idFAQLink}
              statusLevel={transmittalNumberStatusMessage.statusLevel}
              statusMessage={
                !firstTimeThrough ||
                transmittalNumberStatusMessage.statusMessage !==
                  `${transmittalNumberDetails.idLabel} Required`
                  ? transmittalNumberStatusMessage.statusMessage
                  : ""
              }
              value={changeRequest.transmittalNumber}
              onChange={(event) =>
                handleTransmittalNumberChange(event.target.value.toUpperCase())
              }
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
              hint="Add anything else that you would like to share with CMS."
              disabled={isSubmitting}
              fieldClassName="summary-field"
              multiline
              onChange={handleInputChange}
              value={changeRequest.summary}
              maxLength={config.MAX_ADDITIONAL_INFO_LENGTH}
            ></TextField>
            <div className="char-count">
              {changeRequest.summary.length}/{config.MAX_ADDITIONAL_INFO_LENGTH}
            </div>
          </div>
          <input
            type="submit"
            disabled={isSubmitting}
            className="form-submit"
            value="Submit"
          />
          <button
            onClick={openCancelConfirmation}
            disabled={isSubmitting}
            className="submission-form-cancel-button"
            type="button"
          >
            Cancel
          </button>
        </form>
        <ScrollToTop />
        <div className="faq-container">
          <span>Do you have questions or need support?</span>
          <a
            target="new"
            href={ROUTES.FAQ_TOP}
            className="ds-c-button ds-c-button--primary ds-u-text-decoration--none"
          >
            View FAQ
          </a>
        </div>
      </div>
      {showCancelConfirmation && (
        <ConfirmationDialog
          acceptText="Confirm"
          cancelText="Keep Editing"
          heading="Cancel submission?"
          onAccept={() => history.replace(ROUTES.DASHBOARD)}
          onCancel={closeCancelConfirmation}
          size="wide"
        >
          {leavePageConfirmMessage}
        </ConfirmationDialog>
      )}
    </LoadingOverlay>
  );
};

SubmissionForm.propTypes = {
  changeRequestType: PropTypes.string.isRequired,
};

export default SubmissionForm;
