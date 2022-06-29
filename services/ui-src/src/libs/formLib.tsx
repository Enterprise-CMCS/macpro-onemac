import {
  FieldHint,
  IdValidation,
  SelectOption,
  FileUploadProps,
  Workflow,
  ONEMAC_ROUTES,
} from "cmscommonlib";

export type OneMACFormConfig = {
  idFormat: string;
  idFieldHint: FieldHint[];
  idFAQLink: string;
  pageTitle: string;
  addlIntroJSX?: string;
  detailsHeader?: string;
  actionsByStatus: Record<string, Workflow.PACKAGE_ACTION[]>;
  landingPage: string;
  confirmSubmit?: boolean;
  proposedEffectiveDate?: boolean;
  getParentInfo?: (id: string) => string[];
} & PackageType &
  Partial<WaiverPackageType>;

export const defaultOneMACFormConfig = {
  actionsByStatus: Workflow.defaultActionsByStatus,
  proposedEffectiveDate: false,
  landingPage: ONEMAC_ROUTES.PACKAGE_LIST,
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
