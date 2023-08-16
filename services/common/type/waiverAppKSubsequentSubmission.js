import { waiverAppendixK } from "./waiverAppendixK.js";
import { ONEMAC_TYPE } from "../workflow.js";

export const waiverAppKSubsequentSubmission = {
  ...waiverAppendixK,
  componentType: ONEMAC_TYPE.WAIVER_APP_K_SUBSEQUENT_SUBMISSION,
  typeLabel: "Waiver Appendix K Subsequent Submission",
  idRegex: "^[A-Z]{2}[-][0-9]{4,5}[.]R[0-9]{2}[.](0[1-9]|[1-9][0-9])$",
  idMustExist: true,
  allowMultiplesWithSameId: true,
  requiredAttachments: [],
  optionalAttachments: [
    ...waiverAppendixK.requiredAttachments,
    ...waiverAppendixK.optionalAttachments,
  ],
  allowedParentStatuses: ["Under Review"],
};
