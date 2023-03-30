import React, { FC } from "react";
import OneMACForm from "../OneMACForm";
import { defaultWithdrawConfig, OneMACFormConfig } from "../../libs/formLib";
import { ROUTES, ONEMAC_ROUTES, medicaidSPA } from "cmscommonlib";

const medicaidSpaIdFormat: string = "SS-YY-NNNN or SS-YY-NNNN-xxxx";

export const medicaidSpaWithdrawInfo: OneMACFormConfig = {
  ...defaultWithdrawConfig,
  ...medicaidSPA,
  pageTitle: "Submit New Medicaid SPA",
  detailsHeader: "Medicaid SPA",
  idFieldHint: [
    { text: "Must follow the format " + medicaidSpaIdFormat },
    {
      text: "Reminder - CMS recommends that all SPA numbers start with the year in which the package is submitted.",
      className: "field-hint-major",
    },
  ],
  proposedEffectiveDate: true,
  idFAQLink: ROUTES.FAQ_SPA_ID,
  idFormat: medicaidSpaIdFormat,
  landingPage: ONEMAC_ROUTES.PACKAGE_LIST_SPA,
};

const MedicaidSpaWithdraw: FC = () => {
  return <OneMACForm formConfig={medicaidSpaWithdrawInfo} />;
};

export default MedicaidSpaWithdraw;
