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
  waiverAppKSubsequentSubmission,
} from "cmscommonlib";

export const waiverAppKSubsequentSubmissionFormInfo: OneMACFormConfig = {
  ...defaultOneMACFormConfig,
  ...waiverAppKSubsequentSubmission,
  pageTitle: "Upload Subsequent Medicaid SPA Documentation",
  detailsHeader: "Medicaid SPA Subsequent Submission",
  landingPage: ONEMAC_ROUTES.PACKAGE_LIST_WAIVER,
  confirmSubmit: defaultConfirmSubsequentSubmission,
  validateParentAPI: "validateParentOfAny",
  introJSX: defaultSubsequentSubmissionIntroJSX,
  attachmentIntroJSX: defaultAttachmentInstructionsJSX(
    ROUTES.FAQ_ATTACHMENTS_MED_SPA_RAI
  ),
  attachmentsTitle: "Subsequent Waiver Appendix K Documents",
  addlInfoRequired: true,
  atLeastOneAttachmentRequired: true,
};

const WaiverAppKSubsequentSubmissionForm: FC = () => {
  return <OneMACForm formConfig={waiverAppKSubsequentSubmissionFormInfo} />;
};

export default WaiverAppKSubsequentSubmissionForm;
