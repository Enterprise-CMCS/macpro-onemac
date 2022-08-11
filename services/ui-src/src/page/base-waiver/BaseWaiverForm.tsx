import React, { FC } from "react";
import OneMACForm from "../OneMACForm";
import { defaultOneMACFormConfig, OneMACFormConfig } from "../../libs/formLib";
import { ROUTES, ONEMAC_ROUTES, baseWaiver } from "cmscommonlib";

const baseWaiverIdFormat: string = "SS-####.R00.00 or SS-#####.R00.00";

export const baseWaiverFormInfo: OneMACFormConfig = {
  ...baseWaiver,
  ...defaultOneMACFormConfig,
  pageTitle: "Base Waiver Submission",
  detailsHeader: "Base Waiver",
  addlIntroJSX: "",
  idFAQLink: ROUTES.FAQ_BASE_1915B_WAIVER_ID,
  idFormat: baseWaiverIdFormat,
  idFieldHint: [
    {
      text: "Must be a new base number with the format " + baseWaiverIdFormat,
    },
  ],
  proposedEffectiveDate: true,
  landingPage: ONEMAC_ROUTES.PACKAGE_LIST_WAIVER,
};

const BaseWaiverForm: FC = () => {
  return <OneMACForm formConfig={baseWaiverFormInfo} />;
};

export default BaseWaiverForm;
