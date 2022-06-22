import {
  FieldHint,
  IdValidation,
  SelectOption,
  FileUploadProps,
} from "cmscommonlib";

import { OneMacFormData } from "../page/OneMACForm";

export type OneMACFormConfig = {
  idFormat: string;
  idFieldHint: FieldHint[];
  idFAQLink: string;
  pageTitle: string;
  addlIntroJSX?: string;
  detailsHeader?: string;
  raiLink: string;
  landingPage: string;
  landingPageReplacementKeys?: (keyof OneMacFormData)[];
  proposedEffectiveDate?: { fieldName: string };
  getParentInfo?: (id: string) => string[];
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
