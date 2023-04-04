import React, { FC } from "react";
import OneMACForm from "../OneMACForm";
import { defaultWithdrawConfig, OneMACFormConfig } from "../../libs/formLib";
import { Workflow, ONEMAC_ROUTES, chipSPAWithdraw } from "cmscommonlib";

export const chipSpaWithdrawInfo: OneMACFormConfig = {
  ...defaultWithdrawConfig,
  ...chipSPAWithdraw,
  detailsHeaderFull: "Withdraw CHIP SPA Package",
  landingPage: ONEMAC_ROUTES.PACKAGE_LIST_SPA,
  parentTypeNice: Workflow.ONEMAC_LABEL[Workflow.ONEMAC_TYPE.CHIP_SPA],
  validateParentAPI: "validateParentOfChipSpaWithdraw",
};

const ChipSpaWithdraw: FC = () => {
  return <OneMACForm formConfig={chipSpaWithdrawInfo} />;
};

export default ChipSpaWithdraw;
