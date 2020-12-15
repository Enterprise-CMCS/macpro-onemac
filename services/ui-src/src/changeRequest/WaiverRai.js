import React from 'react';
import { CHANGE_REQUEST_TYPES } from "./changeRequestTypes";
import RaiTemplate from './RaiTemplate';

/**
 * WaiverRai acts as a wrapper around RaiTemplate to render custom RAI form for a Waiver RAI
 */
export default function WaiverRai() {
  const requiredUploads = ['Waiver RAI response'];
  const optionalUploads = [
    '1915(b)(4) waiver application', 
    'Cost effectiveness spreadsheets', 
    'Tribal Consultation', 
    '1915(c) Appendix K amendment waiver template', 
    '1915(b) waiver', 
    'Other'
  ];

  return(
    <RaiTemplate
      changeRequestType={CHANGE_REQUEST_TYPES.WAIVER_RAI}
      optionalUploads={optionalUploads}
      requiredUploads={requiredUploads}
      raiType='Waiver'
      transmittalNumberLabel="Waiver Number"
      transmittalNumberHint="Must follow the format SS.##.R##.M## or SS.####.R##.##"
      FAQLink="/FAQ#waiver-id-format"

    />
  )
}
