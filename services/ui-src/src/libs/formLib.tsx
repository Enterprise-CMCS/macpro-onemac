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
  idFAQLink: string;
  parentLabel?: string;
  parentFieldHint?: FieldHint[];
  parentNotFoundMessage?: string;
  validateParentAPI?: string;
  pageTitle: string;
  addlIntroJSX?: string;
  detailsHeader?: string;
  landingPage: string;
  confirmSubmit?: boolean;
  proposedEffectiveDate?: boolean;
  getParentInfo?: (id: string) => string[];
} & PackageType &
  Partial<WaiverPackageType>;

export const defaultOneMACFormConfig = {
  idFormat: "",
  idFieldHint: [],
  idFAQLink: "",
  addlIntroJSX: "",
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
