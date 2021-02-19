import React from "react";
import { useParams } from "react-router-dom";
import { CHANGE_REQUEST_TYPES } from "./changeRequestTypes";
import SubmissionForm from "./SubmissionForm";
import SubmissionView from "./SubmissionView";

/**
 * WaiverExtension acts as a wrapper around SubmissionForm to render the Waiver Extension Form
 */
const WaiverExtension = () => {

  // Optional ID parameter from the URL
  const { id } = useParams();

  const formInfo = {
    pageTitle : "Request Waiver Temporary Extension",
    readOnlyPageTitle : "Waiver Temporary Extension Request Details",
    detailsHeader : "Request Temporary Extension",
    requiredUploads : ["Waiver Extension Request"],
    optionalUploads : [
        "Independent Assessment Reports",
        "Other"
    ],
    idType : "waiver",
    idLabel : "Waiver Number",
    idHintText: "Must follow the format SS.##.R##.M## or SS.##.R##.##",
    idFormat: "SS.##.R##.M##",
    idRegex: "(^[A-Z]{2}[.][0-9]{2}[.]R[0-9]{2}[.]M[0-9]{2}$)",    
    idShouldTest: (changeRequest) => {return true;},
    idMustExist: (changeRequest) => {return true;},

  };

  if (id) {
    return <SubmissionView formInfo={formInfo} id={id} />;
  } else {
    return (
      <SubmissionForm
        formInfo={formInfo}
        changeRequestType={CHANGE_REQUEST_TYPES.WAIVER_EXTENSION}
      />
    );
  }
}

export default WaiverExtension;
