import React, { FC } from "react";
import OneMACForm from "../OneMACForm";
import { OneMACFormConfig } from "../../libs/formLib";
import {
  Workflow,
  ROUTES,
  ONEMAC_ROUTES,
  waiverTemporaryExtension,
} from "cmscommonlib";

const idFormat: string = "SS.####.R##.TE## or SS.#####.R##.TE##";
const temporaryExtensionFormInfo: OneMACFormConfig = {
  ...waiverTemporaryExtension,
  pageTitle: "Request a Temporary Extension",
  detailsHeader: "Temporary Extension Request",
  idFAQLink: ROUTES.FAQ_WAIVER_ID,
  idFieldHint: [
    {
      text:
        "Must be a waiver extension request number with the format " + idFormat,
    },
  ],
  idFormat: idFormat,
  actionsByStatus: Workflow.defaultActionsByStatus,
  raiLink: ROUTES.WAIVER_RAI,
  landingPage: ONEMAC_ROUTES.PACKAGE_LIST_WAIVER,
};

const TemporaryExtensionForm: FC = () => {
  return <OneMACForm formConfig={temporaryExtensionFormInfo} />;
};

export default TemporaryExtensionForm;
