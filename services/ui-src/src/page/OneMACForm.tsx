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

import { TextField, Button, Dropdown } from "@cmsgov/design-system";

import { RESPONSE_CODE, ROUTES } from "cmscommonlib";

import { useAppContext } from "../libs/contextLib";
import {
  OneMACFormConfig,
  OneMacFormData,
  Message,
  defaultWaiverAuthority,
  stateAccessMessage,
  buildWrongFormatMessage,
  buildMustExistMessage,
  buildMustNotExistMessage,
} from "../libs/formLib";
import config from "../utils/config";

import LoadingOverlay from "../components/LoadingOverlay";
import FileUploader from "../components/FileUploader";
import ChangeRequestDataApi from "../utils/ChangeRequestDataApi";
import PackageApi from "../utils/PackageApi";
import PageTitleBar from "../components/PageTitleBar";
import AlertBar from "../components/AlertBar";
import { FormLocationState } from "../domain-types";
import ComponentId from "../components/ComponentId";
import TemporaryExtensionTypeInput from "./temporary-extension/TemporaryExtensionTypeInput";

const leavePageConfirmMessage = "Changes you made will not be saved.";

/**
 * Parses out the two character state/territory at the beginning of the component id.
 * @param componentId the component id
 * @returns two character state/territory
 */
function getTerritoryFromComponentId(componentId: string): string {
  return componentId?.toString().substring(0, 2) ?? "";
}

/**
 * Submisstion Form template to allow rendering for different types of Submissions.
 */
const OneMACForm: React.FC<{ formConfig: OneMACFormConfig }> = ({
  formConfig,
}) => {
  // for setting the alert
  const [alertCode, setAlertCode] = useState(RESPONSE_CODE.NONE);
  const { activeTerritories, confirmAction } = useAppContext() ?? {};
  const location = useLocation<FormLocationState>();

  //Reference to the File Uploader.
  const uploader = useRef<FileUploader>(null);
  // True when the required attachments have been selected.
  const [areUploadsReady, setAreUploadsReady] = useState(false);
  const [isSubmissionReady, setIsSubmissionReady] = useState(false);
  // True if we are currently submitting the form
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [componentIdStatusMessages, setComponentIdStatusMessages] = useState<
    Message[]
  >([]);

  const [parentIdStatusMessages, setParentIdStatusMessages] = useState<
    Message[]
  >([]);

  // The browser history, so we can redirect to the home page
  const history = useHistory();

  const presetComponentId = location.state?.componentId ?? "";
  const presetParentId = location.state?.parentId ?? undefined;

  // if only one waiver Authority choice, it is the default
  const presetWaiverAuthority =
    formConfig.waiverAuthorities && formConfig.waiverAuthorities.length === 1
      ? formConfig.waiverAuthorities[0].value
      : undefined;

  // The record we are using for the form.
  const [oneMacFormData, setOneMacFormData] = useState<OneMacFormData>({
    territory: getTerritoryFromComponentId(presetComponentId),
    additionalInformation: "",
    componentId: presetComponentId,
    waiverAuthority: presetWaiverAuthority,
    temporaryExtensionType: undefined,
    proposedEffectiveDate: undefined,
    parentId: presetParentId,
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
      let errorMessages: Message[] = [];

      // Do not validate if no value
      if (!componentId) {
        return errorMessages;
      }
      // state code must be on the User's active state list
      else if (
        (componentId.length >= 2 && !activeTerritories) ||
        (activeTerritories &&
          !activeTerritories.includes(getTerritoryFromComponentId(componentId)))
      ) {
        errorMessages.push(stateAccessMessage);
      }
      // must match the associated Regex string for format
      else if (
        formConfig.idRegex &&
        !matchesRegex(componentId, formConfig.idRegex)
      ) {
        errorMessages.push(buildWrongFormatMessage(formConfig));
        if (formConfig.idAdditionalErrorMessage) {
          formConfig.idAdditionalErrorMessage.forEach((message) =>
            errorMessages.push({
              statusLevel: "error",
              statusMessage: message,
            })
          );
        }
      }

      return errorMessages;
    },
    [activeTerritories, formConfig]
  );

  async function handleComponentIdChange(componentId: string) {
    let updatedRecord = { ...oneMacFormData } as OneMacFormData; // You need a new object to be able to update the state

    updatedRecord.componentId = componentId;
    updatedRecord.territory = getTerritoryFromComponentId(componentId);

    setOneMacFormData(updatedRecord);
  }

  async function handleParentIdChange(parentId: string) {
    let updatedRecord = { ...oneMacFormData } as OneMacFormData; // You need a new object to be able to update the state

    updatedRecord.parentId = parentId;
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
    const checkId = async () => {
      try {
        const parentStatusMessages: Message[] = [];
        console.log("validateParentAPI is: %s", formConfig.validateParentAPI);
        if (!!oneMacFormData.parentId) {
          const isParentIdValid = await PackageApi.validateParent(
            oneMacFormData.parentId,
            formConfig.validateParentAPI
          );
          if (!isParentIdValid) {
            parentStatusMessages.push({
              statusMessage: formConfig.parentNotFoundMessage ?? "",
              statusLevel: "error",
            });
          }
        }
        setParentIdStatusMessages(parentStatusMessages);
      } catch (err) {
        console.log("error is: ", err);
        setAlertCode(RESPONSE_CODE[(err as Error).message]);
      }
    };
    checkId();
  }, [
    oneMacFormData.parentId,
    formConfig?.parentLabel,
    formConfig?.validateParentAPI,
    formConfig?.parentNotFoundMessage,
  ]);

  useEffect(() => {
    const checkId = async () => {
      let validationMessages: Message[] = validateComponentId(
        oneMacFormData.componentId
      );
      if (validationMessages.length === 0 && oneMacFormData.componentId) {
        try {
          const isADup = await ChangeRequestDataApi.packageExists(
            oneMacFormData.componentId
          );
          if (isADup === false && formConfig.idMustExist) {
            validationMessages.push(buildMustExistMessage(formConfig));
          } else if (isADup === true && !formConfig.idMustExist) {
            validationMessages.push(buildMustNotExistMessage(formConfig));
          }
        } catch (err) {
          console.log("error is: ", err);
          setAlertCode(RESPONSE_CODE[(err as Error).message]);
        }
      }
      setComponentIdStatusMessages(validationMessages);
    };
    checkId();
  }, [formConfig, validateComponentId, alertCode, oneMacFormData.componentId]);

  useEffect(() => {
    const isTitleReady: boolean = Boolean(
      !formConfig.titleLabel || oneMacFormData.title
    );
    const isWaiverAuthorityReady: boolean = Boolean(
      !formConfig.waiverAuthorities || oneMacFormData.waiverAuthority
    );
    const isTemporaryExtensionTypeReady: boolean = Boolean(
      !formConfig.temporaryExtensionTypes ||
        oneMacFormData.temporaryExtensionType
    );
    const isProposedEffecitveDateReady: boolean = Boolean(
      !formConfig.proposedEffectiveDate || oneMacFormData.proposedEffectiveDate
    );
    const isParentIdReady: boolean = Boolean(
      !formConfig.parentLabel ||
        (oneMacFormData.parentId &&
          !parentIdStatusMessages.some((m) => m.statusLevel === "error"))
    );
    const isIdReady: boolean = Boolean(
      oneMacFormData.componentId &&
        !componentIdStatusMessages.some((m) => m.statusLevel === "error")
    );

    setIsSubmissionReady(
      isTitleReady &&
        isWaiverAuthorityReady &&
        isTemporaryExtensionTypeReady &&
        isParentIdReady &&
        isIdReady &&
        areUploadsReady &&
        isProposedEffecitveDateReady
    );
  }, [
    areUploadsReady,
    componentIdStatusMessages,
    parentIdStatusMessages,
    formConfig,
    oneMacFormData,
  ]);

  function closedAlert() {
    setAlertCode(RESPONSE_CODE.NONE);
  }

  const limitSubmit = useRef(false);

  const doSubmit = useCallback(async () => {
    limitSubmit.current = true;
    setIsSubmitting(true);

    const componentIdWarningMessage: Message | undefined =
      componentIdStatusMessages.find(
        (message) => message.statusLevel === "warn"
      );
    const componentIdWarningMessageCode = componentIdWarningMessage
      ? componentIdWarningMessage.warningMessageCode
      : "";

    if (uploader.current) {
      try {
        const uploadedList = await uploader.current.uploadFiles();
        const returnCode = await PackageApi.submitToAPI(
          {
            ...oneMacFormData,
            transmittalNumberWarningMessage: componentIdWarningMessageCode,
          },
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
  }, [formConfig, history, oneMacFormData, componentIdStatusMessages]);

  const handleSubmit = useCallback(
    async (event: SyntheticEvent) => {
      event.preventDefault();

      if (isSubmissionReady && !limitSubmit.current) {
        if (formConfig.confirmSubmit) {
          confirmAction &&
            confirmAction(
              formConfig.confirmSubmit.confirmSubmitHeading,
              "Yes, Submit",
              "Cancel",
              formConfig.confirmSubmit.confirmSubmitMessage ?? "",
              doSubmit
            );
        } else {
          doSubmit();
        }
      }
    },
    [isSubmissionReady, formConfig.confirmSubmit, confirmAction, doSubmit]
  );

  return (
    <LoadingOverlay isLoading={isSubmitting}>
      <PageTitleBar
        heading={formConfig.pageTitle}
        enableBackNav
        backNavConfirmationMessage={leavePageConfirmMessage}
      />
      <AlertBar alertCode={alertCode} closeCallback={closedAlert} />
      <div className="onemac-form">
        <form noValidate onSubmit={handleSubmit}>
          <h2>{formConfig.detailsHeader} Details</h2>
          <p>
            <span className="required-mark">*</span>
            indicates required field.
          </p>
          <p id="form-intro">
            Once you submit this form, a confirmation email is sent to you and
            to CMS. CMS will use this content to review your package, and you
            will not be able to edit this form. If CMS needs any additional
            information, they will follow up by email.
            <b>
              {" "}
              If you leave this page, you will lose your progress on this form.
            </b>
            {formConfig.addlIntroJSX ?? ""}
          </p>
          {formConfig.titleLabel && (
            <TextField
              name="title"
              label={formConfig.titleLabel}
              labelId="title-label"
              labelClassName="required"
              id="title"
              disabled={isSubmitting}
              fieldClassName="field"
              multiline
              rows="2"
              onChange={handleInputChange}
              value={oneMacFormData.title}
              maxLength={config.MAX_PACKAGE_TITLE_LENGTH}
            ></TextField>
          )}
          {formConfig.waiverAuthorities &&
            formConfig.waiverAuthorities.length > 1 && (
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
          {formConfig.temporaryExtensionTypes && (
            <TemporaryExtensionTypeInput
              temporaryExtensionTypes={[...formConfig.temporaryExtensionTypes]}
              handleOnChange={handleInputChange}
            />
          )}
          {formConfig.parentLabel && (
            <ComponentId
              idPrefix="parent-"
              idLabel={formConfig.parentLabel}
              idFieldHint={formConfig.parentFieldHint ?? [{ text: "" }]}
              statusMessages={parentIdStatusMessages}
              disabled={!!presetParentId}
              value={oneMacFormData.parentId ?? ""}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                handleParentIdChange(event.target.value.toUpperCase())
              }
            />
          )}
          <ComponentId
            idLabel={formConfig.idLabel}
            idFieldHint={formConfig.idFieldHint}
            idFAQLink={formConfig.idFAQLink}
            statusMessages={componentIdStatusMessages}
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
                <span>Proposed Effective Date of {formConfig.typeLabel}</span>
              </label>
              <Input
                className="field"
                id="proposed-effective-date"
                name="proposedEffectiveDate"
                onChange={handleEffectiveDateChange}
                type="date"
              />
            </>
          )}
          <h3>Attachments</h3>
          <FileUploader
            ref={uploader}
            requiredUploads={formConfig.requiredAttachments}
            optionalUploads={formConfig.optionalAttachments}
            readyCallback={setAreUploadsReady}
          ></FileUploader>
          <TextField
            name="additionalInformation"
            label="Additional Information"
            labelId="additional-information-label"
            id="additional-information"
            hint="Add anything else that you would like to share with CMS."
            disabled={isSubmitting}
            fieldClassName="summary-field"
            multiline
            onChange={handleInputChange}
            value={oneMacFormData.additionalInformation}
            maxLength={config.MAX_ADDITIONAL_INFO_LENGTH}
          ></TextField>
          <p id="form-submit-instructions">
            <i>
              Once you submit this form, a confirmation email is sent to you and
              to CMS. CMS will use this content to review your package, and you
              will not be able to edit this form. If CMS needs any additional
              information, they will follow up by email. If you leave this page,
              you will lose your progress on this form.
            </i>
          </p>
          <div className="form-buttons">
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
              onClick={() =>
                confirmAction &&
                confirmAction(
                  "Leave this page?",
                  "Leave Anyway",
                  "Stay on Page",
                  leavePageConfirmMessage,
                  () => history.goBack()
                )
              }
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
      </div>
    </LoadingOverlay>
  );
};

export default OneMACForm;
