import React, {
  ChangeEvent,
  SyntheticEvent,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Input } from "rsuite";

import { TextField, Button, Dropdown, Review } from "@cmsgov/design-system";

import { RESPONSE_CODE, ROUTES } from "cmscommonlib";

import { useAppContext } from "../libs/contextLib";
import { OneMACFormConfig, defaultWaiverAuthority } from "../libs/formLib";
import config from "../utils/config";

import LoadingOverlay from "../components/LoadingOverlay";
import FileUploader from "../components/FileUploader";
import ChangeRequestDataApi from "../utils/ChangeRequestDataApi";
import PackageApi from "../utils/PackageApi";
import PageTitleBar from "../components/PageTitleBar";
import AlertBar from "../components/AlertBar";
import { ConfirmationDialog } from "../components/ConfirmationDialog";
import { FormLocationState } from "../domain-types";
import ComponentId from "../components/ComponentId";

const leavePageConfirmMessage = "Changes you made will not be saved.";

/**
 * Parses out the two character state/territory at the beginning of the component id (transmittal number).
 * @param componentId the component id
 * @returns two character state/territory
 */
function getTerritoryFromComponentId(componentId: string): string {
  return componentId?.toString().substring(0, 2) ?? "";
}

type Message = {
  statusLevel: string;
  statusMessage: string;
  warningMessageCode?: string;
};

export type OneMacFormData = {
  territory: string;
  additionalInformation: string;
  componentId: string;
  waiverAuthority?: string;
  proposedEffectiveDate?: string;
  parentId?: string;
  parentType?: string;
};

/**
 * Submisstion Form template to allow rendering for different types of Submissions.
 */
const OneMACForm: React.FC<{ formConfig: OneMACFormConfig }> = ({
  formConfig,
}) => {
  // for setting the alert
  const [alertCode, setAlertCode] = useState(RESPONSE_CODE.NONE);
  const { activeTerritories } = useAppContext() ?? {};
  const location = useLocation<FormLocationState>();

  //Reference to the File Uploader.
  const uploader = useRef<FileUploader>(null);
  // True when the required attachments have been selected.
  const [areUploadsReady, setAreUploadsReady] = useState(false);
  const [isSubmissionReady, setIsSubmissionReady] = useState(false);
  // True if we are currently submitting the form
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmCancel, setConfirmCancel] = useState(false);

  const [transmittalNumberStatusMessage, setTransmittalNumberStatusMessage] =
    useState<Message>({
      statusLevel: "error",
      statusMessage: "",
    });

  // The browser history, so we can redirect to the home page
  const history = useHistory();

  const presetComponentId = location.state?.componentId ?? "";

  // The record we are using for the form.
  const [oneMacFormData, setOneMacFormData] = useState<OneMacFormData>({
    territory: getTerritoryFromComponentId(presetComponentId),
    additionalInformation: "",
    componentId: presetComponentId,
    waiverAuthority: undefined,
    proposedEffectiveDate: undefined,
    parentId: location.state?.parentId,
    parentType: location.state?.parentType,
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

  const validateComponentId = useCallback(
    (componentId) => {
      let errorMessage = "";

      // Must have a value
      if (!componentId) {
        errorMessage = `${formConfig.idLabel} Required`;
      }
      // state code must be on the User's active state list
      else if (
        (componentId.length >= 2 && !activeTerritories) ||
        (activeTerritories &&
          !activeTerritories.includes(getTerritoryFromComponentId(componentId)))
      ) {
        errorMessage = `You can only submit for a state you have access to. If you need to add another state, visit your user profile to request access.`;
      }
      // must match the associated Regex string for format
      else if (
        formConfig.idRegex &&
        !matchesRegex(componentId, formConfig.idRegex)
      ) {
        errorMessage = `The ${formConfig.idLabel} must be in the format of ${formConfig.idFormat}`;
      }

      return errorMessage;
    },
    [
      activeTerritories,
      formConfig.idFormat,
      formConfig.idLabel,
      formConfig.idRegex,
    ]
  );

  async function handleComponentIdChange(componentId: string) {
    let updatedRecord = { ...oneMacFormData } as OneMacFormData; // You need a new object to be able to update the state

    updatedRecord.componentId = componentId;
    updatedRecord.territory = getTerritoryFromComponentId(componentId);

    //if this is a child type form and no parentId was passed in state then determine parentId based on componentId
    if (
      typeof formConfig.getParentInfo == "function" &&
      !location.state?.parentId
    ) {
      [updatedRecord.parentId, updatedRecord.parentType] =
        formConfig.getParentInfo(updatedRecord.componentId);
    }

    setOneMacFormData(updatedRecord);
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event || !event.target) return;

    let updatedRecord = { ...oneMacFormData } as OneMacFormData; // You need a new object to be able to update the state

    updatedRecord[event.target.name as keyof typeof updatedRecord] =
      event.target.value;

    setOneMacFormData(updatedRecord);
  };

  const handleEffectiveDateChange = useCallback(
    (proposedEffectiveDate: string) => {
      setOneMacFormData((cr) => ({ ...cr, proposedEffectiveDate }));
    },
    []
  );

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [alertCode]);

  useEffect(() => {
    // default display message settings with empty message
    let displayMessage: Message = {
      statusLevel: "error",
      statusMessage: "",
    };

    let formatMessage = {
      statusLevel: "error",
      statusMessage: validateComponentId(oneMacFormData.componentId),
      warningMessageCode: "",
    };

    let existMessages: Message[] = [];
    let result = false;
    try {
      if (
        formatMessage.statusMessage === "" &&
        oneMacFormData.componentId &&
        formConfig.idExistValidations
      ) {
        const promises = formConfig.idExistValidations.map(
          async (idExistValidation) => {
            let checkingNumber = oneMacFormData.componentId;

            // if (idExistValidation.existenceRegex !== undefined) {
            //   checkingNumber = changeRequest.transmittalNumber.match(
            //     idExistValidation.existenceRegex
            //   )![0];
            // }
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
                formConfig.idExistValidations[key];
              let tempMessage, tempCode;

              // ID does not exist but it should exist
              if (!dupID && correspondingValidation.idMustExist) {
                if (correspondingValidation.errorLevel === "error") {
                  tempMessage = `According to our records, this ${formConfig.idLabel} does not exist. Please check the ${formConfig.idLabel} and try entering it again.`;
                } else {
                  tempMessage = `${formConfig.idLabel} not found. Please ensure you have the correct ${formConfig.idLabel} before submitting. Contact the MACPro Help Desk (code: ${RESPONSE_CODE.SUBMISSION_ID_NOT_FOUND_WARNING}) if you need support.`;
                  tempCode = RESPONSE_CODE.SUBMISSION_ID_NOT_FOUND_WARNING;
                }
                // ID exists but it should NOT exist
              } else if (dupID && !correspondingValidation.idMustExist) {
                if (correspondingValidation.errorLevel === "error") {
                  tempMessage = `According to our records, this ${formConfig.idLabel} already exists. Please check the ${formConfig.idLabel} and try entering it again.`;
                  tempCode = RESPONSE_CODE.SUBMISSION_ID_EXIST_WARNING;
                } else {
                  tempMessage = `According to our records, this ${formConfig.idLabel} already exists. Please ensure you have the correct ${formConfig.idLabel} before submitting. Contact the MACPro Help Desk (code: ${RESPONSE_CODE.SUBMISSION_ID_EXIST_WARNING}) if you need support.`;
                  tempCode = RESPONSE_CODE.SUBMISSION_ID_EXIST_WARNING;
                }
              }

              // if we got a message through checking, then we should add it to the existMessages array
              const messageToAdd = {
                statusLevel: correspondingValidation.errorLevel!,
                statusMessage: tempMessage as string,
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

      const isWaiverAuthorityReady: boolean = Boolean(
        !formConfig.waiverAuthorities || oneMacFormData.waiverAuthority
      );
      const isProposedEffecitveDateReady: boolean = Boolean(
        !formConfig.proposedEffectiveDate ||
          oneMacFormData.proposedEffectiveDate
      );
      const hasNoErrors: boolean =
        displayMessage.statusLevel === "warn" || !displayMessage.statusMessage;

      setIsSubmissionReady(
        isWaiverAuthorityReady &&
          hasNoErrors &&
          areUploadsReady &&
          isProposedEffecitveDateReady
      );
    } catch (err) {
      console.log("error is: ", err);
      setAlertCode(RESPONSE_CODE[(err as Error).message]);
    }
  }, [
    areUploadsReady,
    oneMacFormData,
    formConfig,
    validateComponentId,
    alertCode,
  ]);

  function closedAlert() {
    setAlertCode(RESPONSE_CODE.NONE);
  }

  const limitSubmit = useRef(false);

  const handleSubmit = useCallback(
    async (event: SyntheticEvent) => {
      event.preventDefault();

      if (isSubmissionReady && !limitSubmit.current) {
        limitSubmit.current = true;
        setIsSubmitting(true);

        let transmittalNumberWarningMessage: string | undefined = "";

        if (
          transmittalNumberStatusMessage.statusLevel === "warn" &&
          transmittalNumberStatusMessage.statusMessage
        ) {
          transmittalNumberWarningMessage =
            transmittalNumberStatusMessage.warningMessageCode;
        }

        if (uploader.current) {
          try {
            const uploadedList = await uploader.current.uploadFiles();
            const returnCode = await PackageApi.submitToAPI(
              { ...oneMacFormData, transmittalNumberWarningMessage },
              uploadedList,
              formConfig.componentType
            );

            if (returnCode !== RESPONSE_CODE.SUCCESSFULLY_SUBMITTED)
              throw new Error(returnCode);

            history.push(formConfig.landingPage, {
              passCode: returnCode,
            });
          } catch (err) {
            console.log("error is: ", err);
            setAlertCode((err as Error).message);
            setIsSubmitting(false);
            setIsSubmissionReady(false);
            limitSubmit.current = false;
          }
        }
      }
    },
    [
      isSubmissionReady,
      transmittalNumberStatusMessage,
      oneMacFormData,
      formConfig,
      history,
    ]
  );

  return (
    <LoadingOverlay isLoading={isSubmitting}>
      <PageTitleBar
        heading={formConfig.pageTitle}
        enableBackNav
        backNavConfirmationMessage={leavePageConfirmMessage}
      />
      <AlertBar alertCode={alertCode} closeCallback={closedAlert} />
      <div className="form-container">
        <div className="form-subheader-message">
          <p className="intro-text">
            Once you submit this form, a confirmation email is sent to you and
            to CMS. CMS will use this content to review your package, and you
            will not be able to edit this form. If CMS needs any additional
            information, they will follow up by email.
            <b>
              {" "}
              If you leave this page, you will lose your progress on this form.
            </b>
            {formConfig.addlIntroJSX}
          </p>
        </div>
        <form noValidate onSubmit={handleSubmit}>
          <h3>{formConfig.detailsHeader} Details</h3>
          <p className="req-message">
            <span className="required-mark">*</span>
            indicates required field.
          </p>
          <div className="form-card">
            {formConfig.waiverAuthorities && (
              <Dropdown
                options={[
                  ...defaultWaiverAuthority,
                  ...formConfig.waiverAuthorities,
                ]}
                defaultValue={oneMacFormData.waiverAuthority}
                label="Waiver Authority"
                labelClassName="ds-u-margin-top--0 required"
                fieldClassName="field"
                name="waiverAuthority"
                id="waiver-authority"
                onChange={handleInputChange}
              />
            )}
            {typeof formConfig.getParentInfo == "function" && (
              <Review heading={"Parent " + formConfig.idLabel}>
                {oneMacFormData.parentId ?? "Unknown"}
              </Review>
            )}
            <ComponentId
              idLabel={formConfig.idLabel}
              idFieldHint={formConfig.idFieldHint}
              idFAQLink={formConfig.idFAQLink}
              statusLevel={transmittalNumberStatusMessage.statusLevel}
              statusMessage={
                transmittalNumberStatusMessage.statusMessage !==
                `${formConfig.idLabel} Required`
                  ? transmittalNumberStatusMessage.statusMessage
                  : ""
              }
              disabled={!!presetComponentId}
              value={oneMacFormData.componentId}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                handleComponentIdChange(event.target.value.toUpperCase())
              }
            />
            {formConfig.proposedEffectiveDate && (
              <>
                <label
                  className="ds-c-label required"
                  htmlFor="proposed-effective-date"
                >
                  <span>Proposed Effective Date</span>
                </label>
                <Input
                  className="field"
                  id="proposed-effective-date"
                  name={formConfig.proposedEffectiveDate.fieldName}
                  onChange={handleEffectiveDateChange}
                  type="date"
                />
              </>
            )}
          </div>
          <h3>Attachments</h3>
          <FileUploader
            ref={uploader}
            requiredUploads={formConfig.requiredAttachments}
            optionalUploads={formConfig.optionalAttachments}
            readyCallback={setAreUploadsReady}
          ></FileUploader>
          <div className="summary-box">
            <TextField
              name="additionalInformation"
              label="Additional Information"
              hint="Add anything else that you would like to share with CMS."
              disabled={isSubmitting}
              fieldClassName="summary-field"
              multiline
              onChange={handleInputChange}
              value={oneMacFormData.additionalInformation}
              maxLength={config.MAX_ADDITIONAL_INFO_LENGTH}
            ></TextField>
            <div className="char-count">
              {oneMacFormData.additionalInformation.length}/
              {config.MAX_ADDITIONAL_INFO_LENGTH}
            </div>
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
              type="submit"
            >
              Submit
            </Button>
            <Button
              id="form-cancel-button"
              aria-label="cancel-form"
              className="ds-c-button ds-c-button--transparent"
              onClick={() => setConfirmCancel(true)}
              type="button"
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

export default OneMACForm;
