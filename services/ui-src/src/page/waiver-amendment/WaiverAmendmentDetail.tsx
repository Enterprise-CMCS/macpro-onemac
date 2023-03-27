import React, { FC } from "react";
import DetailView from "../DetailView";
import { OneMACDetail, defaultWaiverDetail } from "../../libs/detailLib";
import { waiverAmendment } from "cmscommonlib";

export const waiverAmendmentDetail: OneMACDetail = {
  ...defaultWaiverDetail,
  ...waiverAmendment,
  detailHeader: "Waiver Amendment Package",
};

const WaiverAmendmentDetail: FC = () => {
  return <DetailView pageConfig={waiverAmendmentDetail} />;
};

export default WaiverAmendmentDetail;
