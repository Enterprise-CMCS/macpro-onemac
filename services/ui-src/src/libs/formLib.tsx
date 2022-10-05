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
  pageTitle: string;
  addlIntroJSX?: JSX.Element;
  detailsHeader?: string;
  landingPage: string;
  confirmSubmit: boolean;
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
  idExistValidations: IdValidation[];
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
