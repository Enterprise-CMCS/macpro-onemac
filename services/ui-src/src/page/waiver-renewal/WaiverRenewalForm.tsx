import React, { FC } from "react";
import OneMACForm from "../OneMACForm";
import { defaultOneMACFormConfig, OneMACFormConfig } from "../../libs/formLib";
import { ROUTES, ONEMAC_ROUTES, waiverRenewal } from "cmscommonlib";

const waiverRenewalIdFormat: string = "SS-####.R##.00 or SS-#####.R##.00";

export const waiverRenewalFormInfo: OneMACFormConfig = {
  ...defaultOneMACFormConfig,
  ...waiverRenewal,
  pageTitle: "Renew a 1915(b) Waiver",
  detailsHeader: "1915(b) Waiver Renewal",
  addlIntroJSX: "",
  idFAQLink: ROUTES.FAQ_1915B_WAIVER_RENEWAL_ID,
  idFormat: waiverRenewalIdFormat,
  idFieldHint: [
    {
      text:
        "The Waiver Number must be in the format of " +
        waiverRenewalIdFormat +
        ". For renewals, the “R##” starts with ‘R01’ and ascends.",
    },
  ],
  proposedEffectiveDate: true,
  landingPage: ONEMAC_ROUTES.PACKAGE_LIST_WAIVER,
  parentLabel: "Existing Waiver Number to Renew",
  parentFieldHint: [
    {
      text: "Enter the currently approved waiver number to renew.",
    },
  ],
  parentNotFoundMessage:
    "The waiver number entered does not appear to match our records. Please enter an approved initial or renewal waiver number, using a dash after the two character state abbreviation.",
  validateParentAPI: "validateParentOfWaiverRenewal",
};

const WaiverRenewalForm: FC = () => {
  return <OneMACForm formConfig={waiverRenewalFormInfo} />;
};

export default WaiverRenewalForm;
