import React from "react";
import { useParams } from "react-router-dom";
import { CHANGE_REQUEST_TYPES } from "./changeRequestTypes";
import SubmissionForm from "./SubmissionForm";
import SubmissionView from "./SubmissionView";
import { ROUTES } from "cmscommonlib";
import { commonSubheaderMessage } from "../libs/formsLib"

/**
 * Spa acts as a wrapper around SubmissionForm to render SPA-specific form
 */
const Spa = () => {
  // Optional ID parameter from the URL
  const { id, userId } = useParams();

  const formInfo = {
    pageTitle: "Submit New Medicaid SPA",
    readOnlyPageTitle: "Medicaid SPA Submission Details",
    subheaderMessage: commonSubheaderMessage,
    detailsHeader: "Medicaid SPA",
    requiredUploads: [
      { title: "CMS Form 179", allowMultiple: false },
      "SPA Pages",
    ],
    optionalUploads: [
      "Cover Letter",
      "Document Demonstrating Good-Faith Tribal Engagement",
      "Existing State Plan Page(s)",
      "Public Notice",
      "Standard Funding Questions (SFQs)",
      "Tribal Consultation",
      "Other",
    ],
    transmittalNumber: {
      idType: "spa",
      idLabel: "SPA ID",
      idHintText: "Must follow the format SS-YY-NNNN-xxxx",
      idFAQLink: ROUTES.FAQ_SPA_ID,
      idFormat: "SS-YY-NNNN or SS-YY-NNNN-xxxx",
      idRegex:
        "(^[A-Z]{2}-[0-9]{2}-[0-9]{4}-[a-zA-Z0-9]{1,4}$)|(^[A-Z]{2}-[0-9]{2}-[0-9]{4}$)",
      idMustExist: false,
      errorLevel: "error",
    },
  };

  if (id && userId) {
    return <SubmissionView formInfo={formInfo} id={id} userId={userId} />;
  } else {
    return (
      <SubmissionForm
        formInfo={formInfo}
        changeRequestType={CHANGE_REQUEST_TYPES.SPA}
      />
    );
  }
};

export default Spa;
