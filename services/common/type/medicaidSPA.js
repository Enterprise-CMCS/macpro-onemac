export const medicaidSPA = {
  whichTab: "spa",
  componentType: "medicaidspa",
  typeLabel: "Medicaid SPA",
  idLabel: "SPA ID",
  idRegex:
    "(^[A-Z]{2}-[0-9]{2}-[0-9]{4}-[a-zA-Z0-9]{1,4}$)|(^[A-Z]{2}-[0-9]{2}-[0-9]{4}$)",
  idMustExist: false,
  allowMultiplesWithSameId: false,
  requiredAttachments: [
    { title: "CMS Form 179", allowMultiple: false },
    "SPA Pages",
  ],
  optionalAttachments: [
    "Cover Letter",
    "Document Demonstrating Good-Faith Tribal Engagement",
    "Existing State Plan Page(s)",
    "Public Notice",
    "Standard Funding Questions (SFQs)",
    "Tribal Consultation",
    "Other",
  ],
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
  ],
  secondClockStatuses: [
    "Pending",
    "Pending - Concurrence",
    "Pending - Approval",
  ],
};
