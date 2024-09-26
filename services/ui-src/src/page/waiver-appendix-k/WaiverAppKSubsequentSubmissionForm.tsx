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
  waiverAppKSubsequentSubmission,
} from "cmscommonlib";

export const waiverAppKSubsequentSubmissionFormInfo: OneMACFormConfig = {
  ...defaultSubsequentSubmissionFormConfig,
  ...waiverAppKSubsequentSubmission,
  pageTitle: "Upload Subsequent 1915(c) Appendix K Documentation",
  detailsHeader: "1915(c) Appendix K Subsequent Document",
  landingPage: ONEMAC_ROUTES.PACKAGE_LIST_WAIVER,
  confirmSubmit: defaultConfirmSubsequentSubmission,
  validateParentAPI: "validateParentOfAny",
  introJSX: defaultSubsequentSubmissionIntroJSX,
  attachmentIntroJSX: defaultSubsequentAttachmentInstructionsJSX(
    ROUTES.FAQ_ATTACHMENTS_MED_SPA_RAI
  ),
  attachmentsTitle: "Subsequent 1915(c) Appendix K Documents",
  addlInfoRequired: true,
  atLeastOneAttachmentRequired: true,
};

const WaiverAppKSubsequentSubmissionForm: FC = () => {
  return <OneMACForm formConfig={waiverAppKSubsequentSubmissionFormInfo} />;
};

export default WaiverAppKSubsequentSubmissionForm;
