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
} from "../../libs/detailLib";
import { initialWaiver, Workflow } from "cmscommonlib";

export const initialWaiverDetail: OneMACDetail = {
  ...defaultDetail,
  ...initialWaiver,
  detailSection: [
    waiverAuthorityDefault,
    typeDefault,
    territoryDefault,
    submissionDateDefault,
    proposedEffectiveDateDefault,
  ],
  actionsByStatus: Workflow.initialWaiverActionsByStatus,
};

const InitialWaiverDetail: FC = () => {
  return <DetailView pageConfig={initialWaiverDetail} />;
};

export default InitialWaiverDetail;
