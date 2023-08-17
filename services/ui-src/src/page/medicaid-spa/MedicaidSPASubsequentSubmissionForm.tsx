import React, { FC } from "react";
import OneMACForm from "../OneMACForm";
import {
  defaultAttachmentInstructionsJSX,
  defaultConfirmSubsequentSubmission,
  defaultOneMACFormConfig,
  defaultSubsequentSubmissionIntroJSX,
  OneMACFormConfig,
} from "../../libs/formLib";
import {
  ONEMAC_ROUTES,
  ROUTES,
  medicaidSPASubsequentSubmission,
} from "cmscommonlib";

export const medicaidSPASubsequentSubmissionFormInfo: OneMACFormConfig = {
  ...defaultOneMACFormConfig,
  ...medicaidSPASubsequentSubmission,
  pageTitle: "Upload Subsequent Medicaid SPA Documentation",
  detailsHeader: "Medicaid SPA Subsequent Submission",
  landingPage: ONEMAC_ROUTES.PACKAGE_LIST_SPA,
  confirmSubmit: defaultConfirmSubsequentSubmission,
  validateParentAPI: "validateParentOfMedicaidSpa",
  introJSX: defaultSubsequentSubmissionIntroJSX,
  attachmentIntroJSX: defaultAttachmentInstructionsJSX(
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
