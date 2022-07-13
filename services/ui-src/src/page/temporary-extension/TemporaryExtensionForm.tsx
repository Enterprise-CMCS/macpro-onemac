import React, { FC } from "react";
import OneMACForm from "../OneMACForm";
import { defaultOneMACFormConfig, OneMACFormConfig } from "../../libs/formLib";
import {
  ROUTES,
  waiverTemporaryExtension,
  ONEMAC_ROUTES,
  TYPE_TO_DETAIL_ROUTE,
} from "cmscommonlib";
import { FormLocationState } from "../../domain-types";
import { useLocation } from "react-router-dom";
import { DetailViewTab } from "../../libs/detailLib";

const TemporaryExtensionForm: FC = () => {
  const location = useLocation<FormLocationState>();
  const idFormat: string = "SS-####.R##.TE## or SS-#####.R##.TE##";
  const temporaryExtensionFormInfo: OneMACFormConfig = {
    ...waiverTemporaryExtension,
    ...defaultOneMACFormConfig,
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
    landingPage:
      location.state?.parentType && location.state?.parentId
        ? TYPE_TO_DETAIL_ROUTE[location.state?.parentType] +
          `/${location.state?.parentId}#${DetailViewTab.EXTENSION}`
        : ONEMAC_ROUTES.PACKAGE_LIST_WAIVER,
  };

  return <OneMACForm formConfig={temporaryExtensionFormInfo} />;
};

export default TemporaryExtensionForm;
