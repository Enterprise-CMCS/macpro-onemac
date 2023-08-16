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
import { FormLocationState } from "../../domain-types";
import { useLocation } from "react-router-dom";

export const waiverAppKSubsequentSubmissionFormInfo: OneMACFormConfig = {
  ...defaultOneMACFormConfig,
  ...waiverAppKSubsequentSubmission,
  pageTitle: "Upload Subsequent Medicaid SPA Documentation",
  detailsHeader: "Medicaid SPA Subsequent Submission",
  landingPage: ONEMAC_ROUTES.PACKAGE_LIST,
  confirmSubmit: defaultConfirmSubsequentSubmission,
  validateParentAPI: "validateParentOfMedicaidSpa",
  introJSX: defaultSubsequentSubmissionIntroJSX,
  attachmentIntroJSX: defaultAttachmentInstructionsJSX(
    ROUTES.FAQ_ATTACHMENTS_MED_SPA_RAI
  ),
  attachmentsTitle: "Subsequent Waiver Appendix K Documents",
  addlInfoRequired: true,
  atLeastOneAttachmentRequired: true,
};

const WaiverAppKSubsequentSubmissionForm: FC = () => {
  const location = useLocation<FormLocationState>();
  if (location.state?.componentId)
    waiverAppKSubsequentSubmissionFormInfo.landingPage = `${ONEMAC_ROUTES.APPENDIX_K_AMENDMENT}/${location.state?.componentId}`;
  return <OneMACForm formConfig={waiverAppKSubsequentSubmissionFormInfo} />;
};

export default WaiverAppKSubsequentSubmissionForm;
