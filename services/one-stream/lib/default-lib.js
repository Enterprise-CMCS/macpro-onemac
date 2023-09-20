export const formalRAIResponseType = "Formal RAI Response";
export const initialSubmissionType = "Initial Package";
export const packageType = "Package";
export const submitAction = "Submitted";
export const withdrawalRequestedAction = "Withdrawal Requested";

export const defaultInitialSubmissionMap = {
  type: initialSubmissionType,
  action: submitAction,
  packageAttributes: [
    "submissionTimestamp",
    "proposedEffectiveDate",
    "currentStatus",
    "submitterName",
    "submitterEmail",
  ],
};

export const defaultWaiverInitialSubmissionMap = {
  defaultInitialSubmissionMap,
  packageAttributes: [
    ...defaultInitialSubmissionMap.packageAttributes,
    "waiverAuthority",
  ],
};

export const defaultRAIResponseMap = {
  type: formalRAIResponseType,
  action: submitAction,
  packageAttributes: ["currentStatus"],
};

export const defaultWithdrawPackageMap = {
  type: packageType,
  action: withdrawalRequestedAction,
  packageAttributes: ["currentStatus"],
};

export const defaultWithdrawRAIResponseMap = {
  type: formalRAIResponseType,
  action: withdrawalRequestedAction,
  packageAttributes: ["currentStatus"],
};

export const defaultEventMapping = {
  submit: defaultInitialSubmissionMap,
  submitrai: defaultRAIResponseMap,
  submitwithdraw: defaultWithdrawPackageMap,
  submitrairesponsewithdraw: defaultWithdrawRAIResponseMap,
};

export const defaultWaiverEventMapping = {
  ...defaultEventMapping,
  submit: defaultWaiverInitialSubmissionMap,
};
