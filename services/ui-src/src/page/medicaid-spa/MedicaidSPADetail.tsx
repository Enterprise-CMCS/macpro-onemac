import React, { FC } from "react";
import DetailView from "../DetailView";
import { OneMACDetail, defaultDetail } from "../DetailViewDefaults";
import { Workflow, medicaidSPA, ONEMAC_ROUTES } from "cmscommonlib";

export const medicaidSPADetail: OneMACDetail = {
  ...defaultDetail,
  ...medicaidSPA,
  usesVerticalNav: true,
  actionsByStatus: Workflow.defaultActionsByStatus,
  raiLink: ONEMAC_ROUTES.MEDICAID_SPA_RAI,
};

const MedicaidSPADetail: FC = () => {
  return <DetailView pageConfig={medicaidSPADetail} />;
};

export default MedicaidSPADetail;
