import { UserRole } from "cmscommonlib";
import { PackageType } from "./formLib";

export type AttributeDetail = {
  heading: string;
  fieldName: string;
  default?: string | null;
  rolePrivilege?: keyof UserRole;
};

export type OneMACDetail = {
  componentType: string;
  actionLabel: string;
  show90thDayInfo: boolean;
  showEffectiveDate: boolean;
  detailHeader?: string;
  detailSection: AttributeDetail[];
  showReviewTeam: boolean;
  allowWaiverExtension: boolean;
  attachmentsHeading: string;
} & Partial<PackageType>;
export const blankBox: AttributeDetail = {
  heading: "",
  fieldName: "",
};
export const submissionIdDefault: AttributeDetail = {
  heading: "Submission ID",
  fieldName: "componentId",
  default: null,
};
export const latestActivityDefault: AttributeDetail = {
  heading: "Latest Package Activity",
  fieldName: "lastActivityNice",
  default: "-- --",
};
export const submissionDateDefault: AttributeDetail = {
  heading: "Initial Submission Date",
  fieldName: "submissionDateNice",
  default: null,
};
export const latestRaiResponseDateDefault: AttributeDetail = {
  heading: "Formal RAI Response",
  fieldName: "latestRaiResponseDateNice",
  default: "-- --",
  rolePrivilege: "isCMSUser",
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
export const approvedEffectiveDateDefault: AttributeDetail = {
  heading: "Approved Effective Date",
  fieldName: "approvedEffectiveDateNice",
  default: "-- --",
};
export const finalDispositionDateDefault: AttributeDetail = {
  heading: "Final Disposition Date",
  fieldName: "finalDispositionDateNice",
  default: "-- --",
};
export const subjectDefault: AttributeDetail = {
  heading: "Subject",
  fieldName: "subject",
  default: "-- --",
  rolePrivilege: "isCMSUser",
};
export const descriptionDefault: AttributeDetail = {
  heading: "Description",
  fieldName: "description",
  default: "-- --",
  rolePrivilege: "isCMSUser",
};
export const cpocDefault: AttributeDetail = {
  heading: "CPOC",
  fieldName: "cpocName",
  default: "-- --",
};
export enum DetailViewTab {
  MAIN = "main",
  DETAIL = "component-details",
  ADDITIONAL = "additional-info",
  EXTENSION = "temp-extension",
}

export type DetailNavGroup = {
  label: string;
  items: DetailNavItem[];
};
export type DetailNavItem = {
  id: DetailViewTab;
  label: string;
  url: string;
};

export const detailSectionNavItem: DetailNavItem = {
  id: DetailViewTab.DETAIL,
  label: "Package Details",
  url: `#${DetailViewTab.DETAIL}`,
};

export const additionalInfoSectionNavItem: DetailNavItem = {
  id: DetailViewTab.ADDITIONAL,
  label: "Additional Information",
  url: `#${DetailViewTab.ADDITIONAL}`,
};

export const tempExtensionSectionNavItem: DetailNavItem = {
  id: DetailViewTab.EXTENSION,
  label: "Temporary Extension",
  url: `#${DetailViewTab.EXTENSION}`,
};

export const defaultPackageOverviewNavItems: DetailNavItem[] = [
  detailSectionNavItem,
  additionalInfoSectionNavItem,
];

export const defaultPackageOverviewLabel: string = "Package Overview";

export const defaultDetailSectionItems = [
  submissionIdDefault,
  latestActivityDefault,
  territoryDefault,
  typeDefault,
  submissionDateDefault,
  proposedEffectiveDateDefault,
  approvedEffectiveDateDefault,
  finalDispositionDateDefault,
  latestRaiResponseDateDefault,
  blankBox, // empty space
  subjectDefault,
  descriptionDefault,
  cpocDefault,
];

export const defaultWaiverDetailSectionItems = [
  waiverAuthorityDefault,
  blankBox, // empty space
  territoryDefault,
  typeDefault,
  submissionDateDefault,
  proposedEffectiveDateDefault,
  approvedEffectiveDateDefault,
  finalDispositionDateDefault,
  latestRaiResponseDateDefault,
  blankBox, // empty space -- TODO: separator
  subjectDefault,
  descriptionDefault,
  cpocDefault,
];

export const defaultDetail: OneMACDetail = {
  actionLabel: "Package Actions",
  componentType: "none",
  attachmentsHeading: "Attachments",
  show90thDayInfo: false,
  showEffectiveDate: false,
  showReviewTeam: true,
  detailHeader: "Package",
  allowWaiverExtension: false,
  detailSection: [...defaultDetailSectionItems],
};

export const defaultWaiverDetail: OneMACDetail = {
  ...defaultDetail,
  detailSection: [...defaultWaiverDetailSectionItems],
};
