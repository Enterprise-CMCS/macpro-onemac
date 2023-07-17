export const enableRaiWithdraw = {
  componentType: "enableraiwithdraw",
  typeLabel: "Enable Formal RAI Response Withdraw",
  idLabel: "Package ID",
  idRegex:
    "(^[A-Z]{2}-[0-9]{2}-[0-9]{4}-[a-zA-Z0-9]{1,4}$)|(^[A-Z]{2}-[0-9]{2}-[0-9]{4}$)",
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
