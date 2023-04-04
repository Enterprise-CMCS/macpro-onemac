import React, { FC } from "react";
import OneMACForm from "../OneMACForm";
import { defaultWithdrawConfig, OneMACFormConfig } from "../../libs/formLib";
import { Workflow, ONEMAC_ROUTES, medicaidSPAWithdraw } from "cmscommonlib";

export const medicaidSpaWithdrawInfo: OneMACFormConfig = {
  ...defaultWithdrawConfig,
  ...medicaidSPAWithdraw,
  detailsHeaderFull: "Withdraw Medicaid SPA Package",
  landingPage: ONEMAC_ROUTES.PACKAGE_LIST_SPA,
  parentTypeNice: Workflow.ONEMAC_LABEL[Workflow.ONEMAC_TYPE.MEDICAID_SPA],
  validateParentAPI: "validateParentOfMedicaidSpaWithdraw",
};

const MedicaidSpaWithdraw: FC = () => {
  return <OneMACForm formConfig={medicaidSpaWithdrawInfo} />;
};

export default MedicaidSpaWithdraw;
