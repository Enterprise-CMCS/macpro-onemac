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
  chipSPASubsequentSubmission,
} from "cmscommonlib";

export const chipSPASubsequentSubmissionFormInfo: OneMACFormConfig = {
  ...defaultOneMACFormConfig,
  ...chipSPASubsequentSubmission,
  pageTitle: "Upload Subsequent CHIP SPA Documentation",
  detailsHeader: "CHIP SPA Subsequent Submission",
  landingPage: ONEMAC_ROUTES.PACKAGE_LIST_SPA,
  confirmSubmit: defaultConfirmSubsequentSubmission,
  validateParentAPI: "validateParentOfChipSpaWithdraw",
  introJSX: defaultSubsequentSubmissionIntroJSX,
  attachmentIntroJSX: defaultAttachmentInstructionsJSX(
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
