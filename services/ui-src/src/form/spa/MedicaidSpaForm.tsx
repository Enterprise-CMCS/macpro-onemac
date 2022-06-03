import React, { FC } from "react";
import OneMACForm from "../OneMACForm";
import { OneMACFormInfo } from "../../libs/formLib";
import { ROUTES, Workflow } from "cmscommonlib";

const medicaidSpaFormInfo: OneMACFormInfo = {
  type: Workflow.ONEMAC_TYPE.SPA,
  actionType: "new",
  pageTitle: "Submit New Medicaid SPA",
  detailsHeader: "Medicaid SPA",
  addlIntroJSX: "",
  transmittalNumber: {
    idType: "spa",
    idLabel: "SPA ID",
    idRegex:
      "(^[A-Z]{2}-[0-9]{2}-[0-9]{4}-[a-zA-Z0-9]{1,4}$)|(^[A-Z]{2}-[0-9]{2}-[0-9]{4}$)",
    idExistValidations: [
      {
        idMustExist: false,
        errorLevel: "error",
      },
    ],
    idFieldHint: [
      { text: "Must follow the format SS-YY-NNNN-xxxx" },
      {
        text: "Reminder - CMS recommends that all SPA numbers start with the year in which the package is submitted.",
        className: "field-hint-major",
      },
    ],
    idFAQLink: ROUTES.FAQ_SPA_ID,
    idFormat: "SS-YY-NNNN or SS-YY-NNNN-xxxx",
  },
  requiredUploads: [
    { title: "CMS Form 179", allowMultiple: false },
    { title: "SPA Pages" },
  ],
  optionalUploads: [
    { title: "Cover Letter" },
    { title: "Document Demonstrating Good-Faith Tribal Engagement" },
    { title: "Existing State Plan Page(s)" },
    { title: "Public Notice" },
    { title: "Standard Funding Questions (SFQs)" },
    { title: "Tribal Consultation" },
    { title: "Other" },
  ],
  raiLink: ROUTES.SPA_RAI,
  actionsByStatus: Workflow.defaultActionsByStatus,
  landingPage: ROUTES.PACKAGE_LIST_WAIVER,
};

const MedicaidSpaForm: FC = () => {
  return (
    <div>
      <span>HELLO</span>
      <OneMACForm formInfo={medicaidSpaFormInfo} />
    </div>
  );
};

export default MedicaidSpaForm;
