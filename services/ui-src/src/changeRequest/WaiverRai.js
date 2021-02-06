import React from "react";
import { useParams } from "react-router-dom";
import { CHANGE_REQUEST_TYPES } from "./changeRequestTypes";
import SubmissionForm from "./SubmissionForm";
import SubmissionView from "./SubmissionView";
import {validateWaiverId} from "../utils/form-utils";

/**
 * WaiverRai acts as a wrapper around RaiTemplate to render custom RAI form for a Waiver RAI
 */
const WaiverRai = () => {
  // Optional ID parameter from the URL
  const { id } = useParams();

  const formInfo = {
    pageTitle: "Respond to Waiver RAI",
    readOnlyPageTitle: "Waiver RAI Response Details",
    detailsHeader: "Waiver RAI",
    requiredUploads: ["Waiver RAI Response"],
    optionalUploads: [
      "1915(b)(4) waiver application",
      "Cost effectiveness spreadsheets",
      "Tribal Consultation",
      "1915(c) Appendix K amendment waiver template",
      "1915(b) waiver",
      "Other",
    ],
    idType: "waiver",
    idValidationFn: validateWaiverId,
    idLabel: "Waiver Number",
  };

  if (id) {
    return <SubmissionView formInfo={formInfo} id={id} />;
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
