export const enableRaiWithdraw = {
  componentType: "enableraiwithdraw",
  typeLabel: "Enable Formal RAI Response Withdraw",
  idLabel: "Package ID",
  idRegex: "(^[A-Z]{2}[.-])",
  idMustExist: true,
  allowMultiplesWithSameId: true,
  requiredAttachments: [],
  optionalAttachments: [],
  theAttributes: [
    "componentId",
    "submissionTimestamp",
    "adminChanges",
    "submitterName",
    "submitterEmail",
  ],
};
