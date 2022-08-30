export const chipSPARAIResponse = {
  componentType: "chipsparai",
  typeLabel: "CHIP SPA RAI Response",
  idLabel: "SPA ID",
  idRegex:
    "(^[A-Z]{2}-[0-9]{2}-[0-9]{4}-[a-zA-Z0-9]{1,4}$)|(^[A-Z]{2}-[0-9]{2}-[0-9]{4}$)",
  idExistValidations: [
    {
      idMustExist: true,
      errorLevel: "error",
    },
  ],
  allowMultiplesWithSameId: true,
  requiredAttachments: [
    "Revised Amended State Plan Language",
    "Official RAI Response",
  ],
  optionalAttachments: [
    "Budget Documents",
    "Public Notice",
    "Tribal Consultation",
    "Other",
  ],
};
