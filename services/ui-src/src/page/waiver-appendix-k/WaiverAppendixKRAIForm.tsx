import React, { FC } from "react";
import OneMACForm from "../OneMACForm";
import { defaultOneMACFormConfig, OneMACFormConfig } from "../../libs/formLib";
import { ONEMAC_ROUTES, waiverAppendixKRAIResponse } from "cmscommonlib";

export const waiverAppendixKRAIFormInfo: OneMACFormConfig = {
  ...defaultOneMACFormConfig,
  ...waiverAppendixKRAIResponse,
  pageTitle: "Respond to 1915(c) Appendix K RAI",
  detailsHeader: "1915(c) Appendix K RAI Response",
  landingPage: ONEMAC_ROUTES.PACKAGE_LIST_WAIVER,
};

const WaiverAppendixKRAIForm: FC = () => {
  return <OneMACForm formConfig={waiverAppendixKRAIFormInfo} />;
};

export default WaiverAppendixKRAIForm;
