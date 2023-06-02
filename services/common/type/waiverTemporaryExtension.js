import { ONEMAC_TYPE } from "../workflow.js";

export const waiverTemporaryExtension = {
  whichTab: "waiver",
  componentType: "waiverextension",
  typeLabel: "Waiver Extension",
  idLabel: "Temporary Extension Request Number",
  idRegex: "^[A-Z]{2}[-][0-9]{2,5}[.]R[0-9]{2}[.]TE[0-9]{2}$",
  idMustExist: false,
  allowMultiplesWithSameId: false,
  requiredAttachments: ["Waiver Extension Request"],
  optionalAttachments: ["Other"],
  allowedParentTypes: [
    "waivernew",
    "waiverrenewal",
    "1915(b)New",
    "1915(b)Renew",
    "1915(c)New",
    "1915(c)Renew",
  ],
  allowedParentStatuses: ["Approved"],
  theAttributes: [
    "componentId",
    "submissionTimestamp",
    "currentStatus",
    "attachments",
    "additionalInformation",
    "submitterName",
    "submitterEmail",
    "parentId",
    "parentType",
    "temporaryExtensionType",
  ],
};

export const waiverTemporaryExtension1915b = {
  ...waiverTemporaryExtension,
  componentType: ONEMAC_TYPE.WAIVER_EXTENSION_B,
  typeLabel: "1915(b) Waiver Extension",
  temporaryExtensionType: "1915(b)",
};

export const waiverTemporaryExtension1915c = {
  ...waiverTemporaryExtension,
  componentType: ONEMAC_TYPE.WAIVER_EXTENSION_C,
  typeLabel: "1915(c) Waiver Extension",
  temporaryExtensionType: "1915(c)",
};
