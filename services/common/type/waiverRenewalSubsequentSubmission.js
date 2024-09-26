import {
  waiverRenewal,
  waiverRenewalB4,
  waiverRenewalB,
} from "./waiverRenewal.js";
import { ONEMAC_TYPE } from "../workflow.js";
import { waiverAuthorityB, waiverAuthorityB4 } from "../waiverAuthorities.js";

export const waiverRenewalSubsequentSubmission = {
  ...waiverRenewal,
  ...waiverRenewalB4,
  componentType: ONEMAC_TYPE.WAIVER_RENEWAL_SUBSEQUENT_SUBMISSION,
  typeLabel: "Waiver Renewal Subsequent Document",
  idMustExist: true,
  allowMultiplesWithSameId: true,
  allowedParentTypes: ["waiverrenewal"],
  allowedParentStatuses: ["Under Review"],
  requiredAttachments: [], //default to empty and let subtype B or B4 override
  optionalAttachments: [],
};

export const waiverRenewalB4SubsequentSubmission = {
  ...waiverRenewalSubsequentSubmission,
  waiverAuthority: waiverAuthorityB4,
  requiredAttachments: [],
  optionalAttachments: [
    ...waiverRenewalB4.requiredAttachments,
    ...waiverRenewalB4.optionalAttachments,
  ],
};

export const waiverRenewalBSubsequentSubmission = {
  ...waiverRenewalSubsequentSubmission,
  waiverAuthority: waiverAuthorityB,
  requiredAttachments: [],
  optionalAttachments: [
    ...waiverRenewalB.requiredAttachments,
    ...waiverRenewalB.optionalAttachments,
  ],
};
