import React from "react";

import { ChangeRequest } from "cmscommonlib";

import OneMACForm from "./OneMACForm";

const BaseWaiverForm = () => {
  return <OneMACForm formType={ChangeRequest.TYPE.WAIVER_BASE} />;
};

export default BaseWaiverForm;
