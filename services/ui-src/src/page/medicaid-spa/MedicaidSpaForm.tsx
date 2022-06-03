import React, { FC } from "react";
import OneMACForm from "../OneMACForm";
import { OneMACFormInfo } from "../../libs/formLib";
import { ROUTES, Workflow, medicaidSPA } from "cmscommonlib";

const medicaidSpaIdFormat: string = "SS-YY-NNNN or SS-YY-NNNN-xxxx";

const medicaidSpaFormInfo: OneMACFormInfo = {
  ...medicaidSPA,
  type: Workflow.ONEMAC_TYPE.MEDICAID_SPA,
  actionType: "new",
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
  proposedEffectiveDate: {
    fieldName: "proposedEffectiveDate",
  },
  idFAQLink: ROUTES.FAQ_SPA_ID,
  idFormat: medicaidSpaIdFormat,
  raiLink: ROUTES.SPA_RAI,
  actionsByStatus: Workflow.defaultActionsByStatus,
  landingPage: ROUTES.PACKAGE_LIST_SPA,
};

const MedicaidSpaForm: FC = () => {
  return <OneMACForm formInfo={medicaidSpaFormInfo} />;
};

export default MedicaidSpaForm;
