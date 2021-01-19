import React from "react";
import { useParams } from "react-router-dom";
import { CHANGE_REQUEST_TYPES } from "./changeRequestTypes";
import SubmissionForm from "./SubmissionForm";
import SubmissionView from "./SubmissionView";

/**
 * Waiver acts as a wrapper around SubmissionForm to render custom Waiver form
 */
const Waiver = () => {
  // Optional ID parameter from the URL
  const { id } = useParams();

  const actionTypeOptions = [
    { label: "New waiver", value: "new" },
    { label: "Waiver amendment", value: "amendment" },
    {
      label: "Request for waiver renewal",
      value: "renewal",
    },
  ];
  const waiverAuthorityOptions = [
    {
      label: "1915(b)(4) FFS Selective Contracting waivers",
      value: "1915(b)(4)",
    },
    { label: "All other 1915(b) Waivers", value: "1915(b)" },
    { label: "1915(c) Appendix K waiver", value: "1915(c)" },
  ];

  const formInfo = {
    pageTitle: "Submit New Waiver Action",
    readOnlyPageTitle: "Waiver Action Details",
    detailsHeader: "Waiver Action",
    requiredUploads: ["Required Upload (per Waiver Authority)"],
    optionalUploads: [
      "1915(b)(4) waiver application",
      "Cost effectiveness spreadsheets",
      "Tribal Consultation",
      "1915(c) Appendix K amendment waiver template",
      "1915(b) waiver",
      "Other",
    ],
    idType: "waiver",
    idLabel: "Waiver Number",
    idMustExist: false,
    actionType: {
      fieldName: "actionType",
      errorMessage: "Please select the Action Type.",
      optionsList: actionTypeOptions,
      defaultItem: "an action type",
    },
    waiverAuthority: {
      fieldName: "waiverAuthority",
      errorMessage: "Please select the Waiver Authority.",
      optionsList: waiverAuthorityOptions,
      defaultItem: "a waiver authority",
    },
  };

  if (id) {
    return <SubmissionView formInfo={formInfo} id={id} />;
  } else {
    return (
      <SubmissionForm
        formInfo={formInfo}
        changeRequestType={CHANGE_REQUEST_TYPES.WAIVER}
      />
    );
  }
};

export default Waiver;
