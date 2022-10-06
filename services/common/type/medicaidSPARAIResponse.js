export const medicaidSPARAIResponse = {
  componentType: "medicaidsparai",
  typeLabel: "Medicaid SPA RAI Response",
  idLabel: "SPA ID",
  idRegex:
    "(^[A-Z]{2}-[0-9]{2}-[0-9]{4}-[a-zA-Z0-9]{1,4}$)|(^[A-Z]{2}-[0-9]{2}-[0-9]{4}$)",
  idMustExist: true,
  allowMultiplesWithSameId: true, // Medicaid SPA RAI can only have one but until business decides how to handle we will allow multiple
  requiredAttachments: ["RAI Response"],
  optionalAttachments: ["Other"],
};
