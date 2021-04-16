import React from "react";
import { useParams } from "react-router-dom";
import { CHANGE_REQUEST_TYPES } from "./changeRequestTypes";
import SubmissionForm from "./SubmissionForm";
import SubmissionView from "./SubmissionView";
import { ROUTES } from "cmscommonlib";

/**
 * SpaRai acts as a wrapper around RaiTemplate to render custom RAI form for a SPA RAI
 */
const ChipSpaRai = () => {
  // Optional ID parameter from the URL
  const { id, userId } = useParams();

  const formInfo = {
    pageTitle: "Respond to CHIP SPA RAI",
    readOnlyPageTitle: "CHIP SPA RAI Response Details",
    detailsHeader: "CHIP SPA RAI",
    requiredUploads: ["Official Response to RAI", "Revised Amended State Plan"],
    optionalUploads: [
      "Budget Documents",
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
        changeRequestType={CHANGE_REQUEST_TYPES.CHIP_SPA_RAI}
      />
    );
  }
};

export default ChipSpaRai;
