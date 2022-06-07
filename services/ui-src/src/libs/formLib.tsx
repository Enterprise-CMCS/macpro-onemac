import {
  Workflow,
  FieldHint,
  IdValidation,
  SelectOption,
  FileUploadProps,
} from "cmscommonlib";

export type OneMACFormConfig = {
  idFormat: string;
  idFieldHint: FieldHint[];
  idFAQLink: string;
  pageTitle: string;
  addlIntroJSX?: string;
  detailsHeader?: string;
  actionsByStatus: Record<string, Workflow.PACKAGE_ACTION[]>;
  raiLink: string;
  landingPage: string;
  proposedEffectiveDate?: { fieldName: string };
} & PackageType &
  Partial<WaiverPackageType>;

export const defaultWaiverAuthority = [
  { label: "-- select a waiver authority --", value: "" },
];

export type PackageType = {
  packageGroup?: string;
  componentType: string;
  typeLabel: string;
  idType: string;
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
