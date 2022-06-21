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
} from "../DetailViewDefaults";
import { ROUTES, baseWaiver } from "cmscommonlib";

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
  raiLink: ROUTES.WAIVER_RAI,
};

const BaseWaiverDetail: FC = () => {
  return <DetailView pageConfig={baseWaiverDetail} />;
};

export default BaseWaiverDetail;
