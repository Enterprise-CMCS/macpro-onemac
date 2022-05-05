export const medicaidSPARAIResponse = {
  componentType: "sparai",
  typeLabel: "Medicaid SPA RAI Response",
  idType: "spa",
  idLabel: "SPA ID",
  idRegex:
    "(^[A-Z]{2}-[0-9]{2}-[0-9]{4}-[a-zA-Z0-9]{1,4}$)|(^[A-Z]{2}-[0-9]{2}-[0-9]{4}$)",
  idExistValidations: [
    {
      idMustExist: true,
      errorLevel: "error",
    },
  ],
  requiredAttachments: ["RAI Response"],
  optionalAttachments: ["Other"],
  requiredUploads: ["RAI Response"],
  optionalUploads: ["Other"],
};
