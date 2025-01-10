import React, { FC } from "react";
import OneMACForm from "../OneMACForm";
import {
  defaultConfirmSubsequentSubmission,
  defaultSubsequentAttachmentInstructionsJSX,
  defaultSubsequentSubmissionFormConfig,
  defaultSubsequentSubmissionIntroJSX,
  OneMACFormConfig,
} from "../../libs/formLib";
import {
  ONEMAC_ROUTES,
  ROUTES,
  chipSPASubsequentSubmission,
} from "cmscommonlib";

export const chipSPASubsequentSubmissionFormInfo: OneMACFormConfig = {
  ...defaultSubsequentSubmissionFormConfig,
  ...chipSPASubsequentSubmission,
  pageTitle: "Upload Subsequent CHIP SPA Documentation",
  detailsHeader: "CHIP SPA Subsequent Documents",
  landingPage: ONEMAC_ROUTES.PACKAGE_LIST_SPA,
  confirmSubmit: defaultConfirmSubsequentSubmission,
  validateParentAPI: "validateParentOfAny",
  introJSX: defaultSubsequentSubmissionIntroJSX,
  attachmentIntroJSX: defaultSubsequentAttachmentInstructionsJSX(
    ROUTES.FAQ_ATTACHMENTS_CHIP_SPA
  ),
  attachmentsTitle: "Subsequent CHIP SPA Documents",
  addlInfoRequired: true,
  atLeastOneAttachmentRequired: true,
};

const ChipSPASubsequentSubmissionForm: FC = () => {
  return <OneMACForm formConfig={chipSPASubsequentSubmissionFormInfo} />;
};

export default ChipSPASubsequentSubmissionForm;
