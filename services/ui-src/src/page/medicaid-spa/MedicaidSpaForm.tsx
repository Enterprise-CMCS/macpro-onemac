import React, { FC } from "react";
import OneMACForm from "../OneMACForm";
import {
  DefaultFileTypesInfo,
  defaultOneMACFormConfig,
  OneMACFormConfig,
  RequiredAttachmentSpan,
} from "../../libs/formLib";
import { ROUTES, ONEMAC_ROUTES, medicaidSPA, FAQ_TARGET } from "cmscommonlib";
import config from "../../utils/config";
import { Link } from "react-router-dom";

const medicaidSpaIdFormat: string = "SS-YY-NNNN or SS-YY-NNNN-xxxx";

export const medicaidSpaFormInfo: OneMACFormConfig = {
  ...defaultOneMACFormConfig,
  ...medicaidSPA,
  pageTitle: "Submit New Medicaid SPA",
  detailsHeader: "Medicaid SPA",
  idFieldHint: [
    { text: "Must follow the format " + medicaidSpaIdFormat },
    {
      text: "Reminder - CMS recommends that all SPA numbers start with the year in which the package is submitted.",
      className: "field-hint-major",
    },
  ],
  proposedEffectiveDate: true,
  idFAQLink: ROUTES.FAQ_SPA_ID,
  idFormat: medicaidSpaIdFormat,
  attachmentIntroJSX: (
    <>
      <p className="req-message">
        Maximum file size of {config.MAX_ATTACHMENT_SIZE_MB} MB per attachment.
        <b>
          You can add multiple files per attachment type, except for the CMS
          Form 179
        </b>
        . Read the description for each of the attachment types on the{" "}
        <Link to={ROUTES.FAQ_ATTACHMENTS_MED_SPA} target={FAQ_TARGET}>
          FAQ Page
        </Link>
        .
      </p>
      <DefaultFileTypesInfo />
      <RequiredAttachmentSpan />
    </>
  ),
  landingPage: ONEMAC_ROUTES.PACKAGE_LIST_SPA,
};

const MedicaidSpaForm: FC = () => {
  return <OneMACForm formConfig={medicaidSpaFormInfo} />;
};

export default MedicaidSpaForm;
