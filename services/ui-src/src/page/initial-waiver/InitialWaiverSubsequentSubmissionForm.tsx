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
  initialWaiverSubsequentSubmission,
  initialWaiverB4SubsequentSubmission,
  initialWaiverBSubsequentSubmission,
  waiverAuthorityB,
  waiverAuthorityB4,
} from "cmscommonlib";
import { FormLocationState } from "../../domain-types";
import { useLocation } from "react-router-dom";

export const initialWaiverSubsequentSubmissionFormInfo: OneMACFormConfig = {
  ...defaultSubsequentSubmissionFormConfig,
  ...initialWaiverSubsequentSubmission,
  pageTitle: "Upload Subsequent Waiver Documentation",
  detailsHeader: "Initial Waiver Subsequent Submission",
  landingPage: ONEMAC_ROUTES.PACKAGE_LIST_WAIVER,
  confirmSubmit: defaultConfirmSubsequentSubmission,
  validateParentAPI: "validateParentOfAny",
  introJSX: defaultSubsequentSubmissionIntroJSX,
  attachmentIntroJSX: defaultSubsequentAttachmentInstructionsJSX(
    ROUTES.FAQ_ATTACHMENTS_WAIVER_B
  ),
  attachmentsTitle: "Subsequent Initial Waiver Documents",
  addlInfoRequired: true,
  atLeastOneAttachmentRequired: true,
};

export const initialWaiverB4SubsequentSubmissionFormInfo = {
  ...initialWaiverSubsequentSubmissionFormInfo,
  ...initialWaiverB4SubsequentSubmission,
};

export const initialWaiverBSubsequentSubmissionFormInfo = {
  ...initialWaiverSubsequentSubmissionFormInfo,
  ...initialWaiverBSubsequentSubmission,
};

const InitialWaiverSubsequentSubmissionForm: FC = () => {
  let formConfig = initialWaiverSubsequentSubmissionFormInfo;
  const location = useLocation<FormLocationState>();

  if (location.state?.waiverAuthority === waiverAuthorityB.value) {
    formConfig = initialWaiverBSubsequentSubmissionFormInfo;
  } else if (location.state?.waiverAuthority === waiverAuthorityB4.value) {
    formConfig = initialWaiverB4SubsequentSubmissionFormInfo;
  }
  return <OneMACForm formConfig={formConfig} />;
};

export default InitialWaiverSubsequentSubmissionForm;
