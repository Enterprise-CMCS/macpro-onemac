import {
  FieldHint,
  IdValidation,
  SelectOption,
  FileUploadProps,
  ONEMAC_ROUTES,
} from "cmscommonlib";

export type OneMACFormConfig = {
  idFormat: string;
  idFieldHint: FieldHint[];
  idAdditionalErrorMessage?: string[];
  idFAQLink: string;
  parentLabel?: string;
  parentFieldHint?: FieldHint[];
  parentNotFoundMessage?: string;
  validateParentAPI?: string;
  pageTitle: string;
  addlIntroJSX?: JSX.Element;
  detailsHeader?: string;
  landingPage: string;
  confirmSubmit?: boolean;
  proposedEffectiveDate?: boolean;
  titleLabel?: string;
  getParentInfo?: (id: string) => string[];
} & PackageType &
  Partial<WaiverPackageType>;

export const defaultOneMACFormConfig = {
  idFormat: "",
  idFieldHint: [],
  idFAQLink: "",
  landingPage: ONEMAC_ROUTES.PACKAGE_LIST,
  proposedEffectiveDate: false,
  confirmSubmit: false,
};

export const defaultWaiverAuthority = [
  { label: "-- select a waiver authority --", value: "" },
];

export type PackageType = {
  packageGroup?: string;
  componentType: string;
  typeLabel: string;
  idLabel: string;
  idRegex: string;
  idMustExist: boolean;
  idMustExistErrorLevel?: string;
  idExistValidations: IdValidation[];
  allowMultiplesWithSameId: boolean;
  requiredAttachments: (string | FileUploadProps)[];
  optionalAttachments: (string | FileUploadProps)[];
};

export type WaiverPackageType = {
  waiverAuthorities: SelectOption[];
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
