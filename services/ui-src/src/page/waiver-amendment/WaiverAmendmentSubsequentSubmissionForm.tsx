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
  waiverAmendmentSubsequentSubmission,
  waiverAmendmentB4SubsequentSubmission,
  waiverAmendmentBSubsequentSubmission,
  waiverAuthorityB,
  waiverAuthorityB4,
} from "cmscommonlib";
import { FormLocationState } from "../../domain-types";
import { useLocation } from "react-router-dom";

export const waiverAmendmentSubsequentSubmissionFormInfo: OneMACFormConfig = {
  ...defaultSubsequentSubmissionFormConfig,
  ...waiverAmendmentSubsequentSubmission,
  pageTitle: "Upload Subsequent Waiver Amendment Documentation",
  detailsHeader: "Waiver Amendment Subsequent Documents",
  landingPage: ONEMAC_ROUTES.PACKAGE_LIST_WAIVER,
  confirmSubmit: defaultConfirmSubsequentSubmission,
  validateParentAPI: "validateParentOfWaiverAmendment",
  introJSX: defaultSubsequentSubmissionIntroJSX,
  attachmentIntroJSX: defaultSubsequentAttachmentInstructionsJSX(
    ROUTES.FAQ_ATTACHMENTS_WAIVER_B
  ),
  attachmentsTitle: "Subsequent Waiver Amendment Documents",
  addlInfoRequired: true,
  atLeastOneAttachmentRequired: true,
};

export const waiverAmendmentB4SubsequentSubmissionFormInfo = {
  ...waiverAmendmentSubsequentSubmissionFormInfo,
  ...waiverAmendmentB4SubsequentSubmission,
};

export const waiverAmendmentBSubsequentSubmissionFormInfo = {
  ...waiverAmendmentSubsequentSubmissionFormInfo,
  ...waiverAmendmentBSubsequentSubmission,
};

const WaiverAmendmentSubsequentSubmissionForm: FC = () => {
  let formConfig = waiverAmendmentSubsequentSubmissionFormInfo;
  const location = useLocation<FormLocationState>();

  if (location.state?.waiverAuthority === waiverAuthorityB.value) {
    formConfig = waiverAmendmentBSubsequentSubmissionFormInfo;
  } else if (location.state?.waiverAuthority === waiverAuthorityB4.value) {
    formConfig = waiverAmendmentB4SubsequentSubmissionFormInfo;
  }

  return <OneMACForm formConfig={formConfig} />;
};

export default WaiverAmendmentSubsequentSubmissionForm;
