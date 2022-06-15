import React, { FC } from "react";
import OneMACForm from "../OneMACForm";
import { OneMACFormConfig } from "../../libs/formLib";
import { ROUTES, ONEMAC_ROUTES, Workflow, chipSPA } from "cmscommonlib";

const idFormat: string = "SS-YY-NNNN-xxxx";

const chipSpaFormInfo: OneMACFormConfig = {
  ...chipSPA,
  pageTitle: "Submit New CHIP SPA",
  detailsHeader: "CHIP SPA",
  addlIntroJSX: "",
  idFieldHint: [{ text: "Must follow the format " + idFormat }],
  proposedEffectiveDate: {
    fieldName: "proposedEffectiveDate",
  },
  idFAQLink: ROUTES.FAQ_SPA_ID,
  idFormat: idFormat,
  raiLink: ROUTES.SPA_RAI,
  actionsByStatus: Workflow.defaultActionsByStatus,
  landingPage: ONEMAC_ROUTES.PACKAGE_LIST_SPA,
};

const ChipSpaForm: FC = () => {
  return <OneMACForm formConfig={chipSpaFormInfo} />;
};

export default ChipSpaForm;
