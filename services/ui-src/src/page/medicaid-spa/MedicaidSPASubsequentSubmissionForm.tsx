import React, { FC } from "react";
import OneMACForm from "../OneMACForm";
import {
  defaultSubsequentSubmissionFormConfig,
  defaultConfirmSubsequentSubmission,
  defaultSubsequentAttachmentInstructionsJSX,
  defaultSubsequentSubmissionIntroJSX,
  OneMACFormConfig,
} from "../../libs/formLib";
import {
  ONEMAC_ROUTES,
  ROUTES,
  medicaidSPASubsequentSubmission,
} from "cmscommonlib";

export const medicaidSPASubsequentSubmissionFormInfo: OneMACFormConfig = {
  ...defaultSubsequentSubmissionFormConfig,
  ...medicaidSPASubsequentSubmission,
  pageTitle: "Upload Subsequent Medicaid SPA Documentation",
  detailsHeader: "Medicaid SPA Subsequent Document",
  landingPage: ONEMAC_ROUTES.PACKAGE_LIST_SPA,
  confirmSubmit: defaultConfirmSubsequentSubmission,
  validateParentAPI: "validateParentOfAny",
  introJSX: defaultSubsequentSubmissionIntroJSX,
  attachmentIntroJSX: defaultSubsequentAttachmentInstructionsJSX(
    ROUTES.FAQ_ATTACHMENTS_MED_SPA
  ),
  attachmentsTitle: "Subsequent Medicaid SPA Documents",
  addlInfoRequired: true,
  atLeastOneAttachmentRequired: true,
};

const MedicaidSPASubsequentSubmissionForm: FC = () => {
  return <OneMACForm formConfig={medicaidSPASubsequentSubmissionFormInfo} />;
};

export default MedicaidSPASubsequentSubmissionForm;
