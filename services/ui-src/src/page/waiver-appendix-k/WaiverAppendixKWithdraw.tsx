import React, { FC } from "react";
import OneMACForm from "../OneMACForm";
import { defaultWithdrawConfig, OneMACFormConfig } from "../../libs/formLib";
import { Workflow, ONEMAC_ROUTES, waiverAppendixKWithdraw } from "cmscommonlib";

export const waiverAppendixKWithdrawInfo: OneMACFormConfig = {
  ...defaultWithdrawConfig,
  ...waiverAppendixKWithdraw,
  detailsHeaderFull: "Withdraw Waiver",
  landingPage: ONEMAC_ROUTES.PACKAGE_LIST_WAIVER,
  parentTypeNice: Workflow.ONEMAC_LABEL[Workflow.ONEMAC_TYPE.WAIVER_APP_K],
  validateParentAPI: "validateParentOfAppKWithdraw",
};

const WaiverAppendixKWithdraw: FC = () => {
  return <OneMACForm formConfig={waiverAppendixKWithdrawInfo} />;
};

export default WaiverAppendixKWithdraw;
