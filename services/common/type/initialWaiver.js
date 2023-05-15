import { waiverAuthorityB, waiverAuthorityB4 } from "../waiverAuthorities.js";
import {
  other,
  tribalConsultation,
  waiverB4ApplicationPrePrint,
  waiverBCostEffectivenessSpreadsheets,
  waiverBApplicationPrePrint,
} from "../attachmentTypes.js";

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
  requiredAttachments: [waiverB4ApplicationPrePrint],
  optionalAttachments: [tribalConsultation, other],
};

export const initialWaiverB = {
  ...initialWaiver,
  waiverAuthority: waiverAuthorityB,
  requiredAttachments: [
    waiverBApplicationPrePrint,
    waiverBCostEffectivenessSpreadsheets,
  ],
  optionalAttachments: [tribalConsultation, other],
};
