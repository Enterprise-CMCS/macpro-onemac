import React, { FC } from "react";
import OneMACForm from "../OneMACForm";
import {
  defaultConfirmSubmitRAI,
  defaultOneMACFormConfig,
  OneMACFormConfig,
} from "../../libs/formLib";
import { ONEMAC_ROUTES, waiverRAIResponse } from "cmscommonlib";

export const waiverRAIFormInfo: OneMACFormConfig = {
  ...defaultOneMACFormConfig,
  ...waiverRAIResponse,
  pageTitle: "Respond to 1915(b) Waiver RAI",
  detailsHeader: "1915(b) Waiver RAI Response",
  landingPage: ONEMAC_ROUTES.PACKAGE_LIST_WAIVER,
  confirmSubmit: defaultConfirmSubmitRAI,
  validateParentAPI: "validateParentOfWaiverRaiResponse",
};

const WaiverRAIForm: FC = () => {
  return <OneMACForm formConfig={waiverRAIFormInfo} />;
};

export default WaiverRAIForm;
