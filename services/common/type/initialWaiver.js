import { waiverAuthorityB, waiverAuthorityB4 } from "../waiverAuthorities.js";

export const initialWaiver = {
  whichTab: "waiver",
  componentType: "waivernew",
  typeLabel: "1915(b) Initial Waiver",
  idLabel: "Initial Waiver Number",
  idRegex: "^[A-Z]{2}[-][0-9]{4,5}[.]R00[.]00$",
  idMustExist: false,
  allowMultiplesWithSameId: false,
  allowWaiverExtension: true,
  deprecatedAttachmentTypes: ["Required Upload (per Waiver Authority)"],
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
  ],
};

export const initialWaiverB4 = {
  ...initialWaiver,
  waiverAuthority: waiverAuthorityB4,
  requiredAttachments: [
    "1915(b)(4) FFS Selective Contracting (Streamlined) waiver application pre-print",
  ],
  optionalAttachments: ["Tribal Consultation", "Other"],
};

export const initialWaiverB = {
  ...initialWaiver,
  waiverAuthority: waiverAuthorityB,
  requiredAttachments: [
    "1915(b) Comprehensive (Capitated) Waiver Application Pre-print",
    "1915(b) Comprehensive Cost effectiveness spreadsheets",
  ],
  optionalAttachments: ["Tribal Consultation", "Other"],
};
