export const medicaidSPARAIResponse = {
  componentType: "medicaidsparai",
  typeLabel: "Medicaid SPA RAI Response",
  idLabel: "SPA ID",
  idRegex:
    "(^[A-Z]{2}-[0-9]{2}-[0-9]{4}-[a-zA-Z0-9]{1,4}$)|(^[A-Z]{2}-[0-9]{2}-[0-9]{4}$)",
  idExistValidations: [
    {
      idMustExist: true,
      errorLevel: "error",
    },
  ],
  allowMultiplesWithSameId: false, // because Medicaid SPAs can only have one RAI and RAI response
  requiredAttachments: ["RAI Response"],
  optionalAttachments: ["Other"],
};
