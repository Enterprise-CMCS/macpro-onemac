import React, { FC } from "react";
import DetailView from "../DetailView";
import {
  OneMACDetail,
  defaultDetail,
  defaultPackageOverviewNavItems,
  defaultPackageOverviewLabel,
  tempExtensionSectionNavItem,
  defaultWaiverDetailSectionItems,
} from "../../libs/detailLib";
import { initialWaiver, Workflow } from "cmscommonlib";

export const initialWaiverDetail: OneMACDetail = {
  ...defaultDetail,
  ...initialWaiver,
  navItems: [
    {
      label: defaultPackageOverviewLabel,
      items: [...defaultPackageOverviewNavItems, tempExtensionSectionNavItem],
    },
  ],
  detailSection: [...defaultWaiverDetailSectionItems],
  actionsByStatus: Workflow.initialWaiverActionsByStatus,
};

const InitialWaiverDetail: FC = () => {
  return <DetailView pageConfig={initialWaiverDetail} />;
};

export default InitialWaiverDetail;
