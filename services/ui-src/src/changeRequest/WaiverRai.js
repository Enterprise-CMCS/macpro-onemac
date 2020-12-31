import React from 'react';
import { CHANGE_REQUEST_TYPES } from "./changeRequestTypes";
import SubmissionForm from './SubmissionForm';

/**
 * WaiverRai acts as a wrapper around RaiTemplate to render custom RAI form for a Waiver RAI
 */
const WaiverRai = () => {

  const formInfo = {
    pageTitle : "Respond to Waiver RAI",
    readOnlyPageTitle : "Waiver RAI Response Details",
    detailsHeader : "Waiver RAI",
    requiredUploads : ["Waiver RAI Response"],
    optionalUploads : [
        '1915(b)(4) waiver application', 
        'Cost effectiveness spreadsheets', 
        'Tribal Consultation', 
        '1915(c) Appendix K amendment waiver template', 
        '1915(b) waiver', 
        'Other'
    ],
    fieldList: {
      idType: "waiver",
      idMustExist: true,
    }
};

  return(
    <SubmissionForm
      formInfo={formInfo}
      changeRequestType={CHANGE_REQUEST_TYPES.WAIVER_RAI}
    />
  )
}

export default WaiverRai;