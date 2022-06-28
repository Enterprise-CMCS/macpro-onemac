import React, { FC } from "react";
import DetailView from "../DetailView";
import { OneMACDetail, defaultDetail } from "../../libs/detailLib";
import { Workflow, medicaidSPA } from "cmscommonlib";

export const medicaidSPADetail: OneMACDetail = {
  ...defaultDetail,
  ...medicaidSPA,
  usesVerticalNav: true,
  actionsByStatus: Workflow.defaultActionsByStatus,
  raiLink: "", // this will need to change when real Medicaid SPA RAI Response form is added
};

const MedicaidSPADetail: FC = () => {
  return <DetailView pageConfig={medicaidSPADetail} />;
};

export default MedicaidSPADetail;
