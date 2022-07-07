import React, { FC } from "react";
import DetailView from "../DetailView";
import {
  OneMACDetail,
  defaultDetail,
  typeDefault,
  waiverAuthorityDefault,
  territoryDefault,
  submissionDateDefault,
  proposedEffectiveDateDefault,
  defaultPackageOverviewNavItems,
  defaultPackageOverviewLabel,
  tempExtensionSectionNavItem,
} from "../../libs/detailLib";
import { baseWaiver, Workflow } from "cmscommonlib";

export const baseWaiverDetail: OneMACDetail = {
  ...defaultDetail,
  ...baseWaiver,
  navItems: [
    {
      label: defaultPackageOverviewLabel,
      items: [...defaultPackageOverviewNavItems, tempExtensionSectionNavItem],
    },
  ],
  detailSection: [
    waiverAuthorityDefault,
    typeDefault,
    territoryDefault,
    submissionDateDefault,
    proposedEffectiveDateDefault,
  ],
  actionsByStatus: Workflow.baseWaiverActionsByStatus,
};

const BaseWaiverDetail: FC = () => {
  return <DetailView pageConfig={baseWaiverDetail} />;
};

export default BaseWaiverDetail;
