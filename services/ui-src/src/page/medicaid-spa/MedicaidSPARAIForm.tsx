import React, { FC } from "react";
import OneMACForm from "../OneMACForm";
import { OneMACFormConfig } from "../../libs/formLib";
import {
  ROUTES,
  ONEMAC_ROUTES,
  Workflow,
  medicaidSPARAIResponse,
} from "cmscommonlib";
import { FormLocationState } from "../../domain-types";
import { useLocation } from "react-router-dom";

const MedicaidSPARAIForm: FC = () => {
  const location = useLocation<FormLocationState>();
  const medicaidSPARAIFormInfo: OneMACFormConfig = {
    ...medicaidSPARAIResponse,
    pageTitle: "Formal Request for Additional Information Response",
    detailsHeader: "Medicaid SPA RAI",
    addlIntroJSX: "",
    idFieldHint: [],
    idFAQLink: "",
    idFormat: "",
    actionsByStatus: Workflow.defaultActionsByStatus,
    landingPage:
      ONEMAC_ROUTES.MEDICAID_SPA_DETAIL + `/${location.state?.componentId}`,
  };

  return <OneMACForm formConfig={medicaidSPARAIFormInfo} />;
};

export default MedicaidSPARAIForm;
