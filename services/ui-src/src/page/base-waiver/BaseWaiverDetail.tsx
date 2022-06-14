import React, { FC } from "react";
import DetailView from "../DetailView";
import {
  OneMACDetail,
  DetailViewTab,
  defaultDetail,
  typeDefault,
  waiverAuthorityDefault,
  territoryDefault,
  submissionDateDefault,
  proposedEffectiveDateDefault,
} from "../DetailViewDefaults";
import { ROUTES, baseWaiver } from "cmscommonlib";

export const baseWaiverDetail: OneMACDetail = {
  ...defaultDetail,
  ...baseWaiver,
  navItems: [
    {
      label: "Package Overview",
      items: [
        {
          id: DetailViewTab.DETAIL,
          label: "Package Details",
          url: `#${DetailViewTab.DETAIL}`,
        },
        {
          id: DetailViewTab.ADDITIONAL,
          label: "Additional Information",
          url: `#${DetailViewTab.ADDITIONAL}`,
        },
        {
          id: DetailViewTab.EXTENSION,
          label: "Temporary Extension",
          url: `#${DetailViewTab.EXTENSION}`,
        },
      ],
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
