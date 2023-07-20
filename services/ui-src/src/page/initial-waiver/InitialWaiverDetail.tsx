import React, { FC } from "react";
import DetailView from "../DetailView";
import { OneMACDetail, defaultWaiverDetail } from "../../libs/detailLib";
import { initialWaiver } from "cmscommonlib";

export const initialWaiverDetail: OneMACDetail = {
  ...defaultWaiverDetail,
  ...initialWaiver,
  detailHeader: "Initial Waiver Package",
};

const InitialWaiverDetail: FC = () => {
  return <DetailView pageConfig={initialWaiverDetail} />;
};

export default InitialWaiverDetail;
