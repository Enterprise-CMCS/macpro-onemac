export const waiverAmendmentWithdraw = {
  componentType: "waiveramendmentwithdraw",
  typeLabel: "1915(b) Waiver Amendment Withdraw Request",
  packageLabel: "1915(b) Waiver Amendment",
  idLabel: "1915(b) Waiver Amendment Number",
  idRegex: "^[A-Z]{2}[-][0-9]{4,5}[.]R[0-9]{2}[.](0[1-9]|[1-9][0-9])$",
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
  allowedParentTypes: ["waiveramendment"],
  allowedParentStatuses: [
    "Under Review",
    "Pending - Concurrence",
    "Pending - Approval",
    "RAI Issued",
  ],
};
