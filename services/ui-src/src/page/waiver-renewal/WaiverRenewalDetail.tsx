import React, { FC } from "react";
import DetailView from "../DetailView";
import {
  OneMACDetail,
  defaultDetail,
  waiverAuthorityDefault,
  territoryDefault,
  submissionDateDefault,
  proposedEffectiveDateDefault,
  defaultPackageOverviewNavItems,
  defaultPackageOverviewLabel,
  tempExtensionSectionNavItem,
} from "../../libs/detailLib";
import { waiverRenewal, Workflow } from "cmscommonlib";

export const waiverRenewalDetail: OneMACDetail = {
  ...defaultDetail,
  ...waiverRenewal,
  show90thDayInfo: false,
  navItems: [
    {
      label: defaultPackageOverviewLabel,
      items: [...defaultPackageOverviewNavItems, tempExtensionSectionNavItem],
    },
  ],
  detailSection: [
    waiverAuthorityDefault,
    territoryDefault,
    submissionDateDefault,
    proposedEffectiveDateDefault,
  ],
  actionsByStatus: Workflow.renewalWaiverActionsByStatus,
};

const WaiverRenewalDetail: FC = () => {
  return <DetailView pageConfig={waiverRenewalDetail} />;
};

export default WaiverRenewalDetail;
