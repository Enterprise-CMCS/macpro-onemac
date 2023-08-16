import { chipSPA } from "./chipSPA.js";

export const chipSPASubsequentSubmission = {
  componentType: "chipspasubsequent",
  typeLabel: "Chip SPA Subsequent Submission",
  idLabel: "Chip SPA ID",
  idRegex:
    "(^[A-Z]{2}-[0-9]{2}-[0-9]{4}-[a-zA-Z0-9]{1,4}$)|(^[A-Z]{2}-[0-9]{2}-[0-9]{4}$)",
  idMustExist: true,
  allowMultiplesWithSameId: true,
  requiredAttachments: [],
  optionalAttachments: [
    ...chipSPA.requiredAttachments,
    ...chipSPA.optionalAttachments,
  ],
  theAttributes: [
    "componentId",
    "submissionTimestamp",
    "currentStatus",
    "attachments",
    "additionalInformation",
    "submitterName",
    "submitterEmail",
  ],
  allowedParentTypes: ["chipspa"],
  allowedParentStatuses: ["Under Review"],
};
