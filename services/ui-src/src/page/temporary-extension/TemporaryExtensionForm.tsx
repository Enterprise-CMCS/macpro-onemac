import React, { FC } from "react";
import OneMACForm from "../OneMACForm";
import { defaultOneMACFormConfig, OneMACFormConfig } from "../../libs/formLib";
import {
  ROUTES,
  waiverTemporaryExtension,
  ONEMAC_ROUTES,
  TYPE_TO_DETAIL_ROUTE,
  SelectOption,
} from "cmscommonlib";
import { FormLocationState } from "../../domain-types";
import { useLocation } from "react-router-dom";
import { DetailViewTab } from "../../libs/detailLib";

export const temporaryExtensionTypes: SelectOption[] = [
  { label: "1915(b) Temporary Extension", value: "1915(b)" },
  { label: "1915(c) Temporary Extension", value: "1915(c)" },
];

const TemporaryExtensionForm: FC = () => {
  const location = useLocation<FormLocationState>();
  const idFormat: string = "SS-####.R##.TE## or SS-#####.R##.TE##";
  const temporaryExtensionFormInfo: OneMACFormConfig = {
    ...waiverTemporaryExtension,
    ...defaultOneMACFormConfig,
    pageTitle: "Request 1915(b) or 1915(c) Temporary Extension",
    detailsHeader: "Temporary Extension Request",
    idFAQLink: ROUTES.FAQ_WAIVER_EXTENSION_ID,
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
    parentLabel: "Approved Initial or Renewal Waiver Number",
    parentFieldHint: [
      {
        text: "Please enter the initial or renewal waiver number for which you are requesting a Temporary Extension.",
      },
    ],
    parentNotFoundMessage:
      "The waiver number entered does not appear to match our records. Please enter an approved initial or renewal waiver number, using a dash after the two character state abbreviation.",
    validateParentAPI: "validateParentOfTemporaryExtension",
    temporaryExtensionTypes: temporaryExtensionTypes,
  };

  return <OneMACForm formConfig={temporaryExtensionFormInfo} />;
};

export default TemporaryExtensionForm;
