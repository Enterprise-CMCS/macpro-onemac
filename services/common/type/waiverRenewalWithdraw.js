export const waiverRenewalWithdraw = {
  componentType: "waiverrenewalwithdraw",
  typeLabel: "1915(b) Waiver Renewal Withdraw Request",
  packageLabel: "1915(b) Waiver Renewal",
  idLabel: "1915(b) Waiver Renewal Number",
  idRegex: "^[A-Z]{2}[-][0-9]{4,5}[.]R(0[1-9]|[1-9][0-9])[.]00$",
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
  allowedParentTypes: ["waiverrenewal"],
  allowedParentStatuses: [
    "Under Review",
    "Pending - Concurrence",
    "Pending - Approval",
    "RAI Issued",
  ],
};
