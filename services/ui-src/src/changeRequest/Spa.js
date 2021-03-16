<<<<<<< HEAD
import React from "react";
import { useParams } from "react-router-dom";
import { CHANGE_REQUEST_TYPES } from "./changeRequestTypes";
import SubmissionForm from "./SubmissionForm";
import SubmissionView from "./SubmissionView";
import {validateSpaId} from "../utils/form-utils";

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
    idValidationFn: validateSpaId,
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
=======
import React from "react";
import { useParams } from "react-router-dom";
import { CHANGE_REQUEST_TYPES } from "./changeRequestTypes";
import SubmissionForm from "./SubmissionForm";
import SubmissionView from "./SubmissionView";
import { ROUTES } from "../Routes";

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
    transmittalNumber: {
      idType: "spa",
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

export default Spa;
>>>>>>> develop
