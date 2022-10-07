import React, { FC } from "react";
import OneMACForm from "../OneMACForm";
import { defaultOneMACFormConfig, OneMACFormConfig } from "../../libs/formLib";
import { ONEMAC_ROUTES, chipSPARAIResponse } from "cmscommonlib";
import { FormLocationState } from "../../domain-types";
import { useLocation } from "react-router-dom";

export const chipSPARAIFormInfo: OneMACFormConfig = {
  ...defaultOneMACFormConfig,
  ...chipSPARAIResponse,
  pageTitle: "Formal Request for Additional Information Response",
  detailsHeader: "Formal CHIP SPA RAI",
  landingPage: ONEMAC_ROUTES.CHIP_SPA_DETAIL,
  confirmSubmit: true,
};

const CHIPSPARAIForm: FC = () => {
  const location = useLocation<FormLocationState>();
  chipSPARAIFormInfo.landingPage += `/${location.state?.componentId}`;

  return <OneMACForm formConfig={chipSPARAIFormInfo} />;
};

export default CHIPSPARAIForm;
