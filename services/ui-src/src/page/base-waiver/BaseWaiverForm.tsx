import React, { FC } from "react";
import OneMACForm from "../OneMACForm";
import { OneMACFormConfig } from "../../libs/formLib";
import { Workflow, ROUTES, ONEMAC_ROUTES, baseWaiver } from "cmscommonlib";

const baseWaiverIdFormat: string = "SS.####.R00.00 or SS.#####.R00.00";

export const baseWaiverFormInfo: OneMACFormConfig = {
  ...baseWaiver,
  pageTitle: "Base Waiver Submission",
  detailsHeader: "Base Waiver",
  addlIntroJSX: "",
  idFAQLink: ROUTES.FAQ_WAIVER_ID,
  idFormat: baseWaiverIdFormat,
  idFieldHint: [
    {
      text: "Must be a new base number with the format " + baseWaiverIdFormat,
    },
  ],
  proposedEffectiveDate: {
    fieldName: "proposedEffectiveDate",
  },
  actionsByStatus: Workflow.defaultActionsByStatus,
  landingPage: ONEMAC_ROUTES.PACKAGE_LIST_WAIVER,
};

const BaseWaiverForm: FC = () => {
  return <OneMACForm formConfig={baseWaiverFormInfo} />;
};

export default BaseWaiverForm;
