import {
  initialWaiver,
  initialWaiverB,
  initialWaiverB4,
} from "./initialWaiver.js";
import { waiverAuthorityB, waiverAuthorityB4 } from "../waiverAuthorities.js";
import { ONEMAC_TYPE } from "../workflow.js";

export const initialWaiverSubsequentSubmission = {
  ...initialWaiver,
  componentType: ONEMAC_TYPE.WAIVER_INITIAL_SUBSEQUENT_SUBMISSION,
  typeLabel: "1915(b) Initial Waiver Subsequent Documents",
  idMustExist: true,
  allowMultiplesWithSameId: true,
  requiredAttachments: [], //default to empty and let subtype B or B4 override
  optionalAttachments: [],
  allowedParentTypes: ["waivernew"],
  allowedParentStatuses: ["Under Review"],
};

export const initialWaiverB4SubsequentSubmission = {
  ...initialWaiverSubsequentSubmission,
  waiverAuthority: waiverAuthorityB4,
  requiredAttachments: [],
  optionalAttachments: [
    ...initialWaiverB4.requiredAttachments,
    ...initialWaiverB4.optionalAttachments,
  ],
};

export const initialWaiverBSubsequentSubmission = {
  ...initialWaiverSubsequentSubmission,
  waiverAuthority: waiverAuthorityB,
  requiredAttachments: [],
  optionalAttachments: [
    ...initialWaiverB.requiredAttachments,
    ...initialWaiverB.optionalAttachments,
  ],
};
