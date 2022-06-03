import React, { FC } from "react";
import OneMACForm from "../OneMACForm";
import { OneMACFormInfo } from "../../libs/formLib";
import { Workflow, ROUTES, waiverTemporaryExtension } from "cmscommonlib";

const idFormat: string = "SS.####.R##.TE## or SS.#####.R##.TE##";
const temporaryExtensionFormInfo: OneMACFormInfo = {
  ...waiverTemporaryExtension,
  type: Workflow.ONEMAC_TYPE.WAIVER_EXTENSION,
  actionType: "",
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
  landingPage: ROUTES.PACKAGE_LIST_WAIVER,
};

const TemporaryExtensionForm: FC = () => {
  return <OneMACForm formInfo={temporaryExtensionFormInfo} />;
};

export default TemporaryExtensionForm;
