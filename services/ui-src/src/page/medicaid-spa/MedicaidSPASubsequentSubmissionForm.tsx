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
import { FormLocationState } from "../../domain-types";
import { useLocation } from "react-router-dom";

export const medicaidSPASubsequentSubmissionFormInfo: OneMACFormConfig = {
  ...defaultOneMACFormConfig,
  ...medicaidSPASubsequentSubmission,
  pageTitle: "Upload Subsequent Medicaid SPA Documentation",
  detailsHeader: "Medicaid SPA Subsequent Submission",
  landingPage: ONEMAC_ROUTES.PACKAGE_LIST,
  confirmSubmit: defaultConfirmSubsequentSubmission,
  validateParentAPI: "validateParentOfMedicaidSpa",
  introJSX: defaultSubsequentSubmissionIntroJSX,
  attachmentIntroJSX: defaultAttachmentInstructionsJSX(
    ROUTES.FAQ_ATTACHMENTS_MED_SPA_RAI
  ),
  attachmentsTitle: "Subsequent Medicaid SPA Documents",
  addlInfoRequired: true,
  atLeastOneAttachmentRequired: true,
};

const MedicaidSPASubsequentSubmissionForm: FC = () => {
  const location = useLocation<FormLocationState>();
  if (location.state?.componentId)
    medicaidSPASubsequentSubmissionFormInfo.landingPage = `${ONEMAC_ROUTES.MEDICAID_SPA_DETAIL}/${location.state?.componentId}`;
  return <OneMACForm formConfig={medicaidSPASubsequentSubmissionFormInfo} />;
};

export default MedicaidSPASubsequentSubmissionForm;
