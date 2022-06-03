import { Workflow, FieldHint } from "cmscommonlib";

type SelectOption = { label: string; value: string };

type OneMACIDInfo = {
  idType?: string;
  idLabel: string;
  idFormat: string;
  idRegex: string;
  idFieldHint: FieldHint[];
  idFAQLink: string;
  idExistValidations: {
    existenceRegex?: RegExp;
    idMustExist?: boolean;
    errorLevel: string;
  }[];
};

export type WaiverFormInfo = {
  waiverAuthority: { optionsList: SelectOption[] };
  proposedEffectiveDate: { fieldName: string };
};

export type FileUploadProps = {
  title: string;
  allowMultiple?: boolean;
};

export type OneMACFormInfo = {
  type: string;
  actionType: string;
  pageTitle: string;
  addlIntroJSX?: string;
  detailsHeader?: string;
  transmittalNumber: OneMACIDInfo;
  requiredUploads: FileUploadProps[];
  optionalUploads: FileUploadProps[];
  actionsByStatus: Record<string, Workflow.PACKAGE_ACTION[]>;
  raiLink: string;
  landingPage: string;
} & Partial<WaiverFormInfo>;

export const defaultWaiverAuthority = {
  fieldName: "waiverAuthority",
  errorMessage: "Please select the Waiver Authority.",
  optionsList: [
    { label: "-- select a waiver authority --", value: "" },
    {
      label: "1915(b)(4) FFS Selective Contracting waivers",
      value: "1915(b)(4)",
    },
    { label: "All other 1915(b) Waivers", value: "1915(b)" },
  ],
};
