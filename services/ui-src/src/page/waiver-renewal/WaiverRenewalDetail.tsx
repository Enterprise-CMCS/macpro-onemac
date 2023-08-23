import React, { FC } from "react";
import DetailView from "../DetailView";
import { OneMACDetail, defaultWaiverDetail } from "../../libs/detailLib";
import { waiverRenewal, Workflow } from "cmscommonlib";

export const waiverRenewalDetail: OneMACDetail = {
  ...defaultWaiverDetail,
  ...waiverRenewal,
  show90thDayInfo: false,
  detailHeader: "Waiver Renewal Package",
  actionsByStatus: Workflow.renewalWaiverActionsByStatus,
};

const WaiverRenewalDetail: FC = () => {
  return <DetailView pageConfig={waiverRenewalDetail} />;
};

export default WaiverRenewalDetail;
