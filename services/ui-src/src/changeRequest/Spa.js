import React from "react";
import { useParams } from "react-router-dom";
import { CHANGE_REQUEST_TYPES } from "./changeRequestTypes";
import SubmissionForm from "./SubmissionForm";
import SubmissionView from "./SubmissionView";
import { territoryList } from "../libs/territoryLib";

/**
 * Spa acts as a wrapper around SubmissionForm to render SPA-specific form
 */
const Spa = () => {
  // Optional ID parameter from the URL
  const { id } = useParams();

  const formInfo = {
    pageTitle: "Submit New SPA",
    readOnlyPageTitle: "SPA Submission Details",
    detailsHeader: "SPA",
    requiredUploads: ["CMS Form 179", "SPA Pages"],
    optionalUploads: [
      "Cover Letter",
      "Existing State Plan Page(s)",
      "Document Demonstrating Good-Faith Tribal Engagement",
      "Tribal Consultation",
      "Public Notice",
      "Standard Funding Questions (SFQs)",
      "Other",
    ],
    idType: "spa",
    idLabel: "SPA ID",
    idMustExist: false,
    territory: {
      fieldName: "territory",
      errorMessage: "Please select a State or Territory.",
      optionsList: territoryList,
      defaultItem: "a territory",
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

export default Spa;
