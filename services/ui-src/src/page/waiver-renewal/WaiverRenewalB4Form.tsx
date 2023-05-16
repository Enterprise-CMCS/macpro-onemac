import React, { FC } from "react";
import OneMACForm from "../OneMACForm";
import { defaultOneMACFormConfig, OneMACFormConfig } from "../../libs/formLib";
import { waiverRenewalB4 } from "cmscommonlib";
import waiverRenewalFormConfig from "./waiverRenewalFormConfig";

export const waiverRenewalFormInfo: OneMACFormConfig = {
  ...defaultOneMACFormConfig,
  ...waiverRenewalB4,
  ...waiverRenewalFormConfig,
};

const WaiverRenewalB4Form: FC = () => {
  return <OneMACForm formConfig={waiverRenewalFormInfo} />;
};

export default WaiverRenewalB4Form;
