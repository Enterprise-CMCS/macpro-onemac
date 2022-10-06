export const waiverTemporaryExtension = {
  componentType: "waiverextension",
  typeLabel: "Waiver Extension",
  idLabel: "Temporary Extension Request Number",
  idRegex: "^[A-Z]{2}[-][0-9]{4,5}[.]R[0-9]{2}[.]TE[0-9]{2}$",
  idMustExist: false,
  allowMultiplesWithSameId: false,
  requiredAttachments: ["Waiver Extension Request"],
  optionalAttachments: ["Other"],
  allowedParentTypes: ["waivernew", "waiverrenewal"],
  allowedParentStatuses: ["Approved"],
};
