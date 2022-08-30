import React, { FC } from "react";
import OneMACForm from "../OneMACForm";
import { defaultOneMACFormConfig, OneMACFormConfig } from "../../libs/formLib";
import { ROUTES, ONEMAC_ROUTES, waiverAppendixK } from "cmscommonlib";

const waiverAmendmentIdFormat: string = "SS-####.R##.## or SS-#####.R##.##";

export const waiverAppendixKFormInfo: OneMACFormConfig = {
  ...defaultOneMACFormConfig,
  ...waiverAppendixK,
  pageTitle: "Create a 1915(c) Appendix K Amendment",
  detailsHeader: "1915(c) Appendix K Amendment Request",
  addlIntroJSX: (
    <p>
      <b>
        If your Appendix K submission is for more than one waiver number, please
        enter one of the applicable waiver numbers. You do not need to create
        multiple submissions.
      </b>
    </p>
  ),
  titleLabel: "Amendment Title",
  idFAQLink: ROUTES.FAQ_WAIVER_APP_K_ID,
  idFormat: waiverAmendmentIdFormat,
  idFieldHint: [
    {
      text:
        "The Waiver Number must be in the format of " +
        waiverAmendmentIdFormat +
        ".",
    },
    {
      text: "For amendments, the last two digits start with ‘01’ and ascends.",
    },
  ],
  idAdditionalErrorMessage: [
    "For amendments, the last two digits start with ‘01’ and ascends.",
  ],
  proposedEffectiveDate: true,
  landingPage: ONEMAC_ROUTES.PACKAGE_LIST_WAIVER,
};

const WaiverAppendixKForm: FC = () => {
  return <OneMACForm formConfig={waiverAppendixKFormInfo} />;
};

export default WaiverAppendixKForm;
