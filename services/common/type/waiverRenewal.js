import { waiverAuthorityB, waiverAuthorityB4 } from "../waiverAuthorities.js";

export const waiverRenewal = {
  componentType: "waiverrenewal",
  whichTab: "waiver",
  typeLabel: "1915(b) Waiver Renewal",
  idLabel: "1915(b) Waiver Renewal Number",
  idRegex: "^[A-Z]{2}[-][0-9]{4,5}[.]R(0[1-9]|[1-9][0-9])[.]00$",
  idMustExist: false,
  allowMultiplesWithSameId: false,
  allowedParentTypes: [
    "waivernew",
    "waiverrenewal",
    "1915(b)New",
    "1915(b)Renew",
  ],
  allowedParentStatuses: ["Approved"],
  theAttributes: [
    "componentId",
    "submissionTimestamp",
    "proposedEffectiveDate",
    "clockEndTimestamp",
    "currentStatus",
    "attachments",
    "additionalInformation",
    "submitterName",
    "submitterEmail",
    "waiverAuthority",
    "parentId",
    "parentType",
  ],
};

export const waiverRenewalB4 = {
  ...waiverRenewal,
  waiverAuthority: waiverAuthorityB4,
  requiredAttachments: [
    "1915(b)(4) FFS Selective Contracting (Streamlined) Waiver Application Pre-print",
  ],
  optionalAttachments: [
    "1915(b)(4) FFS Selective Contracting (Streamlined) Independent Assessment (first two renewals only)",
    "Tribal Consultation",
    "Other",
  ],
};

export const waiverRenewalB = {
  ...waiverRenewal,
  waiverAuthority: waiverAuthorityB,
  requiredAttachments: [
    "1915(b) Comprehensive (Capitated) Waiver Application Pre-print",
    "1915(b) Comprehensive (Capitated) Waiver Cost Effectiveness Spreadsheets",
  ],
  optionalAttachments: [
    "1915(b) Comprehensive (Capitated) Waiver Independent Assessment (first two renewals only)",
    "Tribal Consultation",
    "Other",
  ],
};
