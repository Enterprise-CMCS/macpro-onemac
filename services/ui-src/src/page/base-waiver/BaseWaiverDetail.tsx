import React, { FC } from "react";
import DetailView from "../DetailView";
import { OneMACDetail, defaultDetail } from "../DetailViewDefaults";
import { Workflow, ROUTES, baseWaiver } from "cmscommonlib";

export const baseWaiverDetail: OneMACDetail = {
  ...defaultDetail,
  ...baseWaiver,
  usesVerticalNav: true,
  actionsByStatus: Workflow.defaultActionsByStatus,
  raiLink: ROUTES.WAIVER_RAI,
};

const BaseWaiverDetail: FC = () => {
  return <DetailView pageConfig={baseWaiverDetail} />;
};

export default BaseWaiverDetail;
