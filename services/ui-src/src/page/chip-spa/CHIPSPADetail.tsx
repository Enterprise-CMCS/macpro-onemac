import React, { FC } from "react";
import DetailView from "../DetailView";
import { OneMACDetail, defaultDetail } from "../DetailViewDefaults";
import { chipSPA } from "cmscommonlib";

export const chipSPADetail: OneMACDetail = {
  ...defaultDetail,
  ...chipSPA,
  raiLink: "",
};

const CHIPSPADetail: FC = () => {
  return <DetailView pageConfig={chipSPADetail} />;
};

export default CHIPSPADetail;
