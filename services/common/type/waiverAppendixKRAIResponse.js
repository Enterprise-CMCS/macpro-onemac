export const waiverAppendixKRAIResponse = {
  componentType: "waiverappkrai",
  typeLabel: "1915(c) Appendix K RAI Response",
  idLabel: "Waiver Amendment Number",
  idRegex: "^[A-Z]{2}[-][0-9]{4,5}.R[0-9]{2}.(0[1-9]|[1-9][0-9])$",
  idExistValidations: [
    {
      idMustExist: true,
      errorLevel: "error",
    },
  ],
  allowMultiplesWithSameId: true,
  requiredAttachments: ["1915(c) Appendix K RAI Response"],
  optionalAttachments: ["Other"],
};
