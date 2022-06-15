import React, { FC } from "react";
import DetailView from "../DetailView";
import { OneMACDetail, defaultDetail } from "../DetailViewDefaults";
import { Workflow, ROUTES, medicaidSPA } from "cmscommonlib";

export const medicaidSPADetail: OneMACDetail = {
  ...defaultDetail,
  ...medicaidSPA,
  usesVerticalNav: true,
  actionsByStatus: Workflow.defaultActionsByStatus,
  raiLink: ROUTES.MEDICAID_SPA_RAI,
};

const MedicaidSPADetail: FC = () => {
  return <DetailView pageConfig={medicaidSPADetail} />;
};

export default MedicaidSPADetail;
