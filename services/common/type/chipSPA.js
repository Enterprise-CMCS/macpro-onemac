export const chipSPA = {
  whichTab: "spa",
  componentType: "chipspa",
  typeLabel: "CHIP SPA",
  idLabel: "SPA ID",
  idRegex:
    "(^[A-Z]{2}-[0-9]{2}-[0-9]{4}-[a-zA-Z0-9]{1,4}$)|(^[A-Z]{2}-[0-9]{2}-[0-9]{4}$)",
  idMustExist: false,
  allowMultiplesWithSameId: false,
  requiredAttachments: [
    "Current State Plan",
    "Amended State Plan Language",
    "Cover Letter",
  ],
  optionalAttachments: [
    "Budget Documents",
    "Public Notice",
    "Tribal Consultation",
    "Other",
  ],
  theAttributes: [
    "componentId",
    "submissionTimestamp",
    "proposedEffectiveDate",
    "clockEndTimestamp",
    "currentStatus",
    "currentStatusTimestamp",
    "attachments",
    "additionalInformation",
    "submitterName",
    "submitterEmail",
  ],
};
