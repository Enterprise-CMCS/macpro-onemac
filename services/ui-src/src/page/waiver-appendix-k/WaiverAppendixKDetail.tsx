import React, { FC } from "react";
import DetailView from "../DetailView";
import {
  OneMACDetail,
  defaultDetail,
  proposedEffectiveDateDefault,
  submissionDateDefault,
  territoryDefault,
  waiverAuthorityDefault,
} from "../../libs/detailLib";
import { waiverAppendixK } from "cmscommonlib";

export const waiverAppendixKDetail: OneMACDetail = {
  ...defaultDetail,
  ...waiverAppendixK,
  actionLabel: "Package Actions",
  detailHeader: "Appendix K Amendment",
  attachmentsHeading: "Attachments",
  navItems: [],
  detailSection: [
    waiverAuthorityDefault,
    territoryDefault,
    {
      heading: "Amendment Title",
      fieldName: "title",
      default: "Appendix K Amendment",
    },
    submissionDateDefault,
    proposedEffectiveDateDefault,
  ],
};

const WaiverAmendmentDetail: FC = () => {
  return <DetailView pageConfig={waiverAppendixKDetail} />;
};

export default WaiverAmendmentDetail;
