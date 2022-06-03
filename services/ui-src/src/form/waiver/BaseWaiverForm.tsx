import React, { FC } from "react";
import OneMACForm from "../OneMACForm";
import { defaultWaiverAuthority, OneMACFormInfo } from "../../libs/formLib";
import { Workflow, ROUTES } from "cmscommonlib";

const baseWaiverFormInfo: OneMACFormInfo = {
  type: Workflow.ONEMAC_TYPE.WAIVER_BASE,
  actionType: "new",
  pageTitle: "Base Waiver Submission",
  detailsHeader: "Base Waiver",
  addlIntroJSX: "",
  requiredUploads: [],
  optionalUploads: [
    {
      title:
        "1915(b)(4) FFS Selective Contracting (Streamlined) waiver application pre-print (Initial, Renewal, Amendment)",
    },
    {
      title:
        "1915(b) Comprehensive (Capitated) Waiver Application Pre-print (Initial, Renewal, Amendment)",
    },
    {
      title:
        "1915(b) Comprehensive (Capitated) Waiver Cost effectiveness spreadsheets (Initial, Renewal, Amendment)",
    },
    {
      title:
        "1915(b)(4) FFS Selective Contracting (Streamlined) and 1915(b) Comprehensive (Capitated) Waiver Independent Assessment (first two renewals only)",
    },
    { title: "Tribal Consultation (Initial, Renewal, Amendment)" },
    { title: "Other" },
  ],
  waiverAuthority: defaultWaiverAuthority,
  transmittalNumber: {
    idType: "waiver",
    idFAQLink: ROUTES.FAQ_WAIVER_ID,
    idLabel: "Base Waiver Number",
    idFieldHint: [
      {
        text: "Must be a new base number with the format SS.####.R00.00 or SS.#####.R00.00",
      },
    ],
    idFormat: "SS.####.R00.00 or SS.#####.R00.00",
    idRegex: "^[A-Z]{2}[.][0-9]{4,5}[.]R00.00$",
    idExistValidations: [
      {
        idMustExist: false,
        errorLevel: "error",
      },
    ],
  },

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
