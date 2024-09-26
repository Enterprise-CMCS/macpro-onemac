import {
  waiverAmendment,
  waiverAmendmentB4,
  waiverAmendmentB,
} from "./waiverAmendment.js";
import { waiverAuthorityB, waiverAuthorityB4 } from "../waiverAuthorities.js";
import { ONEMAC_TYPE } from "../workflow.js";

export const waiverAmendmentSubsequentSubmission = {
  ...waiverAmendment,
  componentType: ONEMAC_TYPE.WAIVER_AMENDMENT_SUBSEQUENT_SUBMISSION,
  typeLabel: "Waiver Amendment Subsequent Documents",
  idMustExist: true,
  allowMultiplesWithSameId: true,
  allowedParentStatuses: ["Under Review"],
  requiredAttachments: [], //default to empty and let subtype B or B4 override
  optionalAttachments: [],
};

export const waiverAmendmentB4SubsequentSubmission = {
  ...waiverAmendmentSubsequentSubmission,
  waiverAuthority: waiverAuthorityB4,
  requiredAttachments: [],
  optionalAttachments: [
    ...waiverAmendmentB4.requiredAttachments,
    ...waiverAmendmentB4.optionalAttachments,
  ],
};

export const waiverAmendmentBSubsequentSubmission = {
  ...waiverAmendmentSubsequentSubmission,
  waiverAuthority: waiverAuthorityB,
  requiredAttachments: [],
  optionalAttachments: [
    ...waiverAmendmentB.requiredAttachments,
    ...waiverAmendmentB.optionalAttachments,
  ],
};
