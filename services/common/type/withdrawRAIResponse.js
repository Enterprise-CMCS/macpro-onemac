export const withdrawRAIResponse = {
  componentType: "raiwithdraw",
  typeLabel: "Withdraw Formal RAI Response",
  idLabel: "Package ID",
  idRegex:
    "(^[A-Z]{2}[.-][0-9]{4,5}$)|(^[A-Z]{2}[.-][0-9]{4,5}[.]R[0-9]{2}$)|(^[A-Z]{2}[.-][0-9]{4,5}[.]R[0-9]{2}[.]M?[0-9]{2}$)",
  idMustExist: true,
  allowMultiplesWithSameId: true,
  requiredAttachments: [],
  optionalAttachments: ["Supporting Documentation"],
  theAttributes: [
    "componentId",
    "submissionTimestamp",
    "currentStatus",
    "attachments",
    "additionalInformation",
    "submitterName",
    "submitterEmail",
  ],
  allowedParentTypes: [
    "medicaidspa",
    "chipspa",
    "waivernew",
    "waiverrenewal",
    "waiveramendment",
    "waiverappk",
  ],
  allowedParentStatuses: ["RAI Response Withdraw Enabled"],
};
