import React, { FC } from "react";
import OneMACForm from "../OneMACForm";
import { defaultOneMACFormConfig, OneMACFormConfig } from "../../libs/formLib";
import { ONEMAC_ROUTES, waiverRAIResponse } from "cmscommonlib";

export const waiverRAIFormInfo: OneMACFormConfig = {
  ...defaultOneMACFormConfig,
  ...waiverRAIResponse,
  pageTitle: "Respond to Waiver RAI",
  detailsHeader: "Waiver RAI Response",
  landingPage: ONEMAC_ROUTES.PACKAGE_LIST_WAIVER,
};

const WaiverRAIForm: FC = () => {
  return <OneMACForm formConfig={waiverRAIFormInfo} />;
};

export default WaiverRAIForm;
