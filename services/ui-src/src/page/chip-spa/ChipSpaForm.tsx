import React, { FC } from "react";
import OneMACForm from "../OneMACForm";
import { OneMACFormInfo } from "../../libs/formLib";
import { ROUTES, Workflow, chipSPA } from "cmscommonlib";

const idFormat: string = "SS-YY-NNNN-xxxx";

const chipSpaFormInfo: OneMACFormInfo = {
  ...chipSPA,
  type: Workflow.ONEMAC_TYPE.CHIP_SPA,
  actionType: "new",
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
  idExistValidations: [{ idMustExist: false, errorLevel: "error" }],
  landingPage: ROUTES.PACKAGE_LIST_SPA,
};

const MedicaidSpaForm: FC = () => {
  return <OneMACForm formInfo={chipSpaFormInfo} />;
};

export default MedicaidSpaForm;
