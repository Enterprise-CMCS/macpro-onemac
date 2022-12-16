import React, { FC } from "react";
import DetailView from "../DetailView";
import {
  OneMACDetail,
  defaultDetail,
  defaultWaiverDetailSectionItems,
} from "../../libs/detailLib";
import { waiverRenewal, Workflow } from "cmscommonlib";

export const waiverRenewalDetail: OneMACDetail = {
  ...defaultDetail,
  ...waiverRenewal,
  show90thDayInfo: false,
  detailSection: [...defaultWaiverDetailSectionItems],
  actionsByStatus: Workflow.renewalWaiverActionsByStatus,
};

const WaiverRenewalDetail: FC = () => {
  return <DetailView pageConfig={waiverRenewalDetail} />;
};

export default WaiverRenewalDetail;
