import React, { FC } from "react";
import OneMACForm from "../OneMACForm";
import { defaultOneMACFormConfig, OneMACFormConfig } from "../../libs/formLib";
import { ROUTES, ONEMAC_ROUTES, medicaidSPA } from "cmscommonlib";

const medicaidSpaIdFormat: string = "SS-YY-NNNN or SS-YY-NNNN-xxxx";

const medicaidSpaFormInfo: OneMACFormConfig = {
  ...defaultOneMACFormConfig,
  ...medicaidSPA,
  pageTitle: "Submit New Medicaid SPA",
  detailsHeader: "Medicaid SPA",
  addlIntroJSX: "",
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

const MedicaidSpaForm: FC = () => {
  return <OneMACForm formConfig={medicaidSpaFormInfo} />;
};

export default MedicaidSpaForm;
