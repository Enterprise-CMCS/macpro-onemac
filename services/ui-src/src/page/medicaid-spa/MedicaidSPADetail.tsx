import React, { FC } from "react";
import DetailView from "../DetailView";
import { medicaidSPA } from "cmscommonlib";
import { OneMACDetail, defaultDetail } from "../../libs/detailLib";

export const medicaidSPADetail: OneMACDetail = {
  ...defaultDetail,
  ...medicaidSPA,
  detailHeader: "Medicaid SPA Package",
};

const MedicaidSPADetail: FC = () => {
  return <DetailView pageConfig={medicaidSPADetail} />;
};

export default MedicaidSPADetail;
