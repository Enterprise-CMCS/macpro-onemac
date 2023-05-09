import { waiverAuthorityB, waiverAuthorityB4 } from "../waiverAuthorities.js";

export const waiverAmendment = {
  whichTab: "waiver",
  componentType: "waiveramendment",
  typeLabel: "1915(b) Waiver Amendment",
  idLabel: "1915(b) Waiver Amendment Number",
  idRegex: "^[A-Z]{2}[-][0-9]{4,5}[.]R[0-9]{2}[.](0[1-9]|[1-9][0-9])$",
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

export const waiverAmendmentB4 = {
  ...waiverAmendment,
  waiverAuthority: waiverAuthorityB4,
  requiredAttachments: [
    "1915(b)(4) FFS Selective Contracting (Streamlined) Waiver Application Pre-print",
  ],
  optionalAttachments: ["Tribal Consultation", "Other"],
};

export const waiverAmendmentB = {
  ...waiverAmendment,
  waiverAuthority: waiverAuthorityB,
  requiredAttachments: [
    "1915(b) Comprehensive (Capitated) Waiver Application Pre-print",
    "1915(b) Comprehensive (Capitated) Waiver Cost Effectiveness Spreadsheets",
  ],
  optionalAttachments: ["Tribal Consultation", "Other"],
};
