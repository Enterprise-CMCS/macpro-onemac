import React, { FC } from "react";
import DetailView from "../DetailView";
import {
  OneMACDetail,
  defaultDetail,
  descriptionDefault,
  proposedEffectiveDateDefault,
  approvedEffectiveDateDefault,
  finalDispositionDateDefault,
  subjectDefault,
  submissionDateDefault,
  territoryDefault,
  waiverAuthorityDefault,
  cpocDefault,
  blankBox,
  submissionIdDefault,
  latestActivityDefault,
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
    submissionIdDefault,
    latestActivityDefault,
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
    blankBox,
    subjectDefault,
    descriptionDefault,
    cpocDefault,
  ],
};

const WaiverAmendmentDetail: FC = () => {
  return <DetailView pageConfig={waiverAppendixKDetail} />;
};

export default WaiverAmendmentDetail;
