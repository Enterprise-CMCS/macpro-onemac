import React, { FC } from "react";
import DetailView from "../DetailView";
import {
  OneMACDetail,
  defaultDetail,
  descriptionDefault,
  proposedEffectiveDateDefault,
  subjectDefault,
  submissionDateDefault,
  territoryDefault,
  waiverAuthorityDefault,
  cpocDefault,
  approvedEffectiveDateDefault,
  finalDispositionDateDefault,
  blankBox,
} from "../../libs/detailLib";
import { waiverAppendixK } from "cmscommonlib";

const appendixKWaiverAuthority = {
  ...waiverAuthorityDefault,
  default: "1915(c) HCBS",
};

export const waiverAppendixKDetail: OneMACDetail = {
  ...defaultDetail,
  ...waiverAppendixK,
  detailHeader: "Appendix K Amendment Package",
  attachmentsHeading: "Attachments",
  detailSection: [
    appendixKWaiverAuthority,
    territoryDefault,
    {
      heading: "Amendment Title",
      fieldName: "title",
      default: "Appendix K Amendment",
    },
    submissionDateDefault,
    proposedEffectiveDateDefault,
    approvedEffectiveDateDefault,
    finalDispositionDateDefault,
    subjectDefault,
    descriptionDefault,
    cpocDefault,
  ],
};

const WaiverAmendmentDetail: FC = () => {
  return <DetailView pageConfig={waiverAppendixKDetail} />;
};

export default WaiverAmendmentDetail;
