import { chipSPA } from "./chipSPA.js";
import { ONEMAC_TYPE } from "../workflow.js";

export const chipSPASubsequentSubmission = {
  ...chipSPA,
  componentType: ONEMAC_TYPE.CHIP_SPA_SUBSEQUENT_SUBMISSION,
  typeLabel: "Chip SPA Subsequent Submission",
  idMustExist: true,
  allowMultiplesWithSameId: true,
  requiredAttachments: [],
  optionalAttachments: [
    ...chipSPA.requiredAttachments,
    ...chipSPA.optionalAttachments,
  ],
  allowedParentTypes: [ONEMAC_TYPE.CHIP_SPA],
  allowedParentStatuses: ["Under Review"],
};
