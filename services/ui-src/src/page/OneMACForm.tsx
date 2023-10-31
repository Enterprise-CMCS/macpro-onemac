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

import { TextField, Button, Review } from "@cmsgov/design-system";

import {
  FAQ_TARGET,
  FORM_SUCCESS_RESPONSE_CODES,
  RESPONSE_CODE,
  ROUTES,
  TYPE_TO_DETAIL_ROUTE,
  Workflow,
} from "cmscommonlib";

import { useAppContext } from "../libs/contextLib";
import {
  OneMACFormConfig,
  OneMacFormData,
  Message,
  stateAccessMessage,
  buildWrongFormatMessage,
  buildMustExistMessage,
  buildMustNotExistMessage,
} from "../libs/formLib";
import config from "../utils/config";

import LoadingOverlay from "../components/LoadingOverlay";
import FileUploader from "../components/FileUploader";
import PackageApi from "../utils/PackageApi";
import PageTitleBar from "../components/PageTitleBar";
import AlertBar from "../components/AlertBar";
import { FormLocationState, FORM_SOURCE } from "../domain-types";
import ComponentId from "../components/ComponentId";
import TemporaryExtensionTypeInput from "./temporary-extension/TemporaryExtensionTypeInput";
import { Location } from "history";

const leavePageConfirmMessage = "Changes you made will not be saved.";

/**
 * Parses out the two character state/territory at the beginning of the component id.
 * @param componentId the component id
 * @returns two character state/territory
 */
export function getTerritoryFromComponentId(componentId: string): string {
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
  const [areUploadsReady, setAreUploadsReady] = useState(true);
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
  const presetParentType = location.state?.parentType ?? "";
  const presetParentTypeNice =
    formConfig.parentTypeNice ?? Workflow.ONEMAC_LABEL[presetParentType];

  //if location contains parentType and formSource was detail page then override landingpage to type specific detail page
  formConfig.landingPage = getLandingPage(location, formConfig);

  // if only one waiver Authority choice, it is the default
  const presetWaiverAuthority = formConfig.waiverAuthority?.value;

  const presetTemporaryExtensionType = location.state?.temporaryExtensionType;

  // The record we are using for the form.
  const [oneMacFormData, setOneMacFormData] = useState<OneMacFormData>({
    territory: getTerritoryFromComponentId(presetComponentId),
    additionalInformation: "",
    componentId: presetComponentId,
    waiverAuthority: presetWaiverAuthority,
    temporaryExtensionType: presetTemporaryExtensionType,
    proposedEffectiveDate: undefined,
    parentId: presetParentId,
    parentType: location.state?.parentType,
  });

  function getLandingPage(
    location: Location<FormLocationState>,
    formConfig: OneMACFormConfig
  ) {
    if (
      location.state?.parentId &&
      location.state?.parentType &&
      location.state?.formSource === FORM_SOURCE.DETAIL
    ) {
      return `${TYPE_TO_DETAIL_ROUTE[location.state?.parentType]}/${
        location.state?.parentId
      }`;
    }
    return formConfig.landingPage;
  }

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
        if (!!oneMacFormData.parentId) {
          if (
            (oneMacFormData.parentId.length >= 2 && !activeTerritories) ||
            (activeTerritories &&
              !activeTerritories.includes(
                getTerritoryFromComponentId(oneMacFormData.parentId)
              ))
          ) {
            parentStatusMessages.push(stateAccessMessage);
          }
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
    activeTerritories,
    formConfig?.parentNotFoundMessage,
  ]);

  useEffect(() => {
    const checkId = async () => {
      if (presetComponentId === oneMacFormData.componentId) return;
      let validationMessages: Message[] = validateComponentId(
        oneMacFormData.componentId
      );
      if (validationMessages.length === 0 && oneMacFormData.componentId) {
        try {
          const isADup = await PackageApi.packageExists(
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
  }, [
    formConfig,
    validateComponentId,
    alertCode,
    oneMacFormData.componentId,
    presetComponentId,
  ]);

  useEffect(() => {
    const isTitleReady: boolean = Boolean(
      !formConfig.titleLabel || oneMacFormData.title
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

    const isSupportInfoReady: boolean = Boolean(
      formConfig.requireUploadOrAdditionalInformation
        ? areUploadsReady || oneMacFormData.additionalInformation
        : areUploadsReady
    );

    const isAdditionalInformationReady: boolean = Boolean(
      formConfig.addlInfoRequired ? oneMacFormData.additionalInformation : true
    );

    setIsSubmissionReady(
      isTitleReady &&
        isTemporaryExtensionTypeReady &&
        isParentIdReady &&
        isIdReady &&
        isSupportInfoReady &&
        isProposedEffecitveDateReady &&
        isAdditionalInformationReady
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
    try {
      const uploadedList = uploader.current
        ? await uploader.current.uploadFiles()
        : undefined;
      const returnCode = await PackageApi.submitToAPI(
        {
          ...oneMacFormData,
          transmittalNumberWarningMessage: componentIdWarningMessageCode,
        },
        uploadedList,
        formConfig.componentType
      );
      if (returnCode in FORM_SUCCESS_RESPONSE_CODES)
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
  }, [formConfig, history, oneMacFormData, componentIdStatusMessages]);

  const handleSubmit = useCallback(
    async (event: SyntheticEvent) => {
      event.preventDefault();
      if (isSubmissionReady && !limitSubmit.current) {
        if (formConfig.confirmSubmit) {
          const confirmHeading: string = formConfig.confirmSubmit.buildHeading
            ? formConfig.confirmSubmit.buildHeading(
                presetParentTypeNice ?? "this"
              )
            : formConfig.confirmSubmit.confirmSubmitHeading ??
              "Placeholder heading";
          const confirmMessage: JSX.Element | string = formConfig.confirmSubmit
            .buildMessage
            ? formConfig.confirmSubmit.buildMessage(
                oneMacFormData.componentId,
                presetParentTypeNice ?? ""
              )
            : formConfig.confirmSubmit.confirmSubmitMessage ??
              "Placeholder message";

          confirmAction &&
            confirmAction(
              confirmHeading,
              formConfig.confirmSubmit.confirmSubmitYesButton ?? "Yes, Submit",
              "Cancel",
              confirmMessage,
              doSubmit
            );
        } else {
          doSubmit();
        }
      } else {
        console.log("handleSubmit not ready");
      }
    },
    [
      isSubmissionReady,
      formConfig.confirmSubmit,
      presetParentTypeNice,
      confirmAction,
      doSubmit,
      oneMacFormData.componentId,
    ]
  );

  return (
    <LoadingOverlay isLoading={isSubmitting}>
      <PageTitleBar
        heading={formConfig.pageTitle ?? oneMacFormData.componentId ?? ""}
        enableBackNav
        backTo={getLandingPage(location, formConfig)}
        backNavConfirmationMessage={leavePageConfirmMessage}
      />
      <AlertBar alertCode={alertCode} closeCallback={closedAlert} />
      <div className="onemac-form">
        <form noValidate onSubmit={handleSubmit}>
          <h2>
            {formConfig.detailsHeaderFull ??
              formConfig.detailsHeader + " Details"}
          </h2>
          {formConfig.buildIntroJSX
            ? formConfig.buildIntroJSX(presetParentTypeNice ?? "this")
            : formConfig.introJSX ?? (
                <>
                  <p>
                    <span className="required-mark">*</span>
                    indicates required field.
                  </p>
                  <p id="form-intro">
                    Once you submit this form, a confirmation email is sent to
                    you and to CMS. CMS will use this content to review your
                    package, and you will not be able to edit this form. If CMS
                    needs any additional information, they will follow up by
                    email.
                    <b>
                      {" "}
                      If you leave this page, you will lose your progress on
                      this form.
                    </b>
                    {formConfig.addlIntroJSX ?? ""}
                  </p>
                </>
              )}
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
          {formConfig.waiverAuthority && (
            <Review heading="Waiver Authority">
              {formConfig.waiverAuthority.label}
            </Review>
          )}

          {formConfig.temporaryExtensionTypes && (
            <TemporaryExtensionTypeInput
              temporaryExtensionTypes={[...formConfig.temporaryExtensionTypes]}
              handleOnChange={handleInputChange}
              temporaryExtensionType={oneMacFormData.temporaryExtensionType}
              disabled={!!presetTemporaryExtensionType}
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
            idFieldHint={formConfig.idFieldHint ?? [{ text: "" }]}
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
          {presetParentTypeNice && (
            <Review key="0" heading="Type">
              {presetParentTypeNice}
            </Review>
          )}
          {(formConfig?.requiredAttachments.length > 0 ||
            formConfig.optionalAttachments.length > 0) && (
            <>
              <h3>{formConfig?.attachmentsTitle ?? "Attachments"}</h3>
              {formConfig.attachmentIntroJSX}
              <FileUploader
                ref={uploader}
                requiredUploads={formConfig.requiredAttachments}
                optionalUploads={formConfig.optionalAttachments}
                numRequired={
                  formConfig.requireUploadOrAdditionalInformation ? 1 : 0
                }
                readyCallback={setAreUploadsReady}
              ></FileUploader>
            </>
          )}
          <TextField
            name="additionalInformation"
            labelClassName={
              formConfig.addlInfoRequired ? "addl-info-required" : ""
            }
            label={formConfig.addlInfoTitle}
            labelId="additional-information-label"
            id="additional-information"
            hint={
              formConfig.addlInfoText ??
              "Add anything else that you would like to share with CMS."
            }
            disabled={isSubmitting}
            fieldClassName="summary-field required"
            multiline
            onChange={(e) => {
              handleInputChange(e);
            }}
            value={oneMacFormData.additionalInformation}
            maxLength={config.MAX_ADDITIONAL_INFO_LENGTH}
            aria-describedby="character-count"
            aria-live="off"
            aria-multiline={true}
          ></TextField>
          <span
            tabIndex={0}
            id="character-count"
            aria-label="character-count"
            aria-live="polite"
          >
            {`${
              4000 - oneMacFormData.additionalInformation.length
            } characters remaining`}
          </span>

          {formConfig.submitInstructionsJSX ?? ""}

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
            target={FAQ_TARGET}
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
