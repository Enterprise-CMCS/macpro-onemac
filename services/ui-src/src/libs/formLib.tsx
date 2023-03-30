import {
  FieldHint,
  SelectOption,
  FileUploadProps,
  ONEMAC_ROUTES,
} from "cmscommonlib";
import React from "react";

export type OneMACFormConfig = {
  idFormat: string;
  idFieldHint: FieldHint[];
  idAdditionalErrorMessage?: string[];
  idFAQLink: string;
  pageTitle: string;
  addlIntroJSX?: JSX.Element;
  detailsHeader?: string;
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
};

export const defaultOneMACFormConfig = {
  idFormat: "",
  idFieldHint: [],
  idFAQLink: "",
  landingPage: ONEMAC_ROUTES.PACKAGE_LIST,
  proposedEffectiveDate: false,
};

export const defaultWithdrawConfig = {
  idFormat: "",
  idFieldHint: [],
  idFAQLink: "",
  landingPage: ONEMAC_ROUTES.PACKAGE_LIST,
  proposedEffectiveDate: false,
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
