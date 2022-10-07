import React, { FC } from "react";
import OneMACForm from "../OneMACForm";
import { defaultOneMACFormConfig, OneMACFormConfig } from "../../libs/formLib";
import { ONEMAC_ROUTES, medicaidSPARAIResponse } from "cmscommonlib";
import { FormLocationState } from "../../domain-types";
import { useLocation } from "react-router-dom";

export const medicaidSPARAIFormInfo: OneMACFormConfig = {
  ...defaultOneMACFormConfig,
  ...medicaidSPARAIResponse,
  pageTitle: "Formal Request for Additional Information Response",
  detailsHeader: "Medicaid SPA RAI",
  landingPage: ONEMAC_ROUTES.MEDICAID_SPA_DETAIL,
  confirmSubmit: true,
};

const MedicaidSPARAIForm: FC = () => {
  const location = useLocation<FormLocationState>();
  medicaidSPARAIFormInfo.landingPage += `/${location.state?.componentId}`;
  return <OneMACForm formConfig={medicaidSPARAIFormInfo} />;
};

export default MedicaidSPARAIForm;
