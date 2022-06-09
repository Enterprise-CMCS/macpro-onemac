import { ROUTES, Workflow } from "cmscommonlib";

type AttributeDetail = {
  heading: string;
  fieldName: string;
  default?: string | null;
};

export type OneMACDetail = {
  defaultTitle: null;
  usesVerticalNav: boolean;
  actionLabel: string;
  actionsByStatus: Record<string, Workflow.PACKAGE_ACTION[]>;
  raiLink: string;
  detailHeader?: string;
  detailSection: AttributeDetail[];
  attachmentsHeading: string;
};

const submissionDateDefault: AttributeDetail = {
  heading: "Date Submitted",
  fieldName: "submissionDateNice",
  default: null,
};
const waiverAuthorityDefault: AttributeDetail = {
  heading: "Waiver Authority",
  fieldName: "waiverAuthorityNice",
  default: "N/A",
};
const typeDefault: AttributeDetail = {
  heading: "Type",
  fieldName: "typeNice",
  default: "N/A",
};
const territoryDefault: AttributeDetail = {
  heading: "State",
  fieldName: "territoryNice",
  default: null,
};
const proposedEffectiveDateDefault: AttributeDetail = {
  heading: "Proposed Effective Date",
  fieldName: "proposedEffectiveDateNice",
  default: "N/A",
};

export const defaultDetail: OneMACDetail = {
  actionLabel: "Package Actions",
  attachmentsHeading: "Base Supporting Documentation",
  usesVerticalNav: true,
  actionsByStatus: Workflow.defaultActionsByStatus,
  detailHeader: "Package",
  raiLink: ROUTES.WAIVER_RAI,
  defaultTitle: null,
  detailSection: [
    waiverAuthorityDefault,
    { heading: "Waiver Number", fieldName: "componentId", default: "N/A" },
    typeDefault,
    territoryDefault,
    submissionDateDefault,
    proposedEffectiveDateDefault,
  ],
};
