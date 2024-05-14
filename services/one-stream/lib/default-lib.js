export const formalRAIResponseType = "Formal RAI Response";
export const initialSubmissionType = "Initial Package";
export const packageType = "Package";
export const submitAction = "Submitted";
export const withdrawalRequestedAction = "Withdrawal Requested";
export const subsequentSubmissionType = "Subsequent Documentation Uploaded";

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

export const defaultCreateMap = {
  type: null,
  action: null,
  packageAttributes: [
    "submissionTimestamp",
    "proposedEffectiveDate",
    "currentStatus",
  ],
};

export const defaultWaiverInitialSubmissionMap = {
  ...defaultInitialSubmissionMap,
  packageAttributes: [
    ...defaultInitialSubmissionMap.packageAttributes,
    "waiverAuthority",
  ],
};

export const defaultRnAWaiverInitialSubmissionMap = {
  ...defaultWaiverInitialSubmissionMap,
  packageAttributes: [
    ...defaultWaiverInitialSubmissionMap.packageAttributes,
    "parentId",
    "parentType",
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
  create: defaultCreateMap,
  submit: defaultInitialSubmissionMap,
  submitrai: defaultRAIResponseMap,
  submitwithdraw: defaultWithdrawPackageMap,
  submitrairesponsewithdraw: defaultWithdrawRAIResponseMap,
};

export const defaultWaiverEventMapping = {
  ...defaultEventMapping,
  submit: defaultWaiverInitialSubmissionMap,
};

export const defaultRnAWaiverEventMapping = {
  ...defaultWaiverEventMapping,
  submit: defaultRnAWaiverInitialSubmissionMap,
};

export const defaultWaiverExtensionEventMapping = {
  ...defaultRnAWaiverEventMapping,
  submit: {
    ...defaultRnAWaiverInitialSubmissionMap,
    packageAttributes: [
      ...defaultRnAWaiverInitialSubmissionMap.packageAttributes,
      "temporaryExtensionType",
    ],
  },
};
