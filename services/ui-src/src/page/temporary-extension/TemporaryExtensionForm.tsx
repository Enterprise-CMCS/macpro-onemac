import React, { FC } from "react";
import OneMACForm from "../OneMACForm";
import {
  defaultAttachmentInstructionsJSX,
  defaultOneMACFormConfig,
  OneMACFormConfig,
} from "../../libs/formLib";
import {
  ROUTES,
  waiverTemporaryExtension,
  ONEMAC_ROUTES,
  SelectOption,
} from "cmscommonlib";

export const temporaryExtensionTypes: SelectOption[] = [
  { label: "1915(b) Temporary Extension", value: "1915(b)" },
  { label: "1915(c) Temporary Extension", value: "1915(c)" },
];

const idFormat: string = "SS-####.R##.TE## or SS-#####.R##.TE##";
export const temporaryExtensionFormInfo: OneMACFormConfig = {
  ...waiverTemporaryExtension,
  ...defaultOneMACFormConfig,
  pageTitle: "Request 1915(b) or 1915(c) Temporary Extension",
  detailsHeader: "Temporary Extension Request",
  idFAQLink: ROUTES.FAQ_WAIVER_EXTENSION_ID,
  idFieldHint: [
    {
      text:
        "Must be a waiver extension request number with the format " + idFormat,
    },
  ],
  idFormat: idFormat,
  idSize: "small",
  userProvidedIdSection: 2,
  userProvidedIdRegex: "TE[0-9]{2}$",
  landingPage: ONEMAC_ROUTES.PACKAGE_LIST_WAIVER,
  parentLabel: "Approved Initial or Renewal Waiver Number",
  parentFieldHint: [
    {
      text: "Enter the existing waiver number in the format it was approved, using a dash after the two character state abbreviation.",
    },
  ],
  parentNotFoundMessage:
    "The waiver number entered does not appear to match our records. Please enter an approved initial or renewal waiver number, using a dash after the two character state abbreviation.",
  validateParentAPI: "validateParentOfTemporaryExtension",
  temporaryExtensionTypes: temporaryExtensionTypes,
  attachmentIntroJSX: defaultAttachmentInstructionsJSX(
    ROUTES.FAQ_ATTACHMENTS_WAIVER_B_EXT
  ),
};

const TemporaryExtensionForm: FC = () => {
  return <OneMACForm formConfig={temporaryExtensionFormInfo} />;
};

export default TemporaryExtensionForm;
