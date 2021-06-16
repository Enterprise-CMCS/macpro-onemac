import React from "react";
import { useParams } from "react-router-dom";
import { CHANGE_REQUEST_TYPES } from "./changeRequestTypes";
import SubmissionForm from "./SubmissionForm";
import SubmissionView from "./SubmissionView";
import { ROUTES } from "cmscommonlib";
import { commonSubheaderMessage } from "../libs/formsLib"

/**
 * SpaRai acts as a wrapper around RaiTemplate to render custom RAI form for a SPA RAI
 */
const SpaRai = () => {
  // Optional ID parameter from the URL
  const { id, userId } = useParams();

  const formInfo = {
    pageTitle: "Respond to Medicaid SPA RAI",
    readOnlyPageTitle: "Medicaid SPA RAI Response Details",
    subheaderMessage: commonSubheaderMessage,
    detailsHeader: "Medicaid SPA RAI",
    requiredUploads: ["RAI Response"],
    optionalUploads: ["Other"],

    transmittalNumber: {
      idType: "spa",
      idLabel: "SPA ID",
      idHintText: "Must follow the format SS-YY-NNNN-xxxx",
      idFAQLink: ROUTES.FAQ_SPA_ID,
      idFormat: "SS-YY-NNNN or SS-YY-NNNN-xxxx",
      idRegex:
        "(^[A-Z]{2}-[0-9]{2}-[0-9]{4}-[a-zA-Z0-9]{1,4}$)|(^[A-Z]{2}-[0-9]{2}-[0-9]{4}$)",
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
        changeRequestType={CHANGE_REQUEST_TYPES.SPA_RAI}
      />
    );
  }
};

export default SpaRai;
