import React, { FC } from "react";
import OneMACForm from "../OneMACForm";
import { defaultOneMACFormConfig, OneMACFormConfig } from "../../libs/formLib";
import { waiverAmendmentB } from "cmscommonlib";
import { waiverAmendmentFormConfig } from "./waiverAmendmentFormConfig";

export const waiverAmendmentFormInfo: OneMACFormConfig = {
  ...defaultOneMACFormConfig,
  ...waiverAmendmentB,
  ...waiverAmendmentFormConfig,
};

const WaiverAmendmentBForm: FC = () => {
  return <OneMACForm formConfig={waiverAmendmentFormInfo} />;
};

export default WaiverAmendmentBForm;
