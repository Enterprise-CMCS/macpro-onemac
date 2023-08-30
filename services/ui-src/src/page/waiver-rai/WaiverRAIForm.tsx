import React, { FC } from "react";
import OneMACForm from "../OneMACForm";
import {
  defaultAttachmentInstructionsJSX,
  defaultConfirmSubmitRAI,
  defaultOneMACFormConfig,
  OneMACFormConfig,
} from "../../libs/formLib";
import {
  ROUTES,
  ONEMAC_ROUTES,
  waiverRAIResponse,
  getFormConfigByTypeAndAuthority,
} from "cmscommonlib";
import { useLocation } from "react-router-dom";
import { FormLocationState } from "../../domain-types";

export const waiverRAIFormInfo: OneMACFormConfig = {
  ...defaultOneMACFormConfig,
  ...waiverRAIResponse,
  pageTitle: "Respond to 1915(b) Waiver RAI",
  detailsHeader: "1915(b) Waiver RAI Response",
  landingPage: ONEMAC_ROUTES.PACKAGE_LIST_WAIVER,
  confirmSubmit: defaultConfirmSubmitRAI,
  validateParentAPI: "validateParentOfWaiverRaiResponse",
  attachmentIntroJSX: defaultAttachmentInstructionsJSX(
    ROUTES.FAQ_ATTACHMENTS_WAIVER_B_RAI
  ),
};

const WaiverRAIForm: FC = () => {
  let formConfig = waiverRAIFormInfo;
  const location = useLocation<FormLocationState>();

  if (location.state?.waiverAuthority && location.state?.parentType) {
    formConfig = {
      ...waiverRAIFormInfo,
      ...getFormConfigByTypeAndAuthority(
        location.state.parentType,
        location.state.waiverAuthority
      ),
    };
  }
  return <OneMACForm formConfig={formConfig} />;
};

export default WaiverRAIForm;
