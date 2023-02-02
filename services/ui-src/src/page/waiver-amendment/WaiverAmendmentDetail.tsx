import React, { FC } from "react";
import DetailView from "../DetailView";
import {
  OneMACDetail,
  defaultDetail,
  defaultWaiverDetailSectionItems,
} from "../../libs/detailLib";
import { waiverAmendment } from "cmscommonlib";

export const waiverAmendmentDetail: OneMACDetail = {
  ...defaultDetail,
  ...waiverAmendment,
  detailHeader: "Waiver Amendment Package",
  detailSection: [...defaultWaiverDetailSectionItems],
};

const WaiverAmendmentDetail: FC = () => {
  return <DetailView pageConfig={waiverAmendmentDetail} />;
};

export default WaiverAmendmentDetail;
