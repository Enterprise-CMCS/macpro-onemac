import React, { FC } from "react";
import OneMACForm from "../OneMACForm";
import { defaultOneMACFormConfig, OneMACFormConfig } from "../../libs/formLib";
import { ONEMAC_ROUTES, medicaidSPARAIResponse } from "cmscommonlib";
import { FormLocationState } from "../../domain-types";
import { useLocation } from "react-router-dom";

const MedicaidSPARAIForm: FC = () => {
  const location = useLocation<FormLocationState>();
  const medicaidSPARAIFormInfo: OneMACFormConfig = {
    ...defaultOneMACFormConfig,
    ...medicaidSPARAIResponse,
    pageTitle: "Formal Request for Additional Information Response",
    detailsHeader: "Medicaid SPA RAI",
    landingPage:
      ONEMAC_ROUTES.MEDICAID_SPA_DETAIL + `/${location.state?.componentId}`,
    confirmSubmit: true,
  };

  return <OneMACForm formConfig={medicaidSPARAIFormInfo} />;
};

export default MedicaidSPARAIForm;