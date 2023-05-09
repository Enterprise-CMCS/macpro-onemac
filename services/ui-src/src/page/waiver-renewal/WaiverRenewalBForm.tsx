import React, { FC } from "react";
import OneMACForm from "../OneMACForm";
import { defaultOneMACFormConfig, OneMACFormConfig } from "../../libs/formLib";
import { waiverRenewalB } from "cmscommonlib";
import waiverRenewalFormConfig from "./waiverRenewalFormConfig";

export const waiverRenewalFormInfo: OneMACFormConfig = {
  ...defaultOneMACFormConfig,
  ...waiverRenewalB,
  ...waiverRenewalFormConfig,
};

const WaiverRenewalBForm: FC = () => {
  return <OneMACForm formConfig={waiverRenewalFormInfo} />;
};

export default WaiverRenewalBForm;
