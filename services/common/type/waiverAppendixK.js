export const waiverAppendixK = {
  whichTab: "waiver",
  componentType: "waiverappk",
  typeLabel: "1915(c) Appendix K Amendment",
  idLabel: "Waiver Amendment Number",
  idRegex: "^[A-Z]{2}[-][0-9]{4,5}[.]R[0-9]{2}[.](0[1-9]|[1-9][0-9])$",
  idMustExist: false,
  waiverAuthority: { label: "1915(c) HCBS", value: "1915(c)" },
  allowMultiplesWithSameId: false,
  requiredAttachments: ["1915(c) Appendix K Amendment Waiver Template"],
  optionalAttachments: ["Other"],
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
    "title",
  ],
  secondClockStatuses: [
    "Pending",
    "Pending - Concurrence",
    "Pending - Approval",
  ],
};
