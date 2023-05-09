import React, { FC } from "react";
import OneMACForm from "../OneMACForm";
import { defaultOneMACFormConfig, OneMACFormConfig } from "../../libs/formLib";
import { waiverAmendmentB4 } from "cmscommonlib";
import { waiverAmendmentFormConfig } from "./waiverAmendmentFormConfig";

export const waiverAmendmentFormInfo: OneMACFormConfig = {
  ...defaultOneMACFormConfig,
  ...waiverAmendmentB4,
  ...waiverAmendmentFormConfig,
};

const WaiverAmendmentB4Form: FC = () => {
  return <OneMACForm formConfig={waiverAmendmentFormInfo} />;
};

export default WaiverAmendmentB4Form;
