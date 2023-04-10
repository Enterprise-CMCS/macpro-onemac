import React from "react";
import {
  FieldHint,
  SelectOption,
  FileUploadProps,
  ONEMAC_ROUTES,
} from "cmscommonlib";
import config from "../utils/config";

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
  addlInfoText?: string;
  landingPage: string;
  confirmSubmit?: ConfirmSubmitType;
  proposedEffectiveDate?: boolean;
  titleLabel?: string;
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
  confirmSubmitMessage: JSX.Element | string;
  buildMessage?: (toConfirm: string) => JSX.Element;
  confirmSubmitYesButton?: string;
};

export const defaultOneMACFormConfig = {
  idFormat: "",
  idFieldHint: [],
  idFAQLink: "",
  landingPage: ONEMAC_ROUTES.PACKAGE_LIST,
  proposedEffectiveDate: false,
  attachmentIntroJSX: (
    <>
      <p className="req-message">
        Maximum file size of {config.MAX_ATTACHMENT_SIZE_MB} MB. You can add
        multiple files per attachment type. Read the description for each of the
        attachment types on the FAQ Page.
      </p>
      <p className="req-message">
        <span className="required-mark">*</span> indicates required attachment.
      </p>
    </>
  ),
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
  waiverAuthorities: SelectOption[];
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
  addlInfoText:
    "Explain your need for withdrawal or upload supporting documentation.",
  landingPage: ONEMAC_ROUTES.PACKAGE_LIST,
  proposedEffectiveDate: false,
};

export const defaultWaiverAttachJSX = (
  <>
    <p className="req-message">
      Maximum file size of {config.MAX_ATTACHMENT_SIZE_MB} MB. You can add
      multiple files per attachment type. Read the description for each of the
      attachment types on the FAQ Page.
    </p>
    <p className="req-message">
      <span className="required-mark">*</span> At least one attachment is
      required.
    </p>
  </>
);
