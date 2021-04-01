import React from "react";
import { useParams } from "react-router-dom";
import { CHANGE_REQUEST_TYPES } from "./changeRequestTypes";
import SubmissionForm from "./SubmissionForm";
import SubmissionView from "./SubmissionView";
import { ROUTES } from "cmscommonlib";

/**
 * Spa acts as a wrapper around SubmissionForm to render SPA-specific form
 */
const ChipSpa = () => {
  // Optional ID parameter from the URL
  const { id } = useParams();

  const formInfo = {
    pageTitle: "Submit New CHIP SPA",
    readOnlyPageTitle: "SPA Submission Details",
    detailsHeader: "SPA",
    requiredUploads: ["Current State Plan", "Revised Amended State Plan Language"],
    optionalUploads: [
      "Cover Letter",
      "Budget Documents",
      "Public Notice",
      "Tribal Consultation",
      "Public Notice",
      "Tribal Consultation",
      "Other",
    ],
    transmittalNumber: {
      idType: "chipspa",
      idLabel: "SPA ID",
      idHintText: "Must follow the format SS-YY-NNNN-xxxx",
      idFAQLink: ROUTES.FAQ_SPA_ID,
      idFormat: "SS-YY-NNNN or SS-YY-NNNN-xxxx",
      idRegex: "(^[A-Z]{2}-[0-9]{2}-[0-9]{4}-[a-zA-Z0-9]{4}$)|(^[A-Z]{2}-[0-9]{2}-[0-9]{4}$)",
      idMustExist: false,
      errorLevel: "error",
    },

  };

  if (id) {
    return <SubmissionView formInfo={formInfo} id={id} />;
  } else {
    return (
      <SubmissionForm
        formInfo={formInfo}
        changeRequestType={CHANGE_REQUEST_TYPES.SPA}
      />
    );
  }
};

export default ChipSpa;
