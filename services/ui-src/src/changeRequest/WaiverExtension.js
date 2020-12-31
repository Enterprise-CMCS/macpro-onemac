import React from "react";
import { CHANGE_REQUEST_TYPES } from "./changeRequestTypes";
import SubmissionForm from "./SubmissionForm";

/**
 * WaiverExtension acts as a wrapper around SubmissionForm to render the Waiver Extension Form
 */
const WaiverExtension = () => {

  const formInfo = {
    pageTitle : "Request Waiver Temporary Extension",
    readOnlyPageTitle : "Waiver Temporary Extension Request Details",
    detailsHeader : "Request Temporary Extension",
    requiredUploads : ["Waiver Extension Request"],
    optionalUploads : [
        "Independent Assessment Reports",
        "Other"
    ],
    fieldList : {
      idType : "waiver",
      idMustExist : true,
    }
  };

  return (
    <SubmissionForm
      formInfo={formInfo}
      changeRequestType={CHANGE_REQUEST_TYPES.WAIVER_EXTENSION}
    />
  );
}

export default WaiverExtension;
