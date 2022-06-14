import React, { FC } from "react";
import DetailView from "../DetailView";
import { OneMACDetail, defaultDetail } from "../DetailViewDefaults";
import { ROUTES, chipSPA } from "cmscommonlib";

export const chipSPADetail: OneMACDetail = {
  ...defaultDetail,
  ...chipSPA,
  raiLink: ROUTES.CHIP_SPA_RAI,
};

const CHIPSPADetail: FC = () => {
  return <DetailView pageConfig={chipSPADetail} />;
};

export default CHIPSPADetail;
