import React, {
  ChangeEvent,
  SyntheticEvent,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useHistory, useLocation } from "react-router-dom";

import { TextField, Button, Dropdown } from "@cmsgov/design-system";

import {
  ChangeRequest,
  RESPONSE_CODE,
  ROUTES,
  approvedBlueWarningMessage,
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
import { ConfirmationDialog } from "../components/ConfirmationDialog";

const leavePageConfirmMessage = "Changes you made will not be saved.";

/**
 * Parses out the two character state/territory at the beginning of the transmittal number.
 * @param transmittalNumber the transmittal number
 * @returns two character state/territory
 */
export function getTerritoryFromTransmittalNumber(
  transmittalNumber: string
): string {
  return transmittalNumber.toString().substring(0, 2);
}

type Message = {
  statusLevel: string;
  statusMessage: string;
  warningMessageCode?: string;
};

/**
 * Submisstion Form template to allow rendering for different types of Submissions.
 * @param changeRequestType - the type of change request
 */
export const SubmissionForm: React.FC<{
  changeRequestType: string;
}> = ({ changeRequestType }) => {
  // for setting the alert
  const [alertCode, setAlertCode] = useState(RESPONSE_CODE.NONE);
  const { activeTerritories } = useAppContext() ?? {};

  const formInfo = ChangeRequest.CONFIG[changeRequestType];

  //Reference to the File Uploader.
  const uploader = useRef<FileUploader>(null);
  // True when the required attachments have been selected.
  const [areUploadsReady, setAreUploadsReady] = useState(false);
  const [isSubmissionReady, setIsSubmissionReady] = useState(false);
  // True if we are currently submitting the form
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmCancel, setConfirmCancel] = useState(false);

  // because the transmittal number has state
  const [transmittalNumberDetails, setTransmittalNumberDetails] = useState({
    ...formInfo.transmittalNumber,
  });
  const [transmittalNumberStatusMessage, setTransmittalNumberStatusMessage] =
    useState<Message>({
      statusLevel: "error",
      statusMessage: "",
    });

  // The browser history, so we can redirect to the home page
  const history = useHistory();

  // Get the transmittal number from the url params if it exists
  const params = useLocation().search;
  const initialTransmittalNumber = new URLSearchParams(params).get(
    "transmittalNumber"
  );

  // The record we are using for the form.
  const [changeRequest, setChangeRequest] = useState({
    type: changeRequestType,
    territory:
      (initialTransmittalNumber &&
        getTerritoryFromTransmittalNumber(initialTransmittalNumber)) ||
      "",
    summary: "",
    transmittalNumber: initialTransmittalNumber || "", //This is needed to be able to control the field
    actionType: "",
    waiverAuthority: "",
  });

  function matchesRegex(fieldValue: string, regexFormatString: string) {
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
        (newTransmittalNumber.length >= 2 && !activeTerritories) ||
        (activeTerritories &&
          !activeTerritories.includes(
            getTerritoryFromTransmittalNumber(newTransmittalNumber)
          ))
      ) {
        errorMessage = `You can only submit for a state you have access to. If you need to add another state, visit your user profile to request access.`;
      }
      // must match the associated Regex string for format
      else if (
        transmittalNumberDetails.idRegex &&
        !matchesRegex(newTransmittalNumber, transmittalNumberDetails.idRegex)
      ) {
        errorMessage =
          `The ${transmittalNumberDetails.idLabel} must be in the format of ${transmittalNumberDetails.idFormat}` +
            transmittalNumberDetails.idAddtionalErrorMessage ?? "";
      }

      return errorMessage;
    },
    [transmittalNumberDetails, activeTerritories]
  );

  async function handleTransmittalNumberChange(newTransmittalNumber: string) {
    let updatedRecord = { ...changeRequest }; // You need a new object to be able to update the state

    updatedRecord["transmittalNumber"] = newTransmittalNumber;
    updatedRecord["territory"] =
      getTerritoryFromTransmittalNumber(newTransmittalNumber);

    setChangeRequest(updatedRecord);
  }

  const handleActionTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    if (!event || !event.target) return;

    let updatedRecord = { ...changeRequest }; // You need a new object to be able to update the state

    updatedRecord[event.target.name as keyof typeof updatedRecord] =
      event.target.value;

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

    setTransmittalNumberDetails(transmittalNumberInfo!);
    setChangeRequest(updatedRecord);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event || !event.target) return;

    let updatedRecord = { ...changeRequest }; // You need a new object to be able to update the state

    updatedRecord[event.target.name as keyof typeof updatedRecord] =
      event.target.value;

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
    let displayMessage: Message = {
      statusLevel: "error",
      statusMessage: "",
    };

    let formatMessage = {
      statusLevel: "error",
      statusMessage: validateTransmittalNumber(changeRequest.transmittalNumber),
      warningMessageCode: "",
    };

    let redMessages: Message[] = [];
    let blueMessages: Message[] = [];
    let result = false;
    try {
      if (
        formatMessage.statusMessage === "" &&
        changeRequest.transmittalNumber &&
        transmittalNumberDetails.idExistValidations
      ) {
        const promises = transmittalNumberDetails.idExistValidations.map(
          async (idExistValidation) => {
            let checkingNumber = changeRequest.transmittalNumber;

            if (idExistValidation.existenceRegex !== undefined) {
              checkingNumber =
                changeRequest.transmittalNumber.match(
                  idExistValidation.existenceRegex
                )![0] + idExistValidation.existenceAppend;
            }
            try {
              result = await ChangeRequestDataApi.packageExists(checkingNumber);
            } catch (e) {
              console.log("error message is: ", (e as Error).message);
              setAlertCode(RESPONSE_CODE[(e as Error).message]);
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
                  // tempMessage = `${transmittalNumberDetails.idLabel} not found. Please ensure you have the correct ${transmittalNumberDetails.idLabel} before submitting. Contact the MACPro Help Desk (code: ${RESPONSE_CODE.SUBMISSION_ID_NOT_FOUND_WARNING}) if you need support.`;
                  tempMessage = approvedBlueWarningMessage;
                  tempCode = RESPONSE_CODE.SUBMISSION_ID_NOT_FOUND_WARNING;
                }
                // ID exists but it should NOT exist
              } else if (dupID && !correspondingValidation.idMustExist) {
                if (correspondingValidation.errorLevel === "error") {
                  tempMessage = `According to our records, this ${transmittalNumberDetails.idLabel} already exists. Please check the ${transmittalNumberDetails.idLabel} and try entering it again.`;
                  tempCode = RESPONSE_CODE.SUBMISSION_ID_EXIST_WARNING;
                } else {
                  // tempMessage = `According to our records, this ${transmittalNumberDetails.idLabel} already exists. Please ensure you have the correct ${transmittalNumberDetails.idLabel} before submitting. Contact the MACPro Help Desk (code: ${RESPONSE_CODE.SUBMISSION_ID_EXIST_WARNING}) if you need support.`;
                  tempMessage = approvedBlueWarningMessage;
                  tempCode = RESPONSE_CODE.SUBMISSION_ID_EXIST_WARNING;
                }
              }

              // if we got a message through checking, then we should add it to the existMessages array
              const messageToAdd = {
                statusLevel: correspondingValidation.errorLevel!,
                statusMessage: tempMessage as string,
                warningMessageCode: tempCode,
              };
              if (tempMessage) {
                if (messageToAdd.statusLevel === "error")
                  redMessages.push(messageToAdd);
                else blueMessages.push(messageToAdd);
              }
            });
          })
          .then(() => {
            if (redMessages.length > 0) {
              displayMessage = redMessages[0];
            } else if (blueMessages.length > 0) {
              displayMessage = blueMessages[0];
            }
            setTransmittalNumberStatusMessage(displayMessage);
          });
      } else {
        displayMessage = formatMessage;
        setTransmittalNumberStatusMessage(displayMessage);
      }
    } catch (err) {
      console.log("error is: ", err);
      setAlertCode(RESPONSE_CODE[(err as Error).message]);
    }
  }, [
    changeRequest,
    transmittalNumberDetails,
    validateTransmittalNumber,
    alertCode,
  ]);

  useEffect(() => {
    let formReady = false;
    if (
      (!formInfo.actionType || changeRequest.actionType) &&
      (!formInfo.waiverAuthority || changeRequest.waiverAuthority) &&
      (transmittalNumberStatusMessage.statusLevel === "warn" ||
        !transmittalNumberStatusMessage.statusMessage) &&
      areUploadsReady
    )
      formReady = true;

    setIsSubmissionReady(formReady);
  }, [
    areUploadsReady,
    changeRequest,
    formInfo,
    transmittalNumberStatusMessage,
  ]);

  const limitSubmit = useRef(false);

  useEffect(() => {
    const saveForm = async () => {
      let transmittalNumberWarningMessage: string | undefined = "";

      if (
        transmittalNumberStatusMessage.statusLevel === "warn" &&
        transmittalNumberStatusMessage.statusMessage
      ) {
        transmittalNumberWarningMessage =
          transmittalNumberStatusMessage.warningMessageCode;
      }

      if (uploader.current) {
        uploader.current
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
      }
    };

    if (isSubmitting && !limitSubmit.current) {
      limitSubmit.current = true;
      saveForm();
    }
  }, [isSubmitting, transmittalNumberStatusMessage, changeRequest, alertCode]);

  function closedAlert() {
    setAlertCode(RESPONSE_CODE.NONE);
  }

  function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();

    setIsSubmitting(isSubmissionReady);
  }

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
        <form noValidate onSubmit={handleSubmit}>
          <h2>{formInfo.detailsHeader} Details</h2>
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
                id="waiver-authority"
                onChange={handleInputChange}
              />
            )}
            <TransmittalNumber
              idLabel={transmittalNumberDetails.idLabel}
              idFieldHint={transmittalNumberDetails.idFieldHint}
              idFAQLink={transmittalNumberDetails.idFAQLink}
              statusLevel={transmittalNumberStatusMessage.statusLevel}
              statusMessage={
                transmittalNumberStatusMessage.statusMessage !==
                `${transmittalNumberDetails.idLabel} Required`
                  ? transmittalNumberStatusMessage.statusMessage
                  : ""
              }
              disabled={!!initialTransmittalNumber}
              value={changeRequest.transmittalNumber}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                handleTransmittalNumberChange(event.target.value.toUpperCase())
              }
            />
          </div>
          <h3>Attachments</h3>
          <FileUploader
            ref={uploader}
            requiredUploads={formInfo.requiredUploads}
            optionalUploads={formInfo.optionalUploads}
            readyCallback={setAreUploadsReady}
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
          </div>
          <div className="form-buttons">
            <p className="submission-message">
              Once you submit this form, a confirmation email is sent to you and
              to CMS. CMS will use this content to review your package, and you
              will not be able to edit this form. If CMS needs any additional
              information, they will follow up by email. If you leave this page,
              you will lose your progress on this form.
            </p>
            <Button
              id="form-submission-button"
              aria-label="submit-form"
              className="ds-c-button ds-c-button--success"
              disabled={!isSubmissionReady}
              onClick={handleSubmit}
              value="Submit"
            >
              Submit
            </Button>
            <Button
              id="form-cancel-button"
              aria-label="cancel-form"
              className="ds-c-button ds-c-button--transparent"
              onClick={() => setConfirmCancel(true)}
            >
              Cancel
            </Button>
          </div>
        </form>
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
        {confirmCancel && (
          <ConfirmationDialog
            className=""
            acceptText="Leave Anyway"
            cancelText="Stay on Page"
            heading="Leave this page?"
            onAccept={() => history.goBack()}
            onCancel={() => setConfirmCancel(false)}
          >
            Leave this page? Changes you made will not be saved.
          </ConfirmationDialog>
        )}
      </div>
    </LoadingOverlay>
  );
};

SubmissionForm.propTypes = {
  changeRequestType: PropTypes.string.isRequired,
};

export default SubmissionForm;
