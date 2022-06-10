export const waiverAppendixK = {
  componentType: "waiverappk",
  typeLabel: "1915(c) Appendix K Amendment",
  idType: "waiver",
  idLabel: "Waiver Number",
  idRegex: "(^[A-Z]{2}[.][0-9]{4,5}[.]R[0-9]{2}[.][0-9]{2}$)",
  idExistValidations: [
    {
      idMustExist: true,
      errorLevel: "warn",
      existenceRegex: "^[A-Z]{2}[.][0-9]{4,5}",
    },
  ],
  allowMultiplesWithSameId: false,
  requiredAttachments: ["1915(c) Appendix K Amendment Waiver Template"],
  optionalAttachments: ["Other"],
};
