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
  waiverRenewalSubsequentSubmission,
  waiverRenewalB4SubsequentSubmission,
  waiverRenewalBSubsequentSubmission,
  waiverAuthorityB,
  waiverAuthorityB4,
} from "cmscommonlib";
import { FormLocationState } from "../../domain-types";
import { useLocation } from "react-router-dom";

export const waiverRenewalSubsequentSubmissionFormInfo: OneMACFormConfig = {
  ...defaultSubsequentSubmissionFormConfig,
  ...waiverRenewalSubsequentSubmission,
  pageTitle: "Upload Subsequent Waiver Renewal Documentation",
  detailsHeader: "Waiver Renewal Subsequent Submission",
  landingPage: ONEMAC_ROUTES.PACKAGE_LIST_WAIVER,
  confirmSubmit: defaultConfirmSubsequentSubmission,
  validateParentAPI: "validateParentOfWaiverRenewal",
  introJSX: defaultSubsequentSubmissionIntroJSX,
  attachmentIntroJSX: defaultSubsequentAttachmentInstructionsJSX(
    ROUTES.FAQ_ATTACHMENTS_WAIVER_B
  ),
  attachmentsTitle: "Subsequent Waiver Renewal Documents",
  addlInfoRequired: true,
  atLeastOneAttachmentRequired: true,
};

export const waiverRenewalB4SubsequentSubmissionFormInfo = {
  ...waiverRenewalSubsequentSubmissionFormInfo,
  ...waiverRenewalB4SubsequentSubmission,
};

export const waiverRenewalBSubsequentSubmissionFormInfo = {
  ...waiverRenewalSubsequentSubmissionFormInfo,
  ...waiverRenewalBSubsequentSubmission,
};

const WaiverRenewalSubsequentSubmissionForm: FC = () => {
  let formConfig = waiverRenewalSubsequentSubmissionFormInfo;
  const location = useLocation<FormLocationState>();

  if (location.state?.waiverAuthority === waiverAuthorityB.value) {
    formConfig = waiverRenewalBSubsequentSubmissionFormInfo;
  } else if (location.state?.waiverAuthority === waiverAuthorityB4.value) {
    formConfig = waiverRenewalB4SubsequentSubmissionFormInfo;
  }

  return <OneMACForm formConfig={formConfig} />;
};

export default WaiverRenewalSubsequentSubmissionForm;
