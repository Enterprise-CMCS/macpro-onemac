import React from "react";
import { useParams } from "react-router-dom";
import { CHANGE_REQUEST_TYPES } from "./changeRequestTypes";
import SubmissionForm from "./SubmissionForm";
import SubmissionView from "./SubmissionView";
import { ROUTES } from "cmscommonlib";

/**
 * WaiverRai acts as a wrapper around RaiTemplate to render custom RAI form for a Waiver RAI
 */
const WaiverRai = () => {
  // Optional ID parameter from the URL
  const { id, userId } = useParams();

  const formInfo = {
    pageTitle: "Respond to Waiver RAI",
    readOnlyPageTitle: "Waiver RAI Response Details",
    subheaderMessage:
        "Once you submit this form, a confirmation email is sent to you and to CMS. CMS will use this content to review your package and you will not be able to edit this form. If CMS needs any additional information, they will follow up by email.",
    detailsHeader: "Waiver RAI",
    requiredUploads: ["Waiver RAI Response"],
    optionalUploads: [
      "Other",
    ],

    transmittalNumber: {
      idType: "waiver",
      idLabel: "Waiver Number",
      idFAQLink: ROUTES.FAQ_WAIVER_ID,
      idHintText: "Please use the exact Waiver Number sent with the RAI",
      idFormat: "the Number format sent with the RAI",
      idRegex: "(^[A-Z]{2}[.][0-9]{4,5}$)|(^[A-Z]{2}[.][0-9]{4,5}[.]R[0-9]{2}$)|(^[A-Z]{2}[.][0-9]{4,5}[.]R[0-9]{2}[.]M[0-9]{2}$)",
      idMustExist: true,
    },

  };

  if (id && userId) {
    return <SubmissionView formInfo={formInfo} id={id} userId={userId} />;
  } else {
    return (
      <SubmissionForm
        formInfo={formInfo}
        changeRequestType={CHANGE_REQUEST_TYPES.WAIVER_RAI}
      />
    );
  }
};

export default WaiverRai;
