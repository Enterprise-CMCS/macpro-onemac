import { ROUTES, Workflow } from "cmscommonlib";

export type AttributeDetail = {
  heading: string;
  fieldName: string;
  default?: string | null;
};

export type OneMACDetail = {
  defaultTitle: null;
  usesVerticalNav: boolean;
  componentType: string;
  navItems: DetailNavGroup[];
  actionLabel: string;
  show90thDayInfo: boolean;
  showEffectiveDate: boolean;
  actionsByStatus: Record<string, Workflow.PACKAGE_ACTION[]>;
  raiLink: string;
  detailHeader?: string;
  detailSection: AttributeDetail[];
  allowWaiverExtension: boolean;
  attachmentsHeading: string;
};

export const submissionDateDefault: AttributeDetail = {
  heading: "Date Submitted",
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

export enum DetailViewTab {
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

export const defaultPackageOverviewLabel: string = "PackageOverview";

export const defaultDetail: OneMACDetail = {
  actionLabel: "Package Actions",
  componentType: "none",
  attachmentsHeading: "Base Supporting Documentation",
  usesVerticalNav: true,
  navItems: [
    {
      label: defaultPackageOverviewLabel,
      items: defaultPackageOverviewNavItems,
    },
  ],
  actionsByStatus: Workflow.defaultActionsByStatus,
  show90thDayInfo: true,
  showEffectiveDate: false,
  detailHeader: "Package",
  raiLink: ROUTES.WAIVER_RAI,
  defaultTitle: null,
  allowWaiverExtension: false,
  detailSection: [
    typeDefault,
    territoryDefault,
    submissionDateDefault,
    proposedEffectiveDateDefault,
  ],
};