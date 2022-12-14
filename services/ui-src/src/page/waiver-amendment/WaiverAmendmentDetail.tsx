import React, { FC } from "react";
import DetailView from "../DetailView";
import {
  OneMACDetail,
  defaultDetail,
  waiverAuthorityDefault,
  typeDefault,
  territoryDefault,
  submissionDateDefault,
  proposedEffectiveDateDefault,
} from "../../libs/detailLib";
import { waiverAmendment } from "cmscommonlib";

export const waiverAmendmentDetail: OneMACDetail = {
  ...defaultDetail,
  ...waiverAmendment,
  actionLabel: "Amendment Actions",
  detailHeader: "Waiver Amendment Package",
  navItems: [],
  detailSection: [
    { heading: "Amendment Number", fieldName: "componentId", default: "N/A" },
    waiverAuthorityDefault,
    typeDefault,
    territoryDefault,
    submissionDateDefault,
    proposedEffectiveDateDefault,
  ],
};

const WaiverAmendmentDetail: FC = () => {
  return <DetailView pageConfig={waiverAmendmentDetail} />;
};

export default WaiverAmendmentDetail;
