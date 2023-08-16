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
import { FormLocationState } from "../../domain-types";
import { useLocation } from "react-router-dom";

export const chipSPASubsequentSubmissionFormInfo: OneMACFormConfig = {
  ...defaultOneMACFormConfig,
  ...chipSPASubsequentSubmission,
  pageTitle: "Upload Subsequent CHIP SPA Documentation",
  detailsHeader: "CHIP SPA Subsequent Submission",
  landingPage: ONEMAC_ROUTES.PACKAGE_LIST,
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
  const location = useLocation<FormLocationState>();
  if (location.state?.componentId)
    chipSPASubsequentSubmissionFormInfo.landingPage = `${ONEMAC_ROUTES.MEDICAID_SPA_DETAIL}/${location.state?.componentId}`;
  return <OneMACForm formConfig={chipSPASubsequentSubmissionFormInfo} />;
};

export default ChipSPASubsequentSubmissionForm;
