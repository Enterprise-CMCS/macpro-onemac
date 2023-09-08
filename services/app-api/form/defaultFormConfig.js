import Joi from "joi";

import { RESPONSE_CODE, Workflow } from "cmscommonlib";
import { CMSWithdrawalNotice } from "../email/CMSWithdrawalNotice";
import { stateWithdrawalReceipt } from "../email/stateWithdrawalReceipt";

export const defaultFormConfig = {
  CMSToAddresses: [process.env.reviewerEmail, process.env.testingEmail].filter(
    Boolean
  ),
  CMSCcAddresses:
    process.env.ccEmail?.split(";")?.filter((s) => s.trim()) ?? [],
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

export const defaultSubsequentSubmissionSchema = {
  parentId: defaultParentId,
  parentType: defaultParentType,
};

export const defaultSubsequentSubmissionConfig = {
  ...defaultFormConfig,
  newStatus: null, //use parent's current package status
  successResponseCode:
    RESPONSE_CODE.SUCCESSFULLY_SUBMITTED_SUBSEQUENT_SUBMISSION,
  appendToSchema: {
    ...defaultSubsequentSubmissionSchema,
  },
};

export const defaultWaiverSubsequentSubmissionConfig = {
  ...defaultSubsequentSubmissionConfig,
  appendToSchema: {
    ...defaultSubsequentSubmissionSchema,
    waiverAuthority: defaultWaiverAuthoritySchema,
  },
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

export const medicaidSpaText = `<p>This response confirms the receipt of your State Plan Amendment (SPA or your response to a SPA Request for Additional Information (RAI)). You can expect a formal response to your submittal to be issued within 90 days, before %NINETYDAYS%.</p>
<p>This mailbox is for the submittal of State Plan Amendments and non-web-based responses to Requests for Additional Information (RAI) on submitted SPAs only.  Any other correspondence will be disregarded.</p>
<p>If you have questions or did not expect this email, please contact <a href="mailto:spa@cms.hhs.gov">SPA@CMS.HHS.gov</a>.</p>
<p>Thank you!</p>`;
export const medicaidSpaRAIText = `<p>This response confirms the receipt of your State Plan Amendment (SPA or your response to a SPA Request for Additional Information (RAI)). You can expect a formal response to your submittal to be issued within 90 days. To calculate the 90th day, please count the date of receipt as day zero. The 90th day will be 90 calendar days from that date.</p>
<p>This mailbox is for the submittal of State Plan Amendments and non-web-based responses to Requests for Additional Information (RAI) on submitted SPAs only.  Any other correspondence will be disregarded.</p>
<p>If you have any questions, please contact <a href="mailto:spa@cms.hhs.gov">spa@cms.hhs.gov</a> or your state lead.</p>
<p>Thank you!</p>`;
export const chipSpaText = `<p>This response confirms the receipt of your CHIP State Plan Amendment (CHIP SPA or your response to a SPA Request for Additional Information (RAI)). You can expect a formal response to your submittal from CMS at a later date.</p>
<p>If you have questions or did not expect this email, please contact <a href="CHIPSPASubmissionMailBox@CMS.HHS.gov">CHIPSPASubmissionMailBox@CMS.HHS.gov</a>.</p>
<p>Thank you!</p>`;
export const chipSpaRAIText = `<p>This response confirms the receipt of your CHIP State Plan Amendment (SPA or your response to a SPA Request for Additional Information (RAI)).</p>
<p>If you have any questions, please contact <a href="CHIPSPASubmissionMailBox@CMS.HHS.gov">CHIPSPASubmissionMailBox@CMS.HHS.gov</a> or your state lead.</p>
<p>Thank you!</p>`;
export const waiverActionText = `<p>This response confirms the receipt of your Waiver request or your response to a Waiver Request for Additional Information (RAI)). You can expect a formal response to your submittal to be issued within 90 days, before %NINETYDAYS%.</p>
<p>This mailbox is for the submittal of Section 1915(b) and 1915(c) non-web-based Waivers, responses to Requests for Additional Information (RAI) on Waivers, and extension requests on Waivers only.  Any other correspondence will be disregarded.</p>
<p>If you have any questions, please contact <a href="mailto:spa@cms.hhs.gov">spa@cms.hhs.gov</a> or your state lead.</p>
<p>Thank you!</p>`;
export const waiverRAIText = `<p>This response confirms the receipt of your Waiver request or your response to a Waiver Request for Additional Information (RAI)). You can expect a formal response to your submittal to be issued within 90 days. To calculate the 90th day, please count the date of receipt as day zero. The 90th day will be 90 calendar days from that date.</p>
<p>This mailbox is for the submittal of Section 1915(b) and 1915(c) non-web-based Waivers, responses to Requests for Additional Information (RAI) on Waivers, and extension requests on Waivers only.  Any other correspondence will be disregarded.</p>
<p>If you have any questions, please contact <a href="mailto:spa@cms.hhs.gov">spa@cms.hhs.gov</a> or your state lead.</p>
<p>Thank you!</p>`;
export const waiverExtensionText = `<p>This mailbox is for the submittal of Section 1915(b) and 1915(c) non-web-based Waivers, responses to Requests for Additional Information (RAI), and extension requests on Waivers only. Any other correspondence will be disregarded.</p>
<p>If you have any questions, please contact <a href="mailto:spa@cms.hhs.gov">spa@cms.hhs.gov</a> or your state lead.</p>
<p>Thank you!</p>`;
