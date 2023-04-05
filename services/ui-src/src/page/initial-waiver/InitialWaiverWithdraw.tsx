import React, { FC } from "react";
import OneMACForm from "../OneMACForm";
import { defaultWithdrawConfig, OneMACFormConfig } from "../../libs/formLib";
import { Workflow, ONEMAC_ROUTES, initialWaiverWithdraw } from "cmscommonlib";

export const initialWaiverWithdrawInfo: OneMACFormConfig = {
  ...defaultWithdrawConfig,
  ...initialWaiverWithdraw,
  detailsHeaderFull: "Withdraw Waiver",
  landingPage: ONEMAC_ROUTES.PACKAGE_LIST_WAIVER,
  parentTypeNice: Workflow.ONEMAC_LABEL[Workflow.ONEMAC_TYPE.WAIVER_INITIAL],
  validateParentAPI: "validateParentOfWaiverWithdraw",
};

const InitialWaiverWithdraw: FC = () => {
  return <OneMACForm formConfig={initialWaiverWithdrawInfo} />;
};

export default InitialWaiverWithdraw;
