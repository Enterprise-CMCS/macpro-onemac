import React from "react";
import { useParams } from "react-router-dom";
import { CHANGE_REQUEST_TYPES } from "./changeRequestTypes";
import SubmissionForm from "./SubmissionForm";
import SubmissionView from "./SubmissionView";
import { ROUTES } from "../Routes";

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
  ];

  const baseTransmittalNumber = {
    idType: "waiver",
    idLabel: "Waiver Number",
    idFAQLink: ROUTES.FAQ_WAIVER_ID,  
  };

  const formInfo = {
    pageTitle: "Submit New Waiver Action",
    readOnlyPageTitle: "Waiver Action Details",
    detailsHeader: "Waiver Action",
    requiredUploads: ["Required Upload (per Waiver Authority)"],
    optionalUploads: [
      "1915(b)(4) waiver application",
      "Cost effectiveness spreadsheets",
      "Tribal Consultation",
      "1915(b) waiver",
      "Other",
    ],

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
    transmittalNumber: {
      ...baseTransmittalNumber,
      idHintText: "Must follow the format required by the Action Type",
      idFormat: "SS.#### or SS.#####",
      idRegex: "^[A-Z]{2}[.][0-9]{2}[.]R[0-9]{2}[.]M[0-9]{2}$",
      idMustExist: false,  
      errorLevel: "error",
    },
    newTransmittalNumber: {
      ...baseTransmittalNumber,
      idHintText: "Must be a new base number with the format SS.#### or SS.#####",
      idFormat: "SS.#### or SS.#####",
      idRegex: "^[A-Z]{2}[.][0-9]{4,5}$",
      idMustExist: false,
      errorLevel: "error",
    },
    amendmentTransmittalNumber: {
      ...baseTransmittalNumber,
      idHintText: "Must follow the format SS.####.R##.M## or SS.#####.R##.M##",
      idFormat: "SS.####.R##.M## or SS.#####.R##.M##",
      idRegex: "^[A-Z]{2}[.][0-9]{4,5}[.]R[0-9]{2}[.]M[0-9]{2}$",
      idMustExist: false,
      errorLevel: "warn",
    },
    renewalTransmittalNumber: {
      ...baseTransmittalNumber,
      idHintText: "Must follow the format SS.####.R## or SS.#####.R##",
      idFormat: "SS.####.R## or SS.#####.R##",
      idRegex: "^[A-Z]{2}[.][0-9]{4,5}[.]R[0-9]{2}$",
      idMustExist: false,
      errorLevel: "warn",
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
