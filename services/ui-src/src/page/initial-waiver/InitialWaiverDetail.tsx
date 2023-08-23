import React, { FC } from "react";
import DetailView from "../DetailView";
import { OneMACDetail, defaultWaiverDetail } from "../../libs/detailLib";
import { initialWaiver, Workflow } from "cmscommonlib";

export const initialWaiverDetail: OneMACDetail = {
  ...defaultWaiverDetail,
  ...initialWaiver,
  actionsByStatus: Workflow.initialWaiverActionsByStatus,
  detailHeader: "Initial Waiver Package",
};

const InitialWaiverDetail: FC = () => {
  return <DetailView pageConfig={initialWaiverDetail} />;
};

export default InitialWaiverDetail;
