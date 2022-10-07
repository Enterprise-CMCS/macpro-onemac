import React, { FC } from "react";
import OneMACForm from "../OneMACForm";
import { defaultOneMACFormConfig, OneMACFormConfig } from "../../libs/formLib";
import { ROUTES, ONEMAC_ROUTES, chipSPA } from "cmscommonlib";

const idFormat: string = "SS-YY-NNNN-xxxx";

export const chipSpaFormInfo: OneMACFormConfig = {
  ...defaultOneMACFormConfig,
  ...chipSPA,
  pageTitle: "Submit New CHIP SPA",
  detailsHeader: "CHIP SPA",
  idFieldHint: [{ text: "Must follow the format " + idFormat }],
  proposedEffectiveDate: true,
  idFAQLink: ROUTES.FAQ_SPA_ID,
  idFormat: idFormat,
  landingPage: ONEMAC_ROUTES.PACKAGE_LIST_SPA,
};

const ChipSpaForm: FC = () => {
  return <OneMACForm formConfig={chipSpaFormInfo} />;
};

export default ChipSpaForm;
