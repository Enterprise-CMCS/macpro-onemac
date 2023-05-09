import Joi from "joi";

import { RESPONSE_CODE, Workflow } from "cmscommonlib";
import { CMSWithdrawalNotice } from "../email/CMSWithdrawalNotice";
import { stateWithdrawalReceipt } from "../email/stateWithdrawalReceipt";

export const defaultFormConfig = {
  CMSToAddresses: [process.env.reviewerEmail, process.env.testingEmail].filter(
    Boolean
  ),
  CMSCcAddresses: [],
  newStatus: Workflow.ONEMAC_STATUS.SUBMITTED,
  successResponseCode: RESPONSE_CODE.SUCCESSFULLY_SUBMITTED,
};

export const defaultProposedEffectiveDateSchema = [
  Joi.string().isoDate(),
  Joi.string().valid("none"),
];
export const defaultTitleSchema = Joi.string().required();
export const defaultWaiverAuthoritySchema = Joi.string().required();
export const defaultParentId = Joi.string().required();
export const defaultParentType = Joi.string().required();

export const defaultWaiverSchema = {
  waiverAuthority: defaultWaiverAuthoritySchema,
  proposedEffectiveDate: defaultProposedEffectiveDateSchema,
};

export const defaultWithdrawConfig = {
  ...defaultFormConfig,
  successResponseCode: RESPONSE_CODE.WITHDRAW_REQUESTED,
  buildCMSNotice: CMSWithdrawalNotice,
  buildStateReceipt: stateWithdrawalReceipt,
  appendToSchema: {
    parentId: defaultParentId,
    parentType: defaultParentType,
  },
};
