import React, { FC } from "react";
import OneMACForm from "../OneMACForm";
import { defaultWaiverAuthority, OneMACFormInfo } from "../../libs/formLib";
import { Workflow, ROUTES, baseWaiver } from "cmscommonlib";

const baseWaiverIdFormat: string = "SS.####.R00.00 or SS.#####.R00.00";

const baseWaiverFormInfo: OneMACFormInfo = {
  ...baseWaiver,
  type: Workflow.ONEMAC_TYPE.WAIVER_BASE,
  actionType: "new",
  pageTitle: "Base Waiver Submission",
  detailsHeader: "Base Waiver",
  addlIntroJSX: "",
  waiverAuthority: defaultWaiverAuthority,
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
  raiLink: ROUTES.WAIVER_RAI,
  landingPage: ROUTES.PACKAGE_LIST_WAIVER,
};

const BaseWaiverForm: FC = () => {
  return <OneMACForm formInfo={baseWaiverFormInfo} />;
};

export default BaseWaiverForm;
