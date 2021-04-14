import React from "react";
import { useParams } from "react-router-dom";
import { CHANGE_REQUEST_TYPES } from "./changeRequestTypes";
import SubmissionForm from "./SubmissionForm";
import SubmissionView from "./SubmissionView";
import { ROUTES } from "cmscommonlib";

/**
 * WaiverExtension acts as a wrapper around SubmissionForm to render the Waiver Extension Form
 */
const WaiverExtension = () => {

  // Optional ID parameter from the URL
  const { id, userId } = useParams();

  const formInfo = {
    pageTitle : "Request Waiver Temporary Extension",
    readOnlyPageTitle : "Waiver Temporary Extension Request Details",
    detailsHeader : "Request Temporary Extension",
    requiredUploads : ["Waiver Extension Request"],
    optionalUploads : [
        "Independent Assessment Reports",
        "Other"
    ],

    transmittalNumber: {
      idType: "waiver",
      idLabel: "Waiver Number",
      idFAQLink: ROUTES.FAQ_WAIVER_ID,
      idHintText: "Must follow the format SS.#### or SS.#####",
      idFormat: "SS.#### or SS.#####",
      idRegex: "(^[A-Z]{2}[.][0-9]{4,5}$)",
      idMustExist: true,
      errorLevel: "error",
    },

  };

  if (id && userId) {
    return <SubmissionView formInfo={formInfo} id={id} userId={userId} />;
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
