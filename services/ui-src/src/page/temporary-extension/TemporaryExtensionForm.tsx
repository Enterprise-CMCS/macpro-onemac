import React, { FC } from "react";
import OneMACForm from "../OneMACForm";
import { OneMACFormConfig } from "../../libs/formLib";
import {
  ROUTES,
  waiverTemporaryExtension,
  ONEMAC_ROUTES,
  TYPE_TO_DETAIL_ROUTE,
  Workflow,
} from "cmscommonlib";
import { FormLocationState } from "../../domain-types";
import { useLocation } from "react-router-dom";
import { DetailViewTab } from "../../libs/detailLib";

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
    landingPage:
      location.state?.parentType && location.state?.parentId
        ? TYPE_TO_DETAIL_ROUTE[location.state?.parentType] +
          `/${location.state?.parentId}#${DetailViewTab.EXTENSION}`
        : ONEMAC_ROUTES.PACKAGE_LIST_WAIVER,
  };

  return <OneMACForm formConfig={temporaryExtensionFormInfo} />;
};

export default TemporaryExtensionForm;
