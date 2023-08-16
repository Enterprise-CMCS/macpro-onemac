import { medicaidSPA } from "./medicaidSPA.js";
export const medicaidSPASubsequentSubmission = {
  ...medicaidSPA,
  componentType: "medicaidspasubsequent",
  typeLabel: "Medicaid SPA Subsequent Submission",
  idMustExist: true,
  allowMultiplesWithSameId: true,
  requiredAttachments: [],
  optionalAttachments: [
    ...medicaidSPA.requiredAttachments,
    ...medicaidSPA.optionalAttachments.filter(
      (attachment) => attachment !== "Cover Letter"
    ),
  ],
  allowedParentTypes: ["medicaidspa"],
  allowedParentStatuses: ["Under Review"],
};
