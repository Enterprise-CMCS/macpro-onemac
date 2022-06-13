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
} from "../DetailViewDefaults";
import { ROUTES, waiverAmendment } from "cmscommonlib";

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
  raiLink: ROUTES.WAIVER_RAI,
};

const WaiverAmendmentDetail: FC = () => {
  return <DetailView pageConfig={waiverAmendmentDetail} />;
};

export default WaiverAmendmentDetail;
