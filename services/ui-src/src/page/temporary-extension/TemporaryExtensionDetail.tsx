import React, { FC } from "react";
import DetailView from "../DetailView";
import { OneMACDetail, defaultDetail } from "../DetailViewDefaults";
import { Workflow, ROUTES, waiverTemporaryExtension } from "cmscommonlib";

export const waiverTemporaryExtensionDetail: OneMACDetail = {
  ...defaultDetail,
  ...waiverTemporaryExtension,
  navItems: [],
  actionsByStatus: Workflow.defaultActionsByStatus,
  raiLink: ROUTES.SPA_RAI,
};

const WaiverTemporaryExtensionDetail: FC = () => {
  return <DetailView pageConfig={waiverTemporaryExtensionDetail} />;
};

export default WaiverTemporaryExtensionDetail;
