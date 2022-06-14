import React, { FC } from "react";
import OneMACForm from "../OneMACForm";
import { OneMACFormConfig } from "../../libs/formLib";
import {
  Workflow,
  ROUTES,
  waiverTemporaryExtension,
  ONEMAC_ROUTES,
} from "cmscommonlib";
import { FormLocationState } from "../../domain-types";
import { useLocation } from "react-router-dom";

const TemporaryExtensionForm: FC = () => {
  const location = useLocation<FormLocationState>();
  const idFormat: string = "SS.####.R##.TE## or SS.#####.R##.TE##";
  const temporaryExtensionFormInfo: OneMACFormConfig = {
    ...waiverTemporaryExtension,
    pageTitle: "Request a Temporary Extension",
    detailsHeader: "Temporary Extension Request",
    idFAQLink: ROUTES.FAQ_WAIVER_ID,
    idFieldHint: [
      {
        text:
          "Must be a waiver extension request number with the format " +
          idFormat,
      },
    ],
    idFormat: idFormat,
    actionsByStatus: Workflow.defaultActionsByStatus,
    raiLink: ROUTES.WAIVER_RAI,
    landingPage: location.state?.parentId
      ? ROUTES.DETAIL +
        `/${location.state.parentType}/${location.state?.parentId}#temp-extension`
      : ONEMAC_ROUTES.PACKAGE_LIST_WAIVER,
  };

  return <OneMACForm formConfig={temporaryExtensionFormInfo} />;
};

export default TemporaryExtensionForm;
