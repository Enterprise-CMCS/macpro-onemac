import React from "react";
import { CHANGE_REQUEST_TYPES } from "./changeRequestTypes";
import SubmissionForm from "./SubmissionForm";

/**
 * Spa acts as a wrapper around RaiTemplate to render custom SPA form 
 */
const Spa = () => {

  const formInfo = {
    pageTitle : "Submit New SPA",
    readOnlyPageTitle : "SPA Submission Details",
    detailsHeader : "SPA",
    requiredUploads : ["CMS Form 179", "SPA Pages"],
    optionalUploads : [
      "Cover Letter",
      "Existing State Plan Page(s)",
      "Document Demonstrating Good-Faith Tribal Engagement",
      "Tribal Consultation",
      "Public Notice",
      "Standard Funding Questions (SFQs)",
      "Other",
      ],
    fieldList : {
      idType : "spa",
      idMustExist : false,
      territory : "Please select a State or Territory.",
    }
  };

  return (
    <SubmissionForm
      formInfo={formInfo}
      changeRequestType={CHANGE_REQUEST_TYPES.SPA}
    />
  );
}

export default Spa;
