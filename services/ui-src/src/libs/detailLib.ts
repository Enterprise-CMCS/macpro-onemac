import { Workflow } from "cmscommonlib";
import { PackageType } from "./formLib";

export type AttributeDetail = {
  heading: string;
  fieldName: string;
  default?: string | null;
};

export type OneMACDetail = {
  defaultTitle: null;
  componentType: string;
  actionLabel: string;
  show90thDayInfo: boolean;
  showEffectiveDate: boolean;
  actionsByStatus: Record<string, Workflow.PACKAGE_ACTION[]>;
  detailHeader?: string;
  detailSection: AttributeDetail[];
  allowWaiverExtension: boolean;
  attachmentsHeading: string;
} & Partial<PackageType>;

export const submissionDateDefault: AttributeDetail = {
  heading: "Initial Submission Date",
  fieldName: "submissionDateNice",
  default: null,
};
export const waiverAuthorityDefault: AttributeDetail = {
  heading: "Waiver Authority",
  fieldName: "waiverAuthorityNice",
  default: "N/A",
};
export const typeDefault: AttributeDetail = {
  heading: "Type",
  fieldName: "typeNice",
  default: "N/A",
};
export const territoryDefault: AttributeDetail = {
  heading: "State",
  fieldName: "territoryNice",
  default: null,
};
export const proposedEffectiveDateDefault: AttributeDetail = {
  heading: "Proposed Effective Date",
  fieldName: "proposedEffectiveDateNice",
  default: "N/A",
};

export const defaultDetail: OneMACDetail = {
  actionLabel: "Package Actions",
  componentType: "none",
  attachmentsHeading: "Attachments",
  actionsByStatus: Workflow.defaultActionsByStatus,
  show90thDayInfo: false,
  showEffectiveDate: false,
  detailHeader: "Package",
  defaultTitle: null,
  allowWaiverExtension: false,
  detailSection: [
    typeDefault,
    territoryDefault,
    submissionDateDefault,
    proposedEffectiveDateDefault,
  ],
};
