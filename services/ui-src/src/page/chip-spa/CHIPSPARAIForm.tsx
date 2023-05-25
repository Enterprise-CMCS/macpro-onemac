import React, { FC } from "react";
import OneMACForm from "../OneMACForm";
import {
  defaultAttachmentInstructionsJSX,
  defaultConfirmSubmitHeadingRAI,
  defaultOneMACFormConfig,
  OneMACFormConfig,
} from "../../libs/formLib";
import { ONEMAC_ROUTES, ROUTES, chipSPARAIResponse } from "cmscommonlib";
import { FormLocationState } from "../../domain-types";
import { useLocation } from "react-router-dom";

export const chipSPARAIFormInfo: OneMACFormConfig = {
  ...defaultOneMACFormConfig,
  ...chipSPARAIResponse,
  pageTitle: "Formal Request for Additional Information Response",
  detailsHeader: "Formal CHIP SPA RAI",
  landingPage: ONEMAC_ROUTES.CHIP_SPA_DETAIL,
  confirmSubmit: {
    confirmSubmitHeading: defaultConfirmSubmitHeadingRAI,
    confirmSubmitMessage: (
      <p>
        By Clicking <b>Yes, Submit</b>, you are submitting your official formal
        RAI Response to restart the SPA review process and a new 90th day will
        be identified.
      </p>
    ),
  },
  validateParentAPI: "validateParentOfChipSpaRaiResponse",
  attachmentIntroJSX: defaultAttachmentInstructionsJSX(
    ROUTES.FAQ_ATTACHMENTS_CHIP_SPA_RAI
  ),
};

const CHIPSPARAIForm: FC = () => {
  const location = useLocation<FormLocationState>();
  if (location.state?.componentId)
    chipSPARAIFormInfo.landingPage = `${ONEMAC_ROUTES.CHIP_SPA_DETAIL}/${location.state?.componentId}`;

  return <OneMACForm formConfig={chipSPARAIFormInfo} />;
};

export default CHIPSPARAIForm;
