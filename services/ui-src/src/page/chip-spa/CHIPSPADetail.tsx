import React, { FC } from "react";
import DetailView from "../DetailView";
import { OneMACDetail, defaultDetail } from "../../libs/detailLib";
import { chipSPA } from "cmscommonlib";

export const chipSPADetail: OneMACDetail = {
  ...defaultDetail,
  ...chipSPA,
  detailHeader: "CHIP SPA Package",
};

const CHIPSPADetail: FC = () => {
  return <DetailView pageConfig={chipSPADetail} />;
};

export default CHIPSPADetail;
