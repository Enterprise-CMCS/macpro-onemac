export const medicaidSPA = {
  packageGroup: "spa",
  componentType: "spa",
  typeLabel: "Medicaid SPA",
  idType: "spa",
  idLabel: "SPA ID",
  idRegex:
    "(^[A-Z]{2}-[0-9]{2}-[0-9]{4}-[a-zA-Z0-9]{1,4}$)|(^[A-Z]{2}-[0-9]{2}-[0-9]{4}$)",
  idExistValidations: [
    {
      idMustExist: false,
      errorLevel: "error",
    },
  ],
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
  requiredUploads: [
    { title: "CMS Form 179", allowMultiple: false },
    "SPA Pages",
  ],
  optionalUploads: [
    "Cover Letter",
    "Document Demonstrating Good-Faith Tribal Engagement",
    "Existing State Plan Page(s)",
    "Public Notice",
    "Standard Funding Questions (SFQs)",
    "Tribal Consultation",
    "Other",
  ],
};
