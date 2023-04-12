import React, { FC } from "react";
import OneMACForm from "../OneMACForm";
import { defaultWithdrawConfig, OneMACFormConfig } from "../../libs/formLib";
import { Workflow, ONEMAC_ROUTES, waiverRenewalWithdraw } from "cmscommonlib";

export const waiverRenewalWithdrawInfo: OneMACFormConfig = {
  ...defaultWithdrawConfig,
  ...waiverRenewalWithdraw,
  detailsHeaderFull: "Withdraw Waiver",
  landingPage: ONEMAC_ROUTES.PACKAGE_LIST_WAIVER,
  parentTypeNice: Workflow.ONEMAC_LABEL[Workflow.ONEMAC_TYPE.WAIVER_RENEWAL],
  validateParentAPI: "validateParentOfRenewalWithdraw",
};

const WaiverRenewalWithdraw: FC = () => {
  return <OneMACForm formConfig={waiverRenewalWithdrawInfo} />;
};

export default WaiverRenewalWithdraw;
