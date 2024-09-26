import { waiverAppendixK } from "./waiverAppendixK.js";
import { ONEMAC_TYPE } from "../workflow.js";

export const waiverAppKSubsequentSubmission = {
  ...waiverAppendixK,
  componentType: ONEMAC_TYPE.WAIVER_APP_K_SUBSEQUENT_SUBMISSION,
  typeLabel: "Waiver Appendix K Subsequent Document",
  idMustExist: true,
  allowMultiplesWithSameId: true,
  requiredAttachments: [],
  optionalAttachments: [
    ...waiverAppendixK.requiredAttachments,
    ...waiverAppendixK.optionalAttachments,
  ],
  allowedParentStatuses: ["Under Review"],
};
