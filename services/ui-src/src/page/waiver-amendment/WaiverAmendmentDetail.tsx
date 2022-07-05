import React, { FC } from "react";
import DetailView from "../DetailView";
import {
  OneMACDetail,
  defaultDetail,
  waiverAuthorityDefault,
} from "../../libs/detailLib";
import { waiverAmendment } from "cmscommonlib";

export const waiverAmendmentDetail: OneMACDetail = {
  ...defaultDetail,
  ...waiverAmendment,
  actionLabel: "Amendment Actions",
  detailHeader: "Waiver Amendment",
  attachmentsHeading: "Supporting Documentation",
  navItems: [],
  detailSection: [
    { heading: "Amendment Number", fieldName: "componentId", default: "N/A" },
    {
      heading: "Amendment Title",
      fieldName: "title",
      default: "Waiver Amendment",
    },
    waiverAuthorityDefault,
  ],
};

const WaiverAmendmentDetail: FC = () => {
  return <DetailView pageConfig={waiverAmendmentDetail} />;
};

export default WaiverAmendmentDetail;
