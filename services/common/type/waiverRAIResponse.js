export const waiverRAIResponse = {
  componentType: "waiverrai",
  typeLabel: "1915(b) RAI Response",
  idType: "waiver",
  idLabel: "Waiver Number",
  idRegex:
    "(^[A-Z]{2}[.-][0-9]{4,5}$)|(^[A-Z]{2}[.-][0-9]{4,5}[.]R[0-9]{2}$)|(^[A-Z]{2}[.-][0-9]{4,5}[.]R[0-9]{2}[.]M?[0-9]{2}$)",
  idExistValidations: [
    {
      idMustExist: true,
      errorLevel: "error",
    },
  ],
  requiredAttachments: ["Waiver RAI Response"],
  optionalAttachments: ["Other"],
  requiredUploads: ["Waiver RAI Response"],
  optionalUploads: ["Other"],
};
