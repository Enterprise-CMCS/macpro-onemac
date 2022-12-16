import React, { FC } from "react";
import OneMACForm from "../OneMACForm";
import {
  defaultConfirmSubmitRAI,
  defaultOneMACFormConfig,
  OneMACFormConfig,
} from "../../libs/formLib";
import { ONEMAC_ROUTES, waiverAppendixKRAIResponse } from "cmscommonlib";

export const waiverAppendixKRAIFormInfo: OneMACFormConfig = {
  ...defaultOneMACFormConfig,
  ...waiverAppendixKRAIResponse,
  pageTitle: "Respond to 1915(c) Appendix K RAI",
  detailsHeader: "1915(c) Appendix K RAI Response",
  landingPage: ONEMAC_ROUTES.PACKAGE_LIST_WAIVER,
  confirmSubmit: defaultConfirmSubmitRAI,
  validateParentAPI: "validateParentOfWaiverAppendixKRaiResponse",
};

const WaiverAppendixKRAIForm: FC = () => {
  return <OneMACForm formConfig={waiverAppendixKRAIFormInfo} />;
};

export default WaiverAppendixKRAIForm;
