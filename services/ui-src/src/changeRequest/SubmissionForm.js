import React, { useRef, useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";

import { TextField, Button, Dropdown } from "@cmsgov/design-system";

import {
  latestAccessStatus,
  ChangeRequest,
  RESPONSE_CODE,
  ROUTES,
  USER_STATUS,
} from "cmscommonlib";

import { useAppContext } from "../libs/contextLib";
import config from "../utils/config";

import LoadingOverlay from "../components/LoadingOverlay";
import FileUploader from "../components/FileUploader";
import ChangeRequestDataApi from "../utils/ChangeRequestDataApi";
import PropTypes from "prop-types";
import PageTitleBar from "../components/PageTitleBar";
import TransmittalNumber from "../components/TransmittalNumber";
import AlertBar from "../components/AlertBar";
import ScrollToTop from "../components/ScrollToTop";

const leavePageConfirmMessage = "Changes you made will not be saved.";

/**
 * Submisstion Form template to allow rendering for different types of Submissions.
 * @param {String} changeRequestType - the type of change request
 */
export const SubmissionForm = ({ changeRequestType }) => {
  // for setting the alert
  const [alertCode, setAlertCode] = useState(RESPONSE_CODE.NONE);
  const {
    userProfile: { userData },
  } = useAppContext();

  const formInfo = ChangeRequest.CONFIG[changeRequestType];

  //Reference to the File Uploader.
  const uploader = useRef(null);
  // True when the required attachments have been selected.
  const [areUploadsReady, setAreUploadsReady] = useState(false);
  const [isSubmissionReady, setIsSubmissionReady] = useState(false);
  // True if we are currently submitting the form
  const [isSubmitting, setIsSubmitting] = useState(false);

  // because the transmittal number has state
  const [transmittalNumberDetails, setTransmittalNumberDetails] = useState({
    ...formInfo.transmittalNumber,
  });
  const [transmittalNumberStatusMessage, setTransmittalNumberStatusMessage] =
    useState({
      statusLevel: "error",
      statusMessage: "",
    });

  // The browser history, so we can redirect to the home page
  const history = useHistory();

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

      let formReady = false;
      if (
        (!formInfo.actionType || changeRequest.actionType) &&
        (!formInfo.waiverAuthority || changeRequest.waiverAuthority) &&
        (displayMessage.statusLevel === "warn" ||
          !displayMessage.statusMessage) &&
        areUploadsReady
      )
        formReady = true;

      setIsSubmissionReady(formReady);
    } catch (err) {
      console.log("error is: ", err);
      setAlertCode(RESPONSE_CODE[err.message]);
    }
  }, [
    areUploadsReady,
    changeRequest,
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

  function closedAlert() {
    setAlertCode(RESPONSE_CODE.NONE);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsSubmitting(isSubmissionReady);
  }

  function renderSubmissionButton() {
    return (
      <Button
        id="form-submission-button"
        aria-label="submit-form"
        className="ds-c-button ds-c-button--primary"
        disabled={!isSubmissionReady}
        onClick={handleSubmit}
        value="Submit"
      >
        Submit
      </Button>
    );
  }

  return (
    <LoadingOverlay isLoading={isSubmitting}>
      <PageTitleBar
        heading={formInfo.pageTitle}
        enableBackNav
        backNavConfirmationMessage={leavePageConfirmMessage}
        rightSideContent={renderSubmissionButton()}
      />
      <AlertBar alertCode={alertCode} closeCallback={closedAlert} />
      <div className="form-container">
        {formInfo.subheaderMessage && (
          <div className="form-subheader-message">
            <p dangerouslySetInnerHTML={formInfo.subheaderMessage} />
          </div>
        )}
        <form noValidate onSubmit={handleSubmit}>
          <h3>{formInfo.detailsHeader} Details</h3>
          <p className="req-message">
            <span className="required-mark">*</span>
            indicates required field.
          </p>
          <div className="form-card">
            {formInfo.actionType && (
              <Dropdown
                options={formInfo.actionType.optionsList}
                defaultValue={changeRequest.actionType}
                label="Action Type"
                labelClassName="ds-u-margin-top--0 required"
                fieldClassName="field"
                name="actionType"
                id="action-type"
                onChange={handleActionTypeChange}
              />
            )}
            {formInfo.waiverAuthority && (
              <Dropdown
                options={formInfo.waiverAuthority.optionsList}
                defaultValue={changeRequest.waiverAuthority}
                label="Waiver Authority"
                labelClassName="ds-u-margin-top--0 required"
                fieldClassName="field"
                name="waiverAuthority"
                id="waiver-authoritye"
                onChange={handleInputChange}
              />
            )}
            <TransmittalNumber
              idLabel={transmittalNumberDetails.idLabel}
              hintText={transmittalNumberDetails.idHintText}
              idFAQLink={transmittalNumberDetails.idFAQLink}
              statusLevel={transmittalNumberStatusMessage.statusLevel}
              statusMessage={
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
    </LoadingOverlay>
  );
};

SubmissionForm.propTypes = {
  changeRequestType: PropTypes.string.isRequired,
};

export default SubmissionForm;
