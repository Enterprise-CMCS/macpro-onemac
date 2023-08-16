import React from "react";
import {
  FieldHint,
  SelectOption,
  FileUploadProps,
  ONEMAC_ROUTES,
  ROUTES,
  FAQ_TARGET,
} from "cmscommonlib";
import config from "../utils/config";
import { Link } from "react-router-dom";

export type OneMACFormConfig = {
  idFormat?: string;
  idFieldHint?: FieldHint[];
  idAdditionalErrorMessage?: string[];
  idFAQLink?: string;
  pageTitle?: string;
  introJSX?: JSX.Element;
  addlIntroJSX?: JSX.Element;
  detailsHeader?: string;
  detailsHeaderFull?: string;
  parentTypeNice?: string;
  attachmentsTitle?: string;
  attachmentIntroJSX: JSX.Element;
  atLeastOneAttachmentRequired?: boolean;
  addlInfoTitle?: string;
  addlInfoText?: string;
  addlInfoRequired?: boolean;
  requireUploadOrAdditionalInformation?: boolean;
  landingPage: string;
  confirmSubmit?: ConfirmSubmitType;
  proposedEffectiveDate?: boolean;
  titleLabel?: string;
  submitInstructionsJSX?: JSX.Element;
} & PackageType &
  Partial<ParentPackageType> &
  Partial<WaiverPackageType> &
  Partial<TemporaryExtensionPackageType>;

type ParentPackageType = {
  parentLabel?: string;
  parentFieldHint?: FieldHint[];
  parentNotFoundMessage?: string;
  validateParentAPI?: string;
  getParentInfo?: (id: string) => string[];
};

type ConfirmSubmitType = {
  confirmSubmitHeading: string;
  confirmSubmitMessage?: JSX.Element | string;
  buildMessage?: (toConfirm: string) => JSX.Element;
  confirmSubmitYesButton?: string;
};

export const DefaultFileTypesInfo = () => (
  <p>
    We accept the following file types:{" "}
    <b>
      .doc, .docx, .jpg, .odp, .ods, .odt, .png, .pdf, .ppt, .pptx, .rtf, .txt,
      .xls, .xlsx, and a few others.
    </b>{" "}
    See the full list on the{" "}
    <Link to={ROUTES.FAQ_ACCEPTED_FILE_TYPES} target={FAQ_TARGET}>
      FAQ Page
    </Link>
    .
  </p>
);

export const DefaultFileSizeInfo = ({ route }: { route: string }) => (
  <p className="req-message">
    Maximum file size of {config.MAX_ATTACHMENT_SIZE_MB} MB per attachment.{" "}
    <b>You can add multiple files per attachment type.</b> Read the description
    for each of the attachment types on the{" "}
    <Link to={route} target={FAQ_TARGET}>
      FAQ Page
    </Link>
    .
  </p>
);

export const RequiredAttachmentSpan = () => (
  <p className="req-message">
    <span className="required-mark">*</span> indicates required attachment
  </p>
);

export const defaultAttachmentInstructionsJSX = (
  anchoredFAQRoute: string = ROUTES.FAQ
) => (
  <>
    <DefaultFileSizeInfo route={anchoredFAQRoute} />
    <DefaultFileTypesInfo />
    <RequiredAttachmentSpan />
  </>
);

const defaultSubmitInstructionsJSX = (
  <p id="form-submit-instructions">
    <i>
      Once you submit this form, a confirmation email is sent to you and to CMS.
      CMS will use this content to review your package, and you will not be able
      to edit this form. If CMS needs any additional information, they will
      follow up by email. If you leave this page, you will lose your progress on
      this form.
    </i>
  </p>
);

export const defaultOneMACFormConfig = {
  idFormat: "",
  idFieldHint: [],
  idFAQLink: "",
  landingPage: ONEMAC_ROUTES.PACKAGE_LIST,
  proposedEffectiveDate: false,
  attachmentIntroJSX: defaultAttachmentInstructionsJSX(),
  addlInfoTitle: "Additional Information",
  submitInstructionsJSX: defaultSubmitInstructionsJSX,
};

export const defaultWaiverAuthority = [
  { label: "-- select a waiver authority --", value: "" },
];

export const defaultConfirmSubmitHeadingRAI =
  "Do you want to submit your official formal RAI response?";
export const defaultConfirmSubmitMessageRAI = (
  <p>
    By Clicking <b>Yes, Submit</b>, you are submitting your official formal RAI
    Response to start the 90 day clock review process.
  </p>
);

export const defaultConfirmSubmitRAI = {
  confirmSubmitHeading: defaultConfirmSubmitHeadingRAI,
  confirmSubmitMessage: defaultConfirmSubmitMessageRAI,
};

export const defaultSubsequentSubmissionIntroJSX = (
  <p id="form-intro">
    Provide revised or additional documentation for your submission. Once you
    submit this form, a confirmation email is sent to you and to CMS. CMS will
    use this content to review your package, and you will not be able to edit
    this form. If CMS needs any additional information, they will follow up by
    email.
    <b>If you leave this page, you will lose your progress on this form.</b>
  </p>
);

export const defaultConfirmSubmitMessageSubsequentSubmission = (
  <p>
    By Clicking <b>Yes, Submit</b>, you are submitting your official formal RAI
    Response to start the 90 day clock review process.
  </p>
);

export const defaultConfirmSubsequentSubmission: ConfirmSubmitType = {
  confirmSubmitHeading: "",
  confirmSubmitMessage: (
    <>
      <p>
        <b>Please Note:</b> OneMAC is solely for file submission purposes.
      </p>
      <p>
        <b>
          Communication between State and CMS users will be completed offline
        </b>{" "}
        through email.
      </p>
    </>
  ),
};

export const defaultConfirmSubmitHeadingWithdraw = "Withdraw Package?";
export const defaultConfirmSubmitMessageWithdraw = (toConfirm: string) => (
  <p>
    You are about to withdraw {toConfirm}. Once complete, you will not be able
    to resubmit this package. CMS will be notified.
  </p>
);

export const defaultConfirmSubmitWithdraw = {
  confirmSubmitHeading: defaultConfirmSubmitHeadingWithdraw,
  confirmSubmitMessage: defaultConfirmSubmitMessageWithdraw("this package"),
  buildMessage: defaultConfirmSubmitMessageWithdraw,
  confirmSubmitYesButton: "Yes, withdraw package",
};

export type PackageType = {
  whichTab?: string;
  componentType: string;
  typeLabel: string;
  idLabel: string;
  idRegex: string;
  idMustExist: boolean;
  allowMultiplesWithSameId: boolean;
  requiredAttachments: (string | FileUploadProps)[];
  optionalAttachments: (string | FileUploadProps)[];
};

export type WaiverPackageType = {
  waiverAuthority: SelectOption;
};

export type TemporaryExtensionPackageType = {
  temporaryExtensionTypes: SelectOption[];
};

export type Message = {
  statusLevel: string;
  statusMessage: string;
  warningMessageCode?: string;
};

export type OneMacFormData = {
  territory: string;
  componentType?: string;
  typeNice?: string;
  additionalInformation: string;
  componentId: string;
  waiverAuthority?: string;
  temporaryExtensionType?: string;
  proposedEffectiveDate?: string;
  title?: string;
  parentId?: string;
  parentType?: string;
};

export const stateAccessMessage: Message = {
  statusLevel: "error",
  statusMessage: `You can only submit for a state you have access to. If you need to add another state, visit your user profile to request access.`,
};
export const buildWrongFormatMessage = (formConfig: OneMACFormConfig) => ({
  statusLevel: "error",
  statusMessage: `The ${formConfig.idLabel} must be in the format of ${formConfig.idFormat}`,
});

export const buildMustExistMessage = (formConfig: OneMACFormConfig) => ({
  statusLevel: "error",
  statusMessage: `According to our records, this ${formConfig.idLabel} does not exist. Please check the ${formConfig.idLabel} and try entering it again.`,
});
export const buildMustNotExistMessage = (formConfig: OneMACFormConfig) => ({
  statusLevel: "error",
  statusMessage: `According to our records, this ${formConfig.idLabel} already exists. Please check the ${formConfig.idLabel} and try entering it again.`,
});

export const defaultWithdrawConfig = {
  introJSX: (
    <p id="form-intro">
      Complete this form to withdraw a package. Once complete, you will not be
      able to resubmit this package. CMS will be notified and will use this
      content to review your request, and you will not be able to edit this
      form. If CMS needs any additional information, they will follow up by
      email.
    </p>
  ),
  confirmSubmit: defaultConfirmSubmitWithdraw,
  attachmentsTitle: "Upload Supporting Documentation",
  attachmentIntroJSX: (
    <>
      <p className="req-message">
        Upload your supporting documentation for withdrawal or explain your need
        for withdrawal in the <i>Additional Information</i> box.
      </p>
      <p>
        Maximum file size of {config.MAX_ATTACHMENT_SIZE_MB} MB.{" "}
        <b>You can add multiple files</b>. We accept the following file types:{" "}
        <b>.pdf, .docx, .jpg, .png</b>.
      </p>
    </>
  ),
  addlInfoTitle: "Additional Information",
  addlInfoText:
    "Explain your need for withdrawal or upload supporting documentation.",
  landingPage: ONEMAC_ROUTES.PACKAGE_LIST,
  proposedEffectiveDate: false,
};
