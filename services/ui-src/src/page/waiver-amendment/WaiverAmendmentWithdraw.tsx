import React, { FC } from "react";
import OneMACForm from "../OneMACForm";
import { defaultWithdrawConfig, OneMACFormConfig } from "../../libs/formLib";
import { Workflow, ONEMAC_ROUTES, waiverAmendmentWithdraw } from "cmscommonlib";

export const waiverAmendmentWithdrawInfo: OneMACFormConfig = {
  ...defaultWithdrawConfig,
  ...waiverAmendmentWithdraw,
  detailsHeaderFull: "Withdraw Waiver",
  landingPage: ONEMAC_ROUTES.PACKAGE_LIST_WAIVER,
  parentTypeNice: Workflow.ONEMAC_LABEL[Workflow.ONEMAC_TYPE.WAIVER_AMENDMENT],
  validateParentAPI: "validateParentOfAmendmentWithdraw",
};

const WaiverAmendmentWithdraw: FC = () => {
  return <OneMACForm formConfig={waiverAmendmentWithdrawInfo} />;
};

export default WaiverAmendmentWithdraw;
