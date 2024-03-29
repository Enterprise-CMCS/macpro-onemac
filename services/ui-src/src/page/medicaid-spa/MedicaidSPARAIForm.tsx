import React, { FC } from "react";
import OneMACForm from "../OneMACForm";
import {
  defaultAttachmentInstructionsJSX,
  defaultConfirmSubmitRAI,
  defaultOneMACFormConfig,
  OneMACFormConfig,
} from "../../libs/formLib";
import { ONEMAC_ROUTES, ROUTES, medicaidSPARAIResponse } from "cmscommonlib";
import { FormLocationState } from "../../domain-types";
import { useLocation } from "react-router-dom";

export const medicaidSPARAIFormInfo: OneMACFormConfig = {
  ...defaultOneMACFormConfig,
  ...medicaidSPARAIResponse,
  pageTitle: "Formal Request for Additional Information Response",
  detailsHeader: "Medicaid SPA RAI",
  landingPage: ONEMAC_ROUTES.MEDICAID_SPA_DETAIL,
  confirmSubmit: defaultConfirmSubmitRAI,
  validateParentAPI: "validateParentOfMedicaidSpaRaiResponse",
  attachmentIntroJSX: defaultAttachmentInstructionsJSX(
    ROUTES.FAQ_ATTACHMENTS_MED_SPA_RAI
  ),
};

const MedicaidSPARAIForm: FC = () => {
  const location = useLocation<FormLocationState>();
  if (location.state?.componentId)
    medicaidSPARAIFormInfo.landingPage = `${ONEMAC_ROUTES.MEDICAID_SPA_DETAIL}/${location.state?.componentId}`;
  return <OneMACForm formConfig={medicaidSPARAIFormInfo} />;
};

export default MedicaidSPARAIForm;
