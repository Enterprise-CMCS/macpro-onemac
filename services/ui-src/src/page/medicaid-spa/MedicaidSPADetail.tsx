import React, { FC } from "react";
import DetailView from "../DetailView";
import { Workflow, medicaidSPA, ONEMAC_ROUTES } from "cmscommonlib";
import { OneMACDetail, defaultDetail } from "../../libs/detailLib";

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
