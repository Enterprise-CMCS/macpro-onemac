export const initialWaiverWithdraw = {
  componentType: "waivernewwithdraw",
  typeLabel: "1915(b) Initial Waiver Withdraw Request",
  idLabel: "Initial Waiver Number",
  idRegex: "^[A-Z]{2}[-][0-9]{4,5}[.]R00[.]00$",
  idMustExist: true,
  allowMultiplesWithSameId: true,
  requiredAttachments: [],
  optionalAttachments: ["Supporting Documentation"],
  requireUploadOrAdditionalInformation: true,
  theAttributes: [
    "componentId",
    "submissionTimestamp",
    "currentStatus",
    "attachments",
    "additionalInformation",
    "submitterName",
    "submitterEmail",
  ],
  allowedParentTypes: ["waivernew"],
  allowedParentStatuses: [
    "Under Review",
    "Pending - Concurrence",
    "Pending - Approval",
    "RAI Issued",
  ],
};
