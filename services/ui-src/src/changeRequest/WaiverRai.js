import React from 'react';
import { optionalUploads } from '../libs/waiverLib.js';
import { CHANGE_REQUEST_TYPES } from "./changeRequestTypes";
import RaiTemplate from './RaiTemplate';

/**
 * WaiverRai acts as a wrapper around RaiTemplate to render custom RAI form for a Waiver RAI
 */
export default function WaiverRai() {
  const requiredUploads = ['Waiver RAI response'];

  return(
    <RaiTemplate
      changeRequestType={CHANGE_REQUEST_TYPES.WAIVER_RAI}
      optionalUploads={optionalUploads}
      requiredUploads={requiredUploads}
      raiType='Waiver'
    />
  )
}
