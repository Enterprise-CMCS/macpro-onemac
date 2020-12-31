import React from "react";
import { CHANGE_REQUEST_TYPES } from "./changeRequestTypes";
import SubmissionForm from "./SubmissionForm";

/**
 * SpaRai acts as a wrapper around RaiTemplate to render custom RAI form for a SPA RAI
 */
const SpaRai = () => {

  const formInfo = {
    pageTitle : "Respond to SPA RAI",
    readOnlyPageTitle : "SPA RAI Response Details",
    detailsHeader : "SPA RAI",
    requiredUploads : ["RAI Response"],
    optionalUploads : [
      "CMS Form 179",
      "SPA Pages",
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
      idMustExist : true,
    }
  };

  return (
    <SubmissionForm
      formInfo={formInfo}
      changeRequestType={CHANGE_REQUEST_TYPES.SPA_RAI}
    />
  );
}

export default SpaRai;