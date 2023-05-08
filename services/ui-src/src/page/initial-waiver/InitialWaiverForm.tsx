import React, { FC } from "react";
import OneMACForm from "../OneMACForm";
import {
  defaultOneMACFormConfig,
  OneMACFormConfig,
  defaultAttachmentInstructionsJSX,
} from "../../libs/formLib";
import { ROUTES, ONEMAC_ROUTES, initialWaiver } from "cmscommonlib";

const initialWaiverIdFormat: string = "SS-####.R00.00 or SS-#####.R00.00";

export const initialWaiverFormInfo: OneMACFormConfig = {
  ...defaultOneMACFormConfig,
  ...initialWaiver,
  pageTitle: "1915(b) Initial Waiver Submission",
  detailsHeader: "Initial Waiver",
  idFAQLink: ROUTES.FAQ_INITIAL_1915B_WAIVER_ID,
  idFormat: initialWaiverIdFormat,
  idFieldHint: [
    {
      text:
        "Must be a new initial number with the format " + initialWaiverIdFormat,
    },
  ],
  proposedEffectiveDate: true,
  attachmentIntroJSX: defaultAttachmentInstructionsJSX(
    ROUTES.FAQ_ATTACHMENTS_WAIVER_B
  ),
  landingPage: ONEMAC_ROUTES.PACKAGE_LIST_WAIVER,
};

const InitialWaiverForm: FC = () => {
  return <OneMACForm formConfig={initialWaiverFormInfo} />;
};

export default InitialWaiverForm;
